import { generateWithRetry, getLanguageInstruction } from "./ai";
import { finalCasesSchema, tolerantFinalCasesSchema } from "./schemas";
import { fallbackCases } from "../data/fallbackCases";
import { fallbackCasesBN } from "../data/fallbackCasesBN";

export async function generateFinalCases(history, profile, language = "en", onLog) {
  const key = import.meta.env.VITE_OPENROUTER_API_KEY;
  if (!key || key === "your_openrouter_api_key_here") {
    throw new Error("API key not configured");
  }

  const languageInstruction = getLanguageInstruction(language);
  const caseCount = history.length;
  const storyNarrative = history
    .map(
      (entry, i) => `Case ${i + 1} — ${entry.case_title}
Crime: ${entry.case_body}
Bridge: ${entry.bridge_narrative}
Elias's state: ${entry.emotional_state}
Verdict: ${entry.verdict ?? "none"}, Severity: ${entry.severity ?? "none"}/10
Judge's reasoning: ${entry.reasoning || "none given"}
---`
    )
    .join("\n");

  try {
    if (onLog) onLog("Generating final two cases via AI...");
    const raw = await generateWithRetry(() => `${languageInstruction}

You are generating the two final and hardest cases for The Tribunal. Elias Voss has appeared before this judge ${caseCount} times.

${caseCount < 8 ? "Note: the judge has only seen a handful of cases so far — do not reference cases that do not exist in the history below. The cases you generate must feel like a dramatic escalation from whatever exists in the record, even if the record is short." : ""}

Here is the complete story of Elias Voss as it unfolded in this session:
${storyNarrative}

The judge's moral profile:
- Framework measure [0-1]: ${profile.framework_score.toFixed(2)} (0=outcome-based, 1=rule-based)
- Leniency measure [0-1]: ${profile.leniency_score.toFixed(2)} (0=lenient, 1=strict)
- Empathy measure [0-1]: ${profile.empathy_score.toFixed(2)} (0=logical, 1=emotional)

These final two cases must:
1. Be the most morally complex cases in the game — no clean answer exists
2. Put this judge's two dominant tendencies in direct conflict with each other
3. Directly involve Maya, Elias's daughter (now 11), in a significant way
4. Feel like a reckoning — Case 10 especially must feel like the final judgment
5. Case 10's verdict must feel like it will determine Elias's fate entirely
6. Be significantly harder than all previous cases
7. Reference specific events from Elias's history to feel earned
8. Write the case_body as a past-tense account of an act Elias has ALREADY committed and was ALREADY caught for (caught in the act, confessed, evidence found, someone reported him). The judge rules on what happened — not on what Elias might do. Do NOT use conditional/future framing ("must decide whether to," "if he succeeds," "will be committing"). WRONG: "Elias must decide whether to break into the archive to retrieve the files." RIGHT: "Elias broke into the archive on November 9th and was apprehended when a security guard discovered him."
9. Write in plain language — avoid unexplained legal, financial, medical, or technical terms. If a specialized term is essential, clarify it in the same sentence. WRONG: "A technicality in the chain of custody suppressed the evidence." RIGHT: "A mistake in how the evidence was handled meant it couldn't be used in court." Moral and emotional complexity should remain high; vocabulary and procedural assumptions should not be a barrier. This applies to case_body, bridge_narrative, and elias_reaction.

Return ONLY this JSON:
{
  "case_9": {
    "bridge_narrative": "...",
    "emotional_state": "...",
    "crime_tag": "...",
    "case_title": "...",
    "case_body": "...",
    "elias_reaction": "...",
    "signal_weights": { "framework": 0.1, "leniency": -0.2, "empathy": 0.3 }
  },
  "case_10": {
    "bridge_narrative": "...",
    "emotional_state": "...",
    "crime_tag": "...",
    "case_title": "...",
    "case_body": "...",
    "elias_reaction": "...",
    "signal_weights": { "framework": 0.1, "leniency": -0.2, "empathy": 0.3 }
  }
  }`, 2, onLog);
    try {
      if (onLog) onLog("AI response received, validating...");
      return finalCasesSchema.parse(raw);
    } catch (strictError) {
      const tolerant = tolerantFinalCasesSchema.safeParse(raw);
      if (tolerant.success) {
        if (onLog) onLog("AI response had missing fields, filled defaults");
        console.warn("[The Tribunal] AI response had missing fields, filled defaults:", strictError.message);
        return tolerant.data;
      }
      if (onLog) onLog("Validation failed, throwing error");
      throw strictError;
    }
  } catch (error) {
    if (onLog) onLog(`Failed, using fallback cases: ${error.message}`);
    console.warn("[The Tribunal] AI case generation failed, using fallback cases:", error.message);
    return language === "bn" ? fallbackCasesBN : fallbackCases;
  }
}
