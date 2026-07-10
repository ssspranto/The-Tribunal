import { z } from "zod";

const signalWeights = z.object({
  framework: z.number(),
  leniency: z.number(),
  empathy: z.number(),
});

const caseData = z.object({
  bridge_narrative: z.string(),
  emotional_state: z.string(),
  crime_tag: z.string(),
  case_title: z.string(),
  case_body: z.string(),
  elias_reaction: z.string(),
  signal_weights: signalWeights,
});

const tolerantCaseData = z.object({
  bridge_narrative: z.string().catch("The weight of prior events pressed on Elias."),
  emotional_state: z.string().catch("anxious"),
  crime_tag: z.string().catch("Judgment"),
  case_title: z.string().catch("Untitled"),
  case_body: z.string().catch("The details of this case are unclear."),
  elias_reaction: z.string().catch("Elias waited for the verdict in silence."),
  signal_weights: signalWeights.catch({ framework: 0, leniency: 0, empathy: 0 }),
});

export const finalCasesSchema = z.object({
  case_9: caseData,
  case_10: caseData,
});

export const tolerantFinalCasesSchema = z.object({
  case_9: tolerantCaseData,
  case_10: tolerantCaseData,
});

export const endingsSchema = z.object({
  elias_ending: z.object({
    paragraphs: z.array(z.string()).min(4).max(4),
    outcome_tag: z.string(),
  }),
  judge_ending: z.object({
    paragraphs: z.array(z.string()).min(3).max(3),
    feeling_tag: z.string(),
  }),
  archetype_label: z.string(),
  archetype_description: z.string(),
});

export const tolerantEndingsSchema = z.object({
  elias_ending: z.object({
    paragraphs: z.array(z.string()).min(1).max(6).catch(["The verdict was delivered."]),
    outcome_tag: z.string().catch("unknown"),
  }),
  judge_ending: z.object({
    paragraphs: z.array(z.string()).min(1).max(5).catch(["The judge reflected on the case."]),
    feeling_tag: z.string().catch("unknown"),
  }),
  archetype_label: z.string().catch("Unknown"),
  archetype_description: z.string().catch("Unknown"),
});
