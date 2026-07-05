export function formatTrace(trace) {
  return trace.map((entry) => ({
    step: `${entry.ruleId}: ${entry.description}`,
    category: entry.category,
    explanation: entry.explanation,
    conclusion: entry.conclusion,
  }));
}

export function summarizeTrace(trace) {
  const categories = {};
  for (const entry of trace) {
    const cat = entry.category;
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(entry.description);
  }
  return categories;
}

export function traceToSentences(trace) {
  return trace.map(
    (entry) =>
      `Rule ${entry.ruleId} fired (${entry.category}): ${entry.explanation}`
  );
}
