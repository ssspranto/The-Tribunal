import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import IntroScreen from "./components/IntroScreen";
import CaseCard from "./components/CaseCard";
import VerdictPanel from "./components/VerdictPanel";
import TransitionScreen from "./components/TransitionScreen";
import LoadingScreen from "./components/LoadingScreen";
import EndingScreen from "./components/EndingScreen";
import EliasAvatar from "./components/EliasAvatar";
import LanguageSelectScreen from "./components/LanguageSelectScreen";
import { useLanguage } from "./context/LanguageContext";
import { useGameState, buildHistory, getSpeedrunCase } from "./hooks/useGameState";
import {
  getAvatarExpression,
  getTimePassage,
} from "./hooks/useProfileTracker";
import { SCENARIO_BANKS } from "./data/scenarioBanks";
import { SCENARIO_BANKS_BN } from "./data/scenarioBanksBN";
import { generateFinalCases } from "./api/generateFinalCases";
import { generateEndings } from "./api/generateEndings";

const selectScenario = (verdict, severity, caseBank) => {
  const normalizedVerdict = verdict === "not_guilty" ? "not guilty" : verdict;
  if (normalizedVerdict === "not guilty") {
    const index = Math.floor((10 - 1) * (1 - (severity / 10)));
    return caseBank[Math.min(index, 4)];
  }

  const index = Math.floor((severity / 10) * 9);
  return caseBank[Math.max(index, 5)];
};

function SavePrompt({ onContinue, onStartOver }) {
  const { t } = useLanguage();
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[680px] flex-col items-center justify-center px-5 py-12">
      <p className="mb-8 text-center text-lg leading-relaxed text-[#1A2E1A]">
        {t.session.restoreMessage}
      </p>
      <div className="flex w-full max-w-sm flex-col gap-4">
        <button
          type="button"
          onClick={onContinue}
          className="rounded border border-[#2D6A4F] px-6 py-4 font-heading text-lg text-[#2D6A4F] transition-colors hover:bg-[#EEF4EE]"
        >
          {t.session.continueButton}
        </button>
        <button
          type="button"
          onClick={onStartOver}
          className="rounded border border-[#D4E0D4] px-6 py-4 text-[#4A6741] transition-colors hover:border-[#4A6741]"
        >
          {t.session.startOverButton}
        </button>
      </div>
    </div>
  );
}

function ErrorCard({ title, message, isQuota, onRetry, isRetrying }) {
  const { t } = useLanguage();
  return (
    <div className="mx-auto max-w-[680px] px-5 py-12">
      <div className="rounded border border-[#D4E0D4] bg-[#FFFFFF] p-6 text-center">
        <p className="mb-2 font-heading text-lg text-[#2D6A4F]">
          {title ?? t.errors.parseError}
        </p>
        <p className="mb-4 text-sm leading-relaxed text-[#4A6741]">{message}</p>
        {isQuota && (
          <p className="mb-6 text-xs text-[#4A6741]/80">
            <a
              href="https://aistudio.google.com/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2D6A4F] underline underline-offset-2 hover:text-[#52B788]"
            >
              Check your API key and usage in Google AI Studio
            </a>
          </p>
        )}
        <button
          type="button"
          onClick={onRetry}
          disabled={isRetrying}
          className="rounded border border-[#2D6A4F] px-6 py-3 bg-[#2D6A4F] text-white transition-colors hover:bg-[#1B4332] disabled:opacity-50"
        >
          {t.errors.tryAgain}
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const { language, t } = useLanguage();
  const {
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
    setSpeedrunMode,
  } = useGameState();

  const getScenarioBank = useCallback((lang) => 
    lang === "bn" ? SCENARIO_BANKS_BN : SCENARIO_BANKS, []);

  const getNextCase = useCallback((caseNumber, lastVerdict, lastSeverity) => {
    if (caseNumber === 1) return null;
    if (caseNumber >= 9) return null;
    const bank = getScenarioBank(language)[caseNumber];
    return selectScenario(lastVerdict, lastSeverity, bank);
  }, [language, getScenarioBank]);

  const [error, setError] = useState(null);
  const [errorTitle, setErrorTitle] = useState(null);
  const [errorIsQuota, setErrorIsQuota] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [loadingSubtitle, setLoadingSubtitle] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);
  const apiRunning = useRef(false);

  useEffect(() => {
    if (!initialized) return;
    if (hasSave && state.phase === "language_select") {
      setPhase("save_prompt");
    }
  }, [initialized, hasSave, state.phase, setPhase]);

  const runApiAction = useCallback(
    async (action, { subtitle } = {}) => {
      if (apiRunning.current) return;
      apiRunning.current = true;
      setError(null);
      setLoadingSubtitle(subtitle ?? null);
      setPhase("loading");

      try {
        await action();
      } catch (err) {
        setErrorTitle(err.title ?? null);
        setErrorIsQuota(err.isQuota ?? false);
        setError(err.userMessage ?? err.message ?? t.errors.apiError);
        setPendingAction(() => action);
        setPhase("error");
      } finally {
        apiRunning.current = false;
        setIsRetrying(false);
        setLoadingSubtitle(null);
      }
    },
    [setPhase, t.errors.apiError]
  );

  const handleTransitionComplete = useCallback(() => {
    const judgedIndex = state.currentCaseIndex;
    const judgedNumber = judgedIndex + 1;
    const lastVerdict = state.verdicts[judgedIndex];
    const history = buildHistory(
      state.cases.slice(0, judgedNumber),
      state.verdicts.slice(0, judgedNumber)
    );

    if (judgedNumber < state.cases.length) {
      advanceAfterTransition();
      return;
    }

    const hasAICases = state.cases.some((c) => c.case_number >= 9);
    if (hasAICases) {
      runApiAction(async () => {
        await new Promise((r) => setTimeout(r, 3000));
        const reasonings = state.verdicts
          .map((v) => v.reasoning)
          .filter((r) => r && r.length > 0);
        const avgDecisionTime =
          state.verdicts.reduce((s, v) => s + (v.timeTaken ?? 0), 0) /
          state.verdicts.length /
          1000;
        const endings = await generateEndings(
          buildHistory(state.cases, state.verdicts),
          state.profile,
          reasonings,
          avgDecisionTime,
          language
        );
        setEndings(endings);
      });
      return;
    }

    const nextCaseNumber = judgedNumber + 1;

    if (nextCaseNumber >= 9) {
      runApiAction(async () => {
        const result = await generateFinalCases(
          buildHistory(state.cases, state.verdicts),
          state.profile,
          language
        );
        addFinalCases(result.case_9, result.case_10);
      });
      return;
    }

    if (state.speedrunMode && nextCaseNumber === 2) {
      const speedrunCaseData = getSpeedrunCase(language);
      addCase(speedrunCaseData);
      return;
    }

    if (!state.speedrunMode && nextCaseNumber <= 8) {
      const caseData = getNextCase(
        nextCaseNumber,
        lastVerdict.verdict,
        lastVerdict.severity ?? 0
      );
      addCase(caseData);
      return;
    }

    runApiAction(async () => {
      const result = await generateFinalCases(
        buildHistory(state.cases, state.verdicts),
        state.profile,
        language
      );
      addFinalCases(result.case_9, result.case_10);
    });
  }, [
    state,
    runApiAction,
    addCase,
    addFinalCases,
    advanceAfterTransition,
    setEndings,
    getScenarioBank,
    language,
    getNextCase,
  ]);

  const handleRetry = () => {
    if (pendingAction) {
      setIsRetrying(true);
      runApiAction(pendingAction, {
        subtitle: t.errors.retrying,
      });
    }
  };

  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F7F5]">
        <LoadingScreen messages={[t.loading.messages[0]]} />
      </div>
    );
  }

  const currentCase = state.cases[state.currentCaseIndex];
  const caseNumber = state.currentCaseIndex + 1;
  const totalCases = state.speedrunMode ? 4 : 10;
  const avatarExpression = getAvatarExpression(
    caseNumber,
    state.profile.leniency_score
  );

  return (
    <div className={`min-h-screen bg-[#F5F7F5] text-[#1A2E1A] ${language === "bn" ? "lang-bn" : ""}`}>
      {state.phase === "language_select" && (
        <LanguageSelectScreen
          onSelect={(lang) => selectLanguage(lang)}
          speedrunMode={state.speedrunMode}
          onToggleSpeedrun={setSpeedrunMode}
        />
      )}

      {state.phase === "save_prompt" && (
        <SavePrompt
          onContinue={continueGame}
          onStartOver={startNewGame}
        />
      )}

      {state.phase === "intro" && (
        <IntroScreen onStart={startSession} totalCases={totalCases} />
      )}

      {state.phase === "case" && currentCase && (
        <div className="relative mx-auto max-w-[680px] px-5 py-8 pb-16">
          <div className="mb-6 flex justify-end sm:absolute sm:right-5 sm:top-8 sm:mb-0">
            <EliasAvatar
              expression={avatarExpression}
              emotionalState={currentCase.emotional_state}
            />
          </div>
          <div className="sm:pr-28">
            <CaseCard caseData={currentCase} caseNumber={caseNumber} totalCases={totalCases} />
            <VerdictPanel onSubmit={submitVerdict} disabled={false} />
          </div>
        </div>
      )}

      {state.phase === "transition" && (
        <TransitionScreen
          reaction={state.lastReaction}
          timePassage={t.transition.timePassage[state.transitionCaseNumber % t.transition.timePassage.length]}
          expression={avatarExpression}
          emotionalState={currentCase?.emotional_state}
          onComplete={handleTransitionComplete}
        />
      )}

      {state.phase === "loading" && (
        <LoadingScreen
          messages={
            state.verdicts.length >= 9
              ? t.loading.messages.slice(5)
              : [t.loading.messages[Math.floor(Math.random() * 5)]]
          }
          subtitle={loadingSubtitle}
        />
      )}

      {state.phase === "error" && (
        <ErrorCard
          title={errorTitle}
          message={error}
          isQuota={errorIsQuota}
          onRetry={handleRetry}
          isRetrying={isRetrying}
        />
      )}

      {state.phase === "ending" && state.endings && (
        <EndingScreen
          endings={state.endings}
          profile={state.profile}
          cases={state.cases}
          verdicts={state.verdicts}
          onRestart={startNewGame}
        />
      )}
    </div>
  );
}
