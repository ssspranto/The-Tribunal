import { generateWithRetry, getLanguageInstruction } from "./ai";

export async function generateFinalCases(history, profile, language = "en") {
  const languageInstruction = getLanguageInstruction(language);
  const storyNarrative = history
    .slice(0, 8)
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

  return generateWithRetry(() => `${languageInstruction}

You are generating the two final and hardest cases for The Tribunal. Elias Voss has appeared before this judge 8 times.

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
}`);
}
