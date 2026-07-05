function getValue(obj, path) {
  return path.split(".").reduce((current, key) => current?.[key], obj);
}

function evaluateCondition(actualValue, condition) {
  const { operator, value } = condition;
  switch (operator) {
    case ">":
      return actualValue > value;
    case ">=":
      return actualValue >= value;
    case "<":
      return actualValue < value;
    case "<=":
      return actualValue <= value;
    case "==":
      return actualValue === value;
    case "!=":
      return actualValue !== value;
    case "in":
      return value.includes(actualValue);
    case "between":
      return actualValue >= value[0] && actualValue <= value[1];
    default:
      return false;
  }
}

function ruleMatches(rule, workingMemory) {
  const conditionEntries = Object.entries(rule.conditions);
  if (conditionEntries.length === 0) return true;

  return conditionEntries.every(([field, condition]) => {
    const actualValue = getValue(workingMemory, field);
    if (actualValue === undefined || actualValue === null) return false;
    return evaluateCondition(actualValue, condition);
  });
}

function applyConclusion(workingMemory, conclusion) {
  const { type, value } = conclusion;
  if (!workingMemory.conclusions) {
    workingMemory.conclusions = {};
  }

  if (type === "severity_range") {
    workingMemory.conclusions.severityRange = value;
  } else if (type === "severity_from_avg") {
    const avg = workingMemory.verdictStats?.avgSeverity ?? 5;
    const range = [Math.max(1, Math.round(avg - 1)), Math.min(10, Math.round(avg + 1))];
    workingMemory.conclusions.severityRange = range;
  } else if (type === "outcome_tag") {
    if (!workingMemory.conclusions.outcome_tags) {
      workingMemory.conclusions.outcome_tags = [];
    }
    workingMemory.conclusions.outcome_tags.push({
      value,
      confidence: conclusion.confidence ?? 0.5,
    });
  } else if (type === "feeling_tag") {
    if (!workingMemory.conclusions.feeling_tags) {
      workingMemory.conclusions.feeling_tags = [];
    }
    workingMemory.conclusions.feeling_tags.push({
      value,
      confidence: conclusion.confidence ?? 0.5,
    });
  } else if (type === "archetype") {
    workingMemory.conclusions.archetype = value;
  } else if (type === "bank_index") {
    workingMemory.conclusions.bankIndexRange = value;
  }
}

export function forwardChain(initialWorkingMemory, ruleBase) {
  const workingMemory = JSON.parse(JSON.stringify(initialWorkingMemory));
  workingMemory.conclusions = {};
  workingMemory._trace = [];

  const firedRuleIds = new Set();
  let changed = true;
  let iterations = 0;
  const MAX_ITERATIONS = 100;

  while (changed && iterations < MAX_ITERATIONS) {
    changed = false;
    iterations++;

    const applicable = ruleBase
      .filter((rule) => !firedRuleIds.has(rule.id))
      .filter((rule) => ruleMatches(rule, workingMemory))
      .sort((a, b) => b.priority - a.priority);

    if (applicable.length > 0) {
      const rule = applicable[0];
      firedRuleIds.add(rule.id);

      applyConclusion(workingMemory, rule.conclusion);

      workingMemory._trace.push({
        ruleId: rule.id,
        description: rule.description,
        category: rule.category,
        conclusion: rule.conclusion,
        explanation: rule.explanation,
      });

      changed = true;
    }
  }

  const conclusions = pickBestConclusions(workingMemory.conclusions);
  return { conclusions, trace: workingMemory._trace };
}

function pickBestConclusions(raw) {
  const result = {};

  if (raw.severityRange) {
    result.severityRange = raw.severityRange;
  }

  if (raw.bankIndexRange) {
    result.bankIndexRange = raw.bankIndexRange;
  }

  if (raw.archetype) {
    result.archetype = raw.archetype;
  }

  if (raw.outcome_tags?.length) {
    result.outcome_tag = raw.outcome_tags.sort(
      (a, b) => b.confidence - a.confidence
    )[0].value;
  }

  if (raw.feeling_tags?.length) {
    result.feeling_tag = raw.feeling_tags.sort(
      (a, b) => b.confidence - a.confidence
    )[0].value;
  }

  return result;
}

export function buildWorkingMemory(profile, verdicts, currentCase) {
  const totalCases = verdicts.length;
  const guiltyVerdicts = verdicts.filter((v) => v.verdict === "guilty");
  const guiltyCount = guiltyVerdicts.length;
  const guiltyRate = totalCases > 0 ? guiltyCount / totalCases : 0;
  const severities = guiltyVerdicts.map((v) => v.severity ?? 5);
  const avgSeverity =
    severities.length > 0
      ? severities.reduce((a, b) => a + b, 0) / severities.length
      : 0;

  return {
    profile: {
      framework_score: profile.framework_score,
      leniency_score: profile.leniency_score,
      empathy_score: profile.empathy_score,
      consistency_score: profile.consistency_score,
    },
    verdictStats: {
      totalCases,
      guiltyCount,
      notGuiltyCount: totalCases - guiltyCount,
      guiltyRate,
      severities,
      avgSeverity,
    },
    currentCase: currentCase
      ? {
          case_number: currentCase.case_number,
          crime_tag: currentCase.crime_tag,
          emotional_state: currentCase.emotional_state,
          signal_weights: currentCase.signal_weights,
        }
      : null,
  };
}
