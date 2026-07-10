const INITIAL_PROFILE = {
  framework_score: 0.5,
  leniency_score: 0.5,
  empathy_score: 0.5,
  consistency_score: 0.5,
};

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function verdictFactor(verdict, severity) {
  if (verdict === "not_guilty") return -0.6;
  return (severity - 5.5) / 10;
}

export function createInitialProfile() {
  return { ...INITIAL_PROFILE };
}

export function updateProfile(profile, signalWeights, verdict) {
  const factor = verdictFactor(verdict.verdict, verdict.severity ?? 5);

  const framework_score = clamp(
    profile.framework_score + (signalWeights.framework ?? 0) * factor
  );
  const leniency_score = clamp(
    profile.leniency_score + (signalWeights.leniency ?? 0) * factor
  );
  const empathy_score = clamp(
    profile.empathy_score + (signalWeights.empathy ?? 0) * factor
  );

  return {
    framework_score,
    leniency_score,
    empathy_score,
    consistency_score: profile.consistency_score,
  };
}

export function updateConsistency(profile, severities) {
  if (severities.length < 2) {
    return { ...profile, consistency_score: 0.5 };
  }

  const mean = severities.reduce((a, b) => a + b, 0) / severities.length;
  const variance =
    severities.reduce((sum, s) => sum + (s - mean) ** 2, 0) / severities.length;
  const normalizedVariance = Math.min(variance / 25, 1);
  const consistency_score = clamp(1 - normalizedVariance);

  return { ...profile, consistency_score };
}

export function getAvatarExpression(caseNumber, leniencyScore) {
  if (caseNumber === 1) return "state_0";
  if (caseNumber <= 3) return "state_1";
  if (caseNumber <= 5) return leniencyScore < 0.4 ? "state_2a" : "state_2b";
  if (caseNumber <= 7) return leniencyScore < 0.4 ? "state_3a" : "state_3b";
  if (caseNumber === 8) return "state_4";
  return leniencyScore < 0.4 ? "state_5a" : "state_5b";
}
