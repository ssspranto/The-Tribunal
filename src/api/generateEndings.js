import { generateWithRetry, getLanguageInstruction } from "./ai";
import { endingsSchema, tolerantEndingsSchema } from "./schemas";
import { fallbackEndings } from "../data/fallbackEndings";
import { fallbackEndingsBN } from "../data/fallbackEndingsBN";

export async function generateEndings(
  history,
  profile,
  reasonings,
  avgDecisionTime,
  language = "en",
  outcomeTag = "tragedy",
  feelingTag = "reflection",
  archetypeData = { label: "The Principled Pragmatist", description: "You held rules in high regard but tempered them with proportionality." },
  onLog
) {
  const key = import.meta.env.VITE_OPENROUTER_API_KEY;
  if (!key || key === "your_openrouter_api_key_here") {
    throw new Error("API key not configured");
  }

  const languageInstruction = getLanguageInstruction(language);
  const historyText = history
    .map(
      (entry, i) => `Case ${i + 1} — ${entry.case_title}
Crime: ${entry.case_body}
Bridge: ${entry.bridge_narrative}
Elias's state: ${entry.emotional_state}
Verdict: ${entry.verdict ?? "none"}, Severity: ${entry.severity ?? "none"}/10
Judge's reasoning: ${entry.reasoning || "none given"}`
    )
    .join("\n---\n");
  
  const reasoningText =
    reasonings.length > 0
      ? reasonings.map((r, i) => `Case ${i + 1}: "${r}"`).join("\n")
      : "none provided";

  try {
    if (onLog) onLog("Generating endings via AI...");
    const raw = await generateWithRetry(() => `${languageInstruction}

You are writing the endings for The Tribunal. Elias Voss has been judged 10 times.

Complete case and verdict history:
${historyText}

Judge's final moral profile:
- Framework: ${profile.framework_score.toFixed(2)} (0=outcome-based, 1=rule-based)
- Leniency: ${profile.leniency_score.toFixed(2)} (0=lenient, 1=strict)
- Empathy: ${profile.empathy_score.toFixed(2)} (0=logical, 1=emotional)
- Archetype: ${archetypeData.label}
- Average decision time: ${avgDecisionTime.toFixed(1)} seconds

Judge's reasoning entries (where provided): ${reasoningText}

Write two endings. Both must feel like the direct, earned result of these specific verdicts — not generic outcomes.

An expert system has determined the following outcomes based on analysis of the judge's verdict pattern. Write the prose endings to arrive at these predetermined outcomes:

ELIAS'S ENDING:
- 4 paragraphs
- Direct consequence of the cumulative verdict pattern
- Maya (his daughter) must appear and her fate must be mentioned
- The outcome has been determined: "${outcomeTag}". Write 4 paragraphs about Elias reaching this fate.
- Must feel inevitable in hindsight

THE JUDGE'S ENDING:
- 3 paragraphs
- Describes only the judge's psychological/emotional state — NOT physical fate
- References at least 2 specific case titles by name
- If reasoning was provided by the player, reference the actual words used
- The judge's feeling has been determined: "${feelingTag}". Write 3 paragraphs expressing this state.
- Final sentence must read like a verdict delivered on the judge themselves

ADDITIONAL INSTRUCTION FOR ENDINGS:
The archetype_label and archetype_description fields in your response must also be written in the specified language. The feeling_tag and outcome_tag fields in the JSON must be set to "${feelingTag}" and "${outcomeTag}" respectively.

Return ONLY this JSON:
{
  "elias_ending": {
    "paragraphs": ["p1", "p2", "p3", "p4"],
    "outcome_tag": "${outcomeTag}"
  },
  "judge_ending": {
    "paragraphs": ["p1", "p2", "p3"],
    "feeling_tag": "${feelingTag}"
  },
  "archetype_label": "${archetypeData.label}",
  "archetype_description": "${archetypeData.description}"
}`, 2, onLog);
    if (onLog) onLog("AI response received, validating endings...");
    try {
      return endingsSchema.parse(raw);
    } catch (strictError) {
      const tolerant = tolerantEndingsSchema.safeParse(raw);
      if (tolerant.success) {
        if (onLog) onLog("AI response had missing fields, filled defaults");
        console.warn("[The Tribunal] AI endings response had missing fields, filled defaults:", strictError.message);
        return tolerant.data;
      }
      if (onLog) onLog("Validation failed, throwing error");
      throw strictError;
    }
  } catch (error) {
    if (onLog) onLog(`Failed, using fallback endings: ${error.message}`);
    console.warn("[The Tribunal] AI ending generation failed, using fallback endings:", error.message);
    return language === "bn" ? fallbackEndingsBN : fallbackEndings;
  }
}
