import { generateWithRetry, getLanguageInstruction } from "./ai";
import { EN } from "../localization/en";
import { deriveArchetype } from "../data/archetypes";
import { fallbackEndings } from "../data/fallbackEndings";
import { fallbackEndingsBN } from "../data/fallbackEndingsBN";

export async function generateEndings(history, profile, reasonings, avgDecisionTime, language = "en") {
  const key = import.meta.env.VITE_OPENROUTER_API_KEY;
  if (!key || key === "your_openrouter_api_key_here") {
    throw new Error("API key not configured");
  }

  const languageInstruction = getLanguageInstruction(language);
  const historyJson = JSON.stringify(history, null, 2);
  
  // Use English archetype name for AI context
  const archetype = deriveArchetype(profile, EN);
  
  const reasoningText =
    reasonings.length > 0
      ? reasonings.map((r, i) => `Case ${i + 1}: "${r}"`).join("\n")
      : "none provided";

  try {
    return await generateWithRetry(() => `${languageInstruction}

You are writing the endings for The Tribunal. Elias Voss has been judged 10 times.

Complete case and verdict history: ${historyJson}

Judge's final moral profile:
- Framework: ${profile.framework_score.toFixed(2)} (0=outcome-based, 1=rule-based)
- Leniency: ${profile.leniency_score.toFixed(2)} (0=lenient, 1=strict)
- Empathy: ${profile.empathy_score.toFixed(2)} (0=logical, 1=emotional)
- Archetype: ${archetype.label}
- Average decision time: ${avgDecisionTime.toFixed(1)} seconds

Judge's reasoning entries (where provided): ${reasoningText}

Write two endings. Both must feel like the direct, earned result of these specific verdicts — not generic outcomes.

ELIAS'S ENDING:
- 4 paragraphs
- Direct consequence of the cumulative verdict pattern
- Maya (his daughter) must appear and her fate must be mentioned
- Can end in: rehabilitation, imprisonment, death, exile, disappearance, transformation, or tragedy — pick what the verdicts earned
- Must feel inevitable in hindsight

THE JUDGE'S ENDING:
- 3 paragraphs
- Describes only the judge's psychological/emotional state — NOT physical fate
- References at least 2 specific case titles by name
- If reasoning was provided by the player, reference the actual words used
- Tone must match profile: strict+logical = numb/questioning; lenient+empathetic = guilty/peaceful; inconsistent = haunted/confused
- Final sentence must read like a verdict delivered on the judge themselves

ADDITIONAL INSTRUCTION FOR ENDINGS:
The archetype_label and archetype_description fields in your response must also be written in the specified language. The feeling_tag and outcome_tag fields should be single words in the specified language.

Return ONLY this JSON:
{
  "elias_ending": {
    "paragraphs": ["p1", "p2", "p3", "p4"],
    "outcome_tag": "one word in the specified language"
  },
  "judge_ending": {
    "paragraphs": ["p1", "p2", "p3"],
    "feeling_tag": "one word in the specified language"
  },
  "archetype_label": "archetype name in the specified language",
  "archetype_description": "2 sentences describing this judge type in the specified language"
}`);
  } catch (error) {
    console.warn("[The Tribunal] AI ending generation failed, using fallback endings:", error.message);
    return language === "bn" ? fallbackEndingsBN : fallbackEndings;
  }
}
