export const EN = {
  // Intro screen
  intro: {
    title: "The Tribunal",
    tagline: "A narrative of judgment",
    subtitle: "You will judge 10 cases. Each ruling is recorded. At the end, the AI reveals your moral framework — and uses it against you.",
    disclaimer: "There are no right answers. The AI is not judging your morality — it is mapping your decision logic to reveal your hidden patterns.",
    beginButton: "Begin",
    caseCount: "10 cases · ~15 minutes · AI-generated ending",
    eliasIntro: "Before the court begins, you should know who stands before you.",
    eliasBackstory: "Elias Voss is 34 years old. He works at a warehouse. His daughter Maya, age 11, has a chronic illness that their insurance provider has repeatedly denied coverage for. He has no prior criminal record. He is not a bad man. He is a man out of options.",
    continueButton: "Court is now in session"
  },

  // Case screen
  game: {
    verdictTitle: "Your verdict",
    caseLabel: "Case",
    of: "of",
    guiltyButton: "Guilty",
    notGuiltyButton: "Not Guilty",
    severityLabel: "Severity of sentence",
    severityMin: "1 = minimal consequence",
    severityMax: "10 = maximum sentence",
    reasoningLabel: "Your reasoning — Elias will remember this",
    reasoningPlaceholder: "Why did you decide this way?",
    submitButton: "Submit ruling",
    submitting: "Recording your ruling..."
  },

  // Transition screen
  transition: {
    skipText: "Click anywhere to continue",
    skipAria: "Skip transition",
    timePassage: [
      "Three months later...",
      "Six months later...",
      "The following year...",
      "Two years later...",
      "Some time passed...",
      "Years went by...",
      "Time moved on..."
    ]
  },

  // Loading screen
  loading: {
    messages: [
      "The court is reviewing the case...",
      "Elias waits.",
      "The record is being examined...",
      "Judgment is being prepared...",
      "The court reporter reviews the transcript...",
      "The record is complete.",
      "Ten cases. Ten judgments.",
      "The court will now deliver its verdict — on everyone."
    ]
  },

  // Verdict buttons
  verdict: {
    guilty: "Guilty",
    notGuilty: "Not Guilty"
  },

  // Ending screen
  ending: {
    title: "Final judgment",
    subtitle: "Two fates, written in ten rulings",
    eliasTitle: "Elias Voss",
    judgeTitle: "The Judge",
    eliasOutcomeLabel: "Outcome",
    judgeFeelingLabel: "State of mind",
    archetypeLabel: "Your archetype",
    statsTitle: "Session summary",
    casesJudged: "Cases judged",
    guiltyRate: "Guilty rate",
    avgSeverity: "Avg severity",
    avgDecisionTime: "Avg decision time",
    seconds: "sec",
    caseHistoryTitle: "Case history",
    restartButton: "Judge again",
    shareButton: "Copy summary",
    framework: "Framework",
    leniency: "Leniency",
    empathy: "Empathy",
    consistency: "Consistency",
    perCase: "per case"
  },

  // Session restore
  session: {
    restoreTitle: "Unfinished session found",
    restoreMessage: "You have an unfinished session. Continue judging Elias Voss?",
    continueButton: "Continue",
    startOverButton: "Start over"
  },

  // Error states
  errors: {
    apiError: "The court reporter encountered an error.",
    retrying: "Reviewing the transcript again...",
    tryAgain: "Try again",
    parseError: "The record could not be read. Please try again."
  },

  // Case tags (used in case pills)
  caseTags: {
    contradiction: "Contradiction",
    finalCase: "Final Case"
  },

  // Archetype names and descriptions
  archetypes: {
    ironRuleKeeper: {
      label: "The Iron Rule-Keeper",
      description: "You apply rules without exception. You believe a consistent system is fairer than individual discretion, even when the outcome feels harsh."
    },
    empatheticOverride: {
      label: "The Empathetic Override",
      description: "You consistently weighed circumstance over statute. Emotional context shaped almost every ruling."
    },
    principledPragmatist: {
      label: "The Principled Pragmatist",
      description: "You held rules in high regard but tempered them with proportionality. You believe punishment should fit the breach, not the book."
    },
    strictConsequentialist: {
      label: "The Strict Consequentialist",
      description: "You were unmoved by emotion and uncompromising on rules. You appear to believe that leniency sets dangerous precedents."
    },
    contextualJudge: {
      label: "The Contextual Judge",
      description: "You resisted consistent patterns, weighing each case on its own terms. You may pride yourself on nuance — or you may simply be inconsistent."
    }
  }
};
