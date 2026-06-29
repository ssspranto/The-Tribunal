export const case1 = {
  bridge_narrative: null,
  emotional_state: "nervous",
  crime_tag: "Theft",
  case_title: "The first offence",
  case_body:
    "Elias Voss, 34, warehouse worker at Meridian Distribution, appeared before the court charged with theft of prescription painkillers from the pharmacy where his daughter's medication was filled. Security footage shows Voss removing two bottles of oxycodone from a storage shelf on March 14th. He did not resist arrest when confronted by pharmacy staff. Voss has no prior criminal record. His employer confirms he was a reliable worker for six years until his daughter Maya's insurance coverage was denied in January.",
  elias_reaction_guilty:
    "Elias lowered his eyes as the gavel fell, his shoulders folding inward as though the sentence had already been written.",
  elias_reaction_not_guilty:
    "Elias exhaled sharply, one hand pressed to his chest, as if he had been holding his breath since the arrest.",
  signal_weights: {
    framework: -0.2,
    leniency: 0.25,
    empathy: 0.25,
  },
};

export function getCase1Reaction(verdict) {
  return verdict === "guilty"
    ? case1.elias_reaction_guilty
    : case1.elias_reaction_not_guilty;
}
