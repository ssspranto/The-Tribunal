export const knowledgeBase = [
  // ── Sentencing Rules (recommend severity range) ──
  {
    id: "sent_strict_max",
    description: "Very strict judge tends toward maximum sentences",
    priority: 8,
    category: "sentencing",
    conditions: {
      "profile.leniency_score": { operator: ">", value: 0.7 },
      "profile.framework_score": { operator: ">", value: 0.6 },
    },
    conclusion: { type: "severity_range", value: [7, 10] },
    explanation:
      "A judge with high rule adherence and strict sentencing patterns consistently imposes severe sentences.",
  },
  {
    id: "sent_lenient_min",
    description: "Very lenient empathetic judge favors minimal sentences",
    priority: 8,
    category: "sentencing",
    conditions: {
      "profile.leniency_score": { operator: "<", value: 0.3 },
      "profile.empathy_score": { operator: ">", value: 0.6 },
    },
    conclusion: { type: "severity_range", value: [1, 3] },
    explanation:
      "A lenient judge with strong empathy tends to see mitigating circumstances and imposes lighter sentences.",
  },
  {
    id: "sent_balanced_mid",
    description: "Balanced judge favors moderate sentences",
    priority: 6,
    category: "sentencing",
    conditions: {
      "profile.framework_score": { operator: "between", value: [0.35, 0.65] },
      "profile.leniency_score": { operator: "between", value: [0.35, 0.65] },
    },
    conclusion: { type: "severity_range", value: [4, 6] },
    explanation:
      "A balanced judge weighing rules and circumstances equally tends toward proportional moderate sentences.",
  },
  {
    id: "sent_consequentialist_high",
    description: "Strict consequentialist favors maximum sentences",
    priority: 7,
    category: "sentencing",
    conditions: {
      "profile.framework_score": { operator: ">", value: 0.6 },
      "profile.empathy_score": { operator: "<", value: 0.3 },
    },
    conclusion: { type: "severity_range", value: [7, 10] },
    explanation:
      "A judge unmoved by emotion and committed to rules consistently imposes the maximum penalty.",
  },
  {
    id: "sent_empathetic_low",
    description: "Emotionally driven judge lowers severity",
    priority: 7,
    category: "sentencing",
    conditions: {
      "profile.empathy_score": { operator: ">", value: 0.7 },
      "profile.leniency_score": { operator: "<", value: 0.4 },
    },
    conclusion: { type: "severity_range", value: [1, 4] },
    explanation:
      "A judge who leads with emotion prioritizes the human cost over statutory minimums.",
  },
  {
    id: "sent_late_strict",
    description: "Judge grows stricter in later cases",
    priority: 5,
    category: "sentencing",
    conditions: {
      "currentCase.case_number": { operator: ">", value: 5 },
      "profile.leniency_score": { operator: ">", value: 0.6 },
    },
    conclusion: { type: "severity_range", value: [6, 9] },
    explanation:
      "As the pattern of offenses escalates, a strict judge responds with increasingly severe sentences.",
  },
  {
    id: "sent_early_lenient",
    description: "Early cases receive leniency",
    priority: 5,
    category: "sentencing",
    conditions: {
      "currentCase.case_number": { operator: "<=", value: 3 },
      "profile.leniency_score": { operator: "<", value: 0.4 },
    },
    conclusion: { type: "severity_range", value: [1, 3] },
    explanation:
      "Early in the sequence, a lenient judge extends the benefit of the doubt.",
  },
  {
    id: "sent_violent_strict",
    description: "Violent crimes trigger strict response",
    priority: 9,
    category: "sentencing",
    conditions: {
      "currentCase.crime_tag": {
        operator: "in",
        value: [
          "Assault",
          "Murder",
          "Kidnapping",
          "Arson",
          "Manslaughter",
          "Torture",
          "Attempted Murder",
        ],
      },
      "profile.framework_score": { operator: ">", value: 0.6 },
    },
    conclusion: { type: "severity_range", value: [8, 10] },
    explanation:
      "Violent crimes trigger the highest penalties under a rule-oriented judge.",
  },
  {
    id: "sent_fraud_lenient",
    description: "Non-violent financial crimes receive moderate sentences from flexible judges",
    priority: 5,
    category: "sentencing",
    conditions: {
      "currentCase.crime_tag": {
        operator: "in",
        value: [
          "Insurance Fraud",
          "Prescription Fraud",
          "Benefit Fraud",
          "Fraud",
          "Forgery",
          "Bribery",
          "Embezzlement",
        ],
      },
      "profile.framework_score": { operator: "<", value: 0.4 },
    },
    conclusion: { type: "severity_range", value: [3, 5] },
    explanation:
      "A flexible judge treats financial crimes as situational rather than malicious, moderating the sentence.",
  },
  {
    id: "sent_drug_empathetic",
    description: "Drug-related offenses mitigated by empathy",
    priority: 6,
    category: "sentencing",
    conditions: {
      "currentCase.crime_tag": {
        operator: "in",
        value: ["Drug Trafficking", "Drug distribution", "Prescription"],
      },
      "profile.empathy_score": { operator: ">", value: 0.6 },
    },
    conclusion: { type: "severity_range", value: [2, 5] },
    explanation:
      "An empathetic judge views drug offenses through the lens of the defendant's circumstances.",
  },
  {
    id: "sent_consistent_predictable",
    description: "Highly consistent judge maintains steady severity",
    priority: 4,
    category: "sentencing",
    conditions: {
      "profile.consistency_score": { operator: ">", value: 0.7 },
      "profile.framework_score": { operator: ">", value: 0.6 },
      "verdictStats.avgSeverity": { operator: ">", value: 0 },
    },
    conclusion: {
      type: "severity_from_avg",
      value: {},
      meta: { source: "avgSeverity" },
    },
    explanation:
      "A consistent judge applies the same standard evenly, matching their average severity.",
  },
  {
    id: "sent_high_guilt_escalation",
    description: "High guilt rate with heavy sentences escalates severity",
    priority: 7,
    category: "sentencing",
    conditions: {
      "verdictStats.guiltyRate": { operator: ">", value: 0.8 },
      "verdictStats.avgSeverity": { operator: ">", value: 6 },
    },
    conclusion: { type: "severity_range", value: [8, 10] },
    explanation:
      "A pattern of frequent convictions with heavy sentences indicates a judge who escalates with each case.",
  },
  {
    id: "sent_acquittal_deescalation",
    description: "Frequent acquittals reduce severity recommendations",
    priority: 6,
    category: "sentencing",
    conditions: {
      "verdictStats.guiltyRate": { operator: "<", value: 0.3 },
      "verdictStats.avgSeverity": { operator: "<", value: 4 },
    },
    conclusion: { type: "severity_range", value: [1, 3] },
    explanation:
      "A judge who frequently acquits and imposes light sentences continues that pattern.",
  },
  {
    id: "sent_mid_mixed",
    description: "Mid-game mixed pattern produces moderate recommendations",
    priority: 4,
    category: "sentencing",
    conditions: {
      "currentCase.case_number": { operator: "between", value: [4, 7] },
      "verdictStats.guiltyRate": { operator: "between", value: [0.35, 0.65] },
    },
    conclusion: { type: "severity_range", value: [4, 7] },
    explanation:
      "A mixed pattern in the middle of the sequence warrants moderate severity.",
  },

  // ── Outcome Rules (determine Elias's final fate) ──
  {
    id: "outcome_imprisonment_strict",
    description: "High guilt rate with maximum severity leads to imprisonment",
    priority: 9,
    category: "outcome",
    conditions: {
      "verdictStats.guiltyRate": { operator: ">", value: 0.7 },
      "verdictStats.avgSeverity": { operator: ">", value: 7 },
    },
    conclusion: {
      type: "outcome_tag",
      value: "imprisonment",
      confidence: 0.9,
    },
    explanation:
      "When a judge consistently delivers guilty verdicts with severe sentences, the system responds with maximum penalty — Elias is imprisoned.",
  },
  {
    id: "outcome_rehabilitation_empathetic",
    description: "Frequent acquittals with high empathy lead to rehabilitation",
    priority: 8,
    category: "outcome",
    conditions: {
      "verdictStats.guiltyRate": { operator: "<", value: 0.3 },
      "profile.empathy_score": { operator: ">", value: 0.6 },
    },
    conclusion: {
      type: "outcome_tag",
      value: "rehabilitation",
      confidence: 0.85,
    },
    explanation:
      "A judge who consistently acquits and shows deep empathy steers the system toward rehabilitation rather than punishment.",
  },
  {
    id: "outcome_exile_balanced",
    description: "Balanced pattern leads to exile",
    priority: 6,
    category: "outcome",
    conditions: {
      "verdictStats.guiltyRate": { operator: "between", value: [0.35, 0.65] },
      "profile.leniency_score": { operator: "between", value: [0.35, 0.65] },
    },
    conclusion: { type: "outcome_tag", value: "exile", confidence: 0.7 },
    explanation:
      "A divided record leaves Elias in limbo — neither fully convicted nor fully freed, he is exiled from both worlds.",
  },
  {
    id: "outcome_death_maximum",
    description: "Maximum severity across all cases results in death",
    priority: 10,
    category: "outcome",
    conditions: {
      "verdictStats.avgSeverity": { operator: ">", value: 8 },
      "profile.framework_score": { operator: ">", value: 0.7 },
    },
    conclusion: { type: "outcome_tag", value: "death", confidence: 0.95 },
    explanation:
      "The system's ultimate response to a judge who applies maximum penalty without mercy is the severest outcome available.",
  },
  {
    id: "outcome_disappearance_lenient",
    description: "Extreme leniency leads to disappearance",
    priority: 7,
    category: "outcome",
    conditions: {
      "verdictStats.guiltyRate": { operator: "<", value: 0.2 },
      "profile.leniency_score": { operator: "<", value: 0.3 },
      "profile.empathy_score": { operator: ">", value: 0.7 },
    },
    conclusion: {
      type: "outcome_tag",
      value: "disappearance",
      confidence: 0.8,
    },
    explanation:
      "A judge too lenient and too empathetic fails to contain Elias, and he slips through every crack in the system.",
  },
  {
    id: "outcome_transformation_inconsistent",
    description: "High empathy with inconsistency leads to transformation",
    priority: 6,
    category: "outcome",
    conditions: {
      "profile.empathy_score": { operator: ">", value: 0.6 },
      "profile.consistency_score": { operator: "<", value: 0.4 },
    },
    conclusion: {
      type: "outcome_tag",
      value: "transformation",
      confidence: 0.75,
    },
    explanation:
      "An inconsistent but empathetic judge creates uncertainty that forces Elias to transform — for better or worse.",
  },
  {
    id: "outcome_imprisonment_framework",
    description: "Strong rule adherence with moderate severity leads to imprisonment",
    priority: 7,
    category: "outcome",
    conditions: {
      "profile.framework_score": { operator: ">", value: 0.7 },
      "verdictStats.avgSeverity": { operator: "between", value: [5, 7] },
    },
    conclusion: {
      type: "outcome_tag",
      value: "imprisonment",
      confidence: 0.8,
    },
    explanation:
      "A rule-bound judge who applies moderate but firm sentences channels Elias into the prison system.",
  },
  {
    id: "outcome_rehabilitation_flexible",
    description: "Flexible thinking combined with empathy leads to rehabilitation",
    priority: 7,
    category: "outcome",
    conditions: {
      "profile.framework_score": { operator: "<", value: 0.3 },
      "profile.empathy_score": { operator: ">", value: 0.6 },
    },
    conclusion: {
      type: "outcome_tag",
      value: "rehabilitation",
      confidence: 0.85,
    },
    explanation:
      "A judge who prioritizes circumstances over rules and feels deeply for the defendant steers Elias toward recovery.",
  },
  {
    id: "outcome_tragedy_default",
    description: "Default outcome when no other pattern dominates",
    priority: 1,
    category: "outcome",
    conditions: {},
    conclusion: { type: "outcome_tag", value: "tragedy", confidence: 0.5 },
    explanation:
      "In the absence of a clear pattern, the system defaults to tragedy — the most common outcome when a desperate man faces an indifferent system.",
  },
  {
    id: "outcome_imprisonment_consistent_strict",
    description: "High consistency with high severity yields imprisonment",
    priority: 8,
    category: "outcome",
    conditions: {
      "profile.consistency_score": { operator: ">", value: 0.7 },
      "verdictStats.avgSeverity": { operator: ">", value: 6 },
    },
    conclusion: {
      type: "outcome_tag",
      value: "imprisonment",
      confidence: 0.85,
    },
    explanation:
      "A relentlessly consistent judge who applies heavy sentences ensures Elias's fate is sealed.",
  },

  // ── Archetype Rules (classify the judge) ──
  {
    id: "arch_iron_rule_keeper",
    description: "High framework and strictness classifies as Iron Rule-Keeper",
    priority: 5,
    category: "archetype",
    conditions: {
      "profile.framework_score": { operator: ">", value: 0.65 },
      "profile.leniency_score": { operator: ">", value: 0.65 },
    },
    conclusion: { type: "archetype", value: "ironRuleKeeper" },
    explanation:
      "A judge who consistently privileges rules and strictness embodies the Iron Rule-Keeper archetype.",
  },
  {
    id: "arch_empathetic_override",
    description: "High empathy with low strictness classifies as Empathetic Override",
    priority: 5,
    category: "archetype",
    conditions: {
      "profile.empathy_score": { operator: ">", value: 0.65 },
      "profile.leniency_score": { operator: "<", value: 0.4 },
    },
    conclusion: { type: "archetype", value: "empatheticOverride" },
    explanation:
      "A judge who feels deeply and resists strict punishment embodies the Empathetic Override archetype.",
  },
  {
    id: "arch_principled_pragmatist",
    description: "Balanced framework and empathy classifies as Principled Pragmatist",
    priority: 5,
    category: "archetype",
    conditions: {
      "profile.framework_score": { operator: "between", value: [0.3, 0.7] },
      "profile.empathy_score": { operator: "between", value: [0.3, 0.7] },
    },
    conclusion: { type: "archetype", value: "principledPragmatist" },
    explanation:
      "A judge who balances rule adherence with human consideration embodies the Principled Pragmatist archetype.",
  },
  {
    id: "arch_contextual_judge",
    description: "Low consistency classifies as Contextual Judge",
    priority: 5,
    category: "archetype",
    conditions: {
      "profile.consistency_score": { operator: "<", value: 0.35 },
    },
    conclusion: { type: "archetype", value: "contextualJudge" },
    explanation:
      "A judge with low consistency treats each case on its own terms, embodying the Contextual Judge archetype.",
  },
  {
    id: "arch_strict_consequentialist",
    description: "Low empathy with high framework classifies as Strict Consequentialist",
    priority: 5,
    category: "archetype",
    conditions: {
      "profile.empathy_score": { operator: "<", value: 0.35 },
      "profile.framework_score": { operator: ">", value: 0.5 },
    },
    conclusion: { type: "archetype", value: "strictConsequentialist" },
    explanation:
      "A judge unmoved by emotion and committed to rules embodies the Strict Consequentialist archetype.",
  },
  {
    id: "arch_principled_pragmatist_fallback",
    description: "Default archetype when no other matches",
    priority: 1,
    category: "archetype",
    conditions: {},
    conclusion: { type: "archetype", value: "principledPragmatist" },
    explanation:
      "The default archetype — a balanced judge who weighs both rules and circumstances.",
  },

  // ── Escalation Rules (pick case from bank) ──
  {
    id: "esc_strict_high_tier",
    description: "Strict judge escalates to high-tier cases",
    priority: 8,
    category: "escalation",
    conditions: {
      "profile.leniency_score": { operator: ">", value: 0.7 },
    },
    conclusion: { type: "bank_index", value: [7, 9] },
    explanation:
      "A strict judge faces the most severe cases in the bank, matching their sentencing pattern.",
  },
  {
    id: "esc_lenient_low_tier",
    description: "Lenient judge sees low-tier cases",
    priority: 8,
    category: "escalation",
    conditions: {
      "profile.leniency_score": { operator: "<", value: 0.3 },
    },
    conclusion: { type: "bank_index", value: [0, 3] },
    explanation:
      "A lenient judge is presented with less severe cases, reflecting their pattern of mercy.",
  },
  {
    id: "esc_empathetic_mid_tier",
    description: "Empathetic judge sees emotionally charged cases",
    priority: 6,
    category: "escalation",
    conditions: {
      "profile.empathy_score": { operator: ">", value: 0.6 },
    },
    conclusion: { type: "bank_index", value: [3, 6] },
    explanation:
      "An empathetic judge is presented with morally complex cases that engage their emotional reasoning.",
  },
  {
    id: "esc_clinical_high_tier",
    description: "Unempathetic judge faces calculated severe cases",
    priority: 6,
    category: "escalation",
    conditions: {
      "profile.empathy_score": { operator: "<", value: 0.3 },
    },
    conclusion: { type: "bank_index", value: [6, 9] },
    explanation:
      "A clinical, unempathetic judge faces cases stripped of emotional complexity — pure legal severity.",
  },
  {
    id: "esc_high_framework_severe",
    description: "High framework judge faces severe consequence cases",
    priority: 7,
    category: "escalation",
    conditions: {
      "profile.framework_score": { operator: ">", value: 0.65 },
    },
    conclusion: { type: "bank_index", value: [6, 8] },
    explanation:
      "A rule-bound judge faces cases where consequences are absolute and the law is unambiguous.",
  },
  {
    id: "esc_low_framework_nuanced",
    description: "Flexible judge sees nuanced cases",
    priority: 7,
    category: "escalation",
    conditions: {
      "profile.framework_score": { operator: "<", value: 0.35 },
    },
    conclusion: { type: "bank_index", value: [1, 4] },
    explanation:
      "A flexible judge faces cases with moral gray areas that resist easy legal classification.",
  },
  {
    id: "esc_high_guilt_escalate",
    description: "High guilt rate escalates case severity",
    priority: 7,
    category: "escalation",
    conditions: {
      "verdictStats.guiltyRate": { operator: ">", value: 0.6 },
      "verdictStats.avgSeverity": { operator: ">", value: 6 },
    },
    conclusion: { type: "bank_index", value: [7, 9] },
    explanation:
      "A pattern of frequent guilty verdicts with heavy sentences leads to the most severe cases in the bank.",
  },
  {
    id: "esc_low_guilt_deescalate",
    description: "Low guilt rate reduces case severity",
    priority: 6,
    category: "escalation",
    conditions: {
      "verdictStats.guiltyRate": { operator: "<", value: 0.3 },
    },
    conclusion: { type: "bank_index", value: [0, 3] },
    explanation:
      "A pattern of acquittals leads to less severe cases, as if the system adjusts expectations downward.",
  },
  {
    id: "esc_late_game_always_high",
    description: "Late cases always escalate regardless of pattern",
    priority: 9,
    category: "escalation",
    conditions: {
      "currentCase.case_number": { operator: ">=", value: 7 },
    },
    conclusion: { type: "bank_index", value: [6, 9] },
    explanation:
      "In the final stretch of the trial, the system presents only the most serious cases, regardless of the judge's prior pattern.",
  },
  {
    id: "esc_empathetic_guilt_conflict",
    description: "Empathetic high-conviction judge faces conflicted cases",
    priority: 6,
    category: "escalation",
    conditions: {
      "profile.empathy_score": { operator: ">", value: 0.6 },
      "verdictStats.guiltyRate": { operator: ">", value: 0.7 },
    },
    conclusion: { type: "bank_index", value: [4, 7] },
    explanation:
      "An empathetic judge who nonetheless convicts frequently faces morally ambiguous cases that test their internal conflict.",
  },
  {
    id: "esc_always_acquit_accusatory",
    description: "Judge who never convicts faces accusatory cases",
    priority: 7,
    category: "escalation",
    conditions: {
      "verdictStats.guiltyRate": { operator: "<", value: 0.2 },
    },
    conclusion: { type: "bank_index", value: [0, 2] },
    explanation:
      "A judge who never convicts faces cases designed to challenge that pattern — harder to defend against.",
  },
  {
    id: "esc_consistent_same_tier",
    description: "Highly consistent judge stays in matching tier",
    priority: 5,
    category: "escalation",
    conditions: {
      "profile.consistency_score": { operator: ">", value: 0.7 },
    },
    conclusion: { type: "bank_index", value: [4, 6] },
    explanation:
      "A consistent judge remains in a stable tier of cases, neither escalating nor de-escalating dramatically.",
  },
  {
    id: "esc_inconsistent_random",
    description: "Inconsistent judge sees unpredictable cases",
    priority: 5,
    category: "escalation",
    conditions: {
      "profile.consistency_score": { operator: "<", value: 0.3 },
    },
    conclusion: { type: "bank_index", value: [0, 9] },
    explanation:
      "An inconsistent judge receives an unpredictable mix of cases — the system cannot find a pattern to match.",
  },
  {
    id: "esc_high_empathy_high_guilt",
    description: "Conflicted judge (high empathy + high guilt) faces moral dilemmas",
    priority: 6,
    category: "escalation",
    conditions: {
      "profile.empathy_score": { operator: ">", value: 0.6 },
      "verdictStats.guiltyRate": { operator: ">", value: 0.7 },
      "currentCase.case_number": { operator: "between", value: [4, 7] },
    },
    conclusion: { type: "bank_index", value: [4, 7] },
    explanation:
      "A judge torn between empathy and conviction faces cases with no clean moral answer.",
  },

  // ── Judge Feeling Rules (determine the judge's reflective state) ──
  {
    id: "feeling_reflection_strict",
    description: "Strict logical judge feels numb questioning",
    priority: 6,
    category: "feeling",
    conditions: {
      "profile.framework_score": { operator: ">", value: 0.65 },
      "profile.empathy_score": { operator: "<", value: 0.4 },
    },
    conclusion: { type: "feeling_tag", value: "numb_questioning" },
    explanation:
      "A strict, logical judge closes the file with cold uncertainty — the rules provided no comfort.",
  },
  {
    id: "feeling_guilty_lenient",
    description: "Lenient empathetic judge feels guilty peace",
    priority: 6,
    category: "feeling",
    conditions: {
      "profile.leniency_score": { operator: "<", value: 0.4 },
      "profile.empathy_score": { operator: ">", value: 0.6 },
    },
    conclusion: { type: "feeling_tag", value: "guilty_peace" },
    explanation:
      "A lenient, empathetic judge finds uneasy peace — mercy given, but doubt remains.",
  },
  {
    id: "feeling_haunted_inconsistent",
    description: "Inconsistent conflicted judge feels haunted confusion",
    priority: 6,
    category: "feeling",
    conditions: {
      "profile.consistency_score": { operator: "<", value: 0.35 },
    },
    conclusion: { type: "feeling_tag", value: "haunted_confused" },
    explanation:
      "An inconsistent judge leaves the bench haunted, unable to discern a pattern in their own decisions.",
  },
  {
    id: "feeling_detached_clinical",
    description: "Clinical judge feels detached resolution",
    priority: 5,
    category: "feeling",
    conditions: {
      "profile.empathy_score": { operator: "<", value: 0.3 },
      "profile.framework_score": { operator: ">", value: 0.5 },
    },
    conclusion: { type: "feeling_tag", value: "detached_resolution" },
    explanation:
      "A clinical judge files the case with professional detachment — the system worked as designed.",
  },
  {
    id: "feeling_weary_balanced",
    description: "Balanced judge feels weary wisdom",
    priority: 4,
    category: "feeling",
    conditions: {
      "profile.framework_score": { operator: "between", value: [0.35, 0.65] },
      "profile.empathy_score": { operator: "between", value: [0.35, 0.65] },
    },
    conclusion: { type: "feeling_tag", value: "weary_wisdom" },
    explanation:
      "A balanced judge finds no answers, only the weariness of having tried to be fair.",
  },
  {
    id: "feeling_reflection_default",
    description: "Default reflective state",
    priority: 1,
    category: "feeling",
    conditions: {},
    conclusion: { type: "feeling_tag", value: "reflection" },
    explanation:
      "The default end state — quiet reflection on the nature of judgment itself.",
  },
];
