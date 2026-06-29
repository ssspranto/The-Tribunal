import { useState, useCallback, useEffect } from "react";
import { case1 } from "../data/case1";
import { case1BN } from "../data/case1BN";
import { SCENARIO_BANKS } from "../data/scenarioBanks";
import { SCENARIO_BANKS_BN } from "../data/scenarioBanksBN";
import {
  createInitialProfile,
  updateProfile,
  updateConsistency,
} from "./useProfileTracker";

const STORAGE_KEY = "tribunal_game_state";

export function buildHistory(cases, verdicts) {
  return cases.map((c, i) => ({
    case_number: i + 1,
    case_title: c.case_title,
    crime_tag: c.crime_tag,
    case_body: c.case_body,
    emotional_state: c.emotional_state,
    verdict: verdicts[i]?.verdict ?? null,
    severity: verdicts[i]?.severity ?? null,
    reasoning: verdicts[i]?.reasoning ?? null,
    bridge_narrative: c.bridge_narrative,
  }));
}

function createFreshState() {
  return {
    phase: "language_select",
    currentCaseIndex: 0,
    cases: [],
    verdicts: [],
    profile: createInitialProfile(),
    endings: null,
    caseStartTime: null,
    pendingFinalCases: null,
  };
}

function loadSave() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data.cases?.length || data.phase === "ending") return null;
    return data;
  } catch {
    return null;
  }
}

function persist(state) {
  const toSave = {
    phase: state.phase,
    currentCaseIndex: state.currentCaseIndex,
    cases: state.cases,
    verdicts: state.verdicts,
    profile: state.profile,
    pendingFinalCases: state.pendingFinalCases,
    lastReaction: state.lastReaction,
    transitionCaseNumber: state.transitionCaseNumber,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
}

export function useGameState() {
  const [state, setState] = useState(createFreshState);
  const [hasSave, setHasSave] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setHasSave(!!loadSave());
    setInitialized(true);
  }, []);

  const saveState = useCallback((updater) => {
    setState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      if (next.phase !== "intro" && next.phase !== "save_prompt") {
        persist(next);
      }
      return next;
    });
  }, []);

  const startNewGame = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setHasSave(false);
    setState(createFreshState());
  }, []);

  const continueGame = useCallback(() => {
    const saved = loadSave();
    if (saved) {
      const phase =
        saved.phase === "loading" ? "transition" : saved.phase;
      setState({
        ...saved,
        phase,
        caseStartTime:
          saved.phase === "case" ? Date.now() : saved.caseStartTime,
        endings: null,
      });
      setHasSave(false);
    }
  }, []);

  const selectLanguage = useCallback((lang) => {
    const c1 = lang === "bn" ? case1BN : case1;
    saveState((prev) => ({
      ...prev,
      phase: "intro",
      cases: [{ ...c1, case_number: 1 }],
    }));
  }, [saveState]);

  const startSession = useCallback(() => {
    saveState((prev) => ({
      ...prev,
      phase: "case",
      caseStartTime: Date.now(),
    }));
  }, [saveState]);

  const submitVerdict = useCallback(
    (verdictData) => {
      saveState((prev) => {
        const currentCase = prev.cases[prev.currentCaseIndex];
        const signalWeights = currentCase.signal_weights;
        const timeTaken = prev.caseStartTime
          ? Date.now() - prev.caseStartTime
          : 0;

        const verdict = {
          ...verdictData,
          timeTaken,
          caseIndex: prev.currentCaseIndex,
        };

        let profile = updateProfile(prev.profile, signalWeights, verdict);
        const guiltySeverities = [...prev.verdicts, verdict]
          .filter((v) => v.verdict === "guilty")
          .map((v) => v.severity ?? 5);
        profile = updateConsistency(profile, guiltySeverities);

        const reaction =
          prev.currentCaseIndex === 0
            ? verdictData.verdict === "guilty"
              ? currentCase.elias_reaction_guilty
              : currentCase.elias_reaction_not_guilty
            : currentCase.elias_reaction;

        return {
          ...prev,
          verdicts: [...prev.verdicts, verdict],
          profile,
          phase: "transition",
          lastReaction: reaction,
          transitionCaseNumber: prev.currentCaseIndex + 1,
        };
      });
    },
    [saveState]
  );

  const advanceAfterTransition = useCallback(() => {
    saveState((prev) => {
      const nextIndex = prev.currentCaseIndex + 1;
      return {
        ...prev,
        currentCaseIndex: nextIndex,
        phase: nextIndex < prev.cases.length ? "case" : "loading",
        caseStartTime: Date.now(),
      };
    });
  }, [saveState]);

  const addCase = useCallback(
    (caseData) => {
      saveState((prev) => {
        const newIndex = prev.cases.length;
        return {
          ...prev,
          cases: [
            ...prev.cases,
            { ...caseData, case_number: newIndex + 1 },
          ],
          currentCaseIndex: newIndex,
          phase: "case",
          caseStartTime: Date.now(),
        };
      });
    },
    [saveState]
  );

  const addFinalCases = useCallback(
    (case9, case10) => {
      saveState((prev) => {
        const newIndex = prev.cases.length;
        return {
          ...prev,
          cases: [
            ...prev.cases,
            { ...case9, case_number: 9 },
            { ...case10, case_number: 10 },
          ],
          currentCaseIndex: newIndex,
          pendingFinalCases: null,
          phase: "case",
          caseStartTime: Date.now(),
        };
      });
    },
    [saveState]
  );

  const setPhase = useCallback(
    (phase) => {
      saveState((prev) => ({ ...prev, phase }));
    },
    [saveState]
  );

  const setEndings = useCallback(
    (endings) => {
      saveState((prev) => ({
        ...prev,
        endings,
        phase: "ending",
      }));
      localStorage.removeItem(STORAGE_KEY);
    },
    [saveState]
  );

  const storePendingFinalCases = useCallback(
    (cases) => {
      saveState((prev) => ({
        ...prev,
        pendingFinalCases: cases,
      }));
    },
    [saveState]
  );

  return {
    state,
    hasSave,
    initialized,
    startNewGame,
    continueGame,
    startSession,
    submitVerdict,
    selectLanguage,
    advanceAfterTransition,
    addCase,
    addFinalCases,
    setPhase,
    setEndings,
    storePendingFinalCases,
    showSavePrompt: () => saveState((prev) => ({ ...prev, phase: "save_prompt" })),
  };
}
