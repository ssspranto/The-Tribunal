export const archetypes = [
  {
    id: "ironRuleKeeper",
    match: (p) => p.framework_score > 0.65 && p.leniency_score > 0.65,
  },
  {
    id: "empatheticOverride",
    match: (p) => p.empathy_score > 0.65 && p.leniency_score < 0.4,
  },
  {
    id: "principledPragmatist",
    match: (p) =>
      Math.abs(p.framework_score - 0.5) < 0.2 &&
      Math.abs(p.empathy_score - 0.5) < 0.2,
  },
  {
    id: "contextualJudge",
    match: (p) => p.consistency_score < 0.35,
  },
  {
    id: "strictConsequentialist",
    match: (p) => p.empathy_score < 0.35 && p.framework_score > 0.5,
  },
];

export function deriveArchetype(profile, t) {
  let matchedId = "principledPragmatist";
  for (const archetype of archetypes) {
    if (archetype.match(profile)) {
      matchedId = archetype.id;
      break;
    }
  }
  
  const data = t.archetypes[matchedId];
  return {
    id: matchedId,
    label: data.label,
    description: data.description
  };
}
