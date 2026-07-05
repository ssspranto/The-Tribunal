const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "openrouter/free";

export const SYSTEM_CONTEXT =
  "You are a narrative engine for a moral consequence game. You must respond with ONLY a valid JSON object. No markdown. No backticks. No explanation. No preamble. Start your response with { and end with }.";

function extractBraceBlock(text, startPos) {
  let depth = 1;
  let inString = false;
  let escape = false;
  for (let i = startPos + 1; i < text.length; i++) {
    const ch = text[i];
    if (escape) { escape = false; continue; }
    if (ch === "\\" && inString) { escape = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (!inString) {
      if (ch === "{") depth++;
      if (ch === "}") depth--;
      if (depth === 0) return text.slice(startPos, i + 1);
    }
  }
  return null;
}

function extractCaseBlock(text, caseKey) {
  const escaped = caseKey.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`"${escaped}"\\s*:\\s*\\{`);
  const match = regex.exec(text);
  if (!match) return null;
  const start = text.indexOf("{", match.index);
  if (start === -1) return null;
  return extractBraceBlock(text, start);
}

function parseAiJson(text) {
  const cleaned = text.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const case9Raw = extractCaseBlock(cleaned, "case_9");
    const case10Raw = extractCaseBlock(cleaned, "case_10");
    if (case9Raw && case10Raw) {
      const parsed9 = JSON.parse(case9Raw);
      const parsed10 = JSON.parse(case10Raw);
      return { case_9: parsed9, case_10: parsed10 };
    }
    throw new Error("Could not extract case data from response");
  }
}

export const getLanguageInstruction = (language) => {
  if (language === "bn") {
    return `CRITICAL LANGUAGE INSTRUCTION: You must write ALL narrative text 
fields in Bengali (বাংলা) script. This includes: bridge_narrative, case_title, 
case_body, elias_reaction, and all ending paragraph text. JSON keys must remain 
in English. Numbers remain as numerals. Do not mix languages within a single 
field. Write naturally in Bengali — not a word-for-word translation but 
culturally appropriate narrative prose. The tone should be serious, literary, 
and emotionally resonant in Bengali.`;
  }
  return `Write all narrative text fields in English.`;
};

const callOpenRouter = async (promptFn, onLog) => {
  const prompt = promptFn();
  const body = {
    model: MODEL,
    messages: [
      {
        role: "system",
        content: SYSTEM_CONTEXT,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 2500,
  };

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
      "HTTP-Referer":
        typeof window !== "undefined"
          ? window.location.origin
          : "http://localhost:5173",
      "X-Title": "The Tribunal",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenRouter error ${response.status}: ${errorBody}`);
  }

  const data = await response.json();

  if (data.error && !data.choices) {
    throw new Error(
      `OpenRouter top-level error: ${data.error.message || JSON.stringify(data.error)}`
    );
  }

  if (data.choices && data.choices[0]) {
    const choice = data.choices[0];

    if (choice.finish_reason === "error") {
      throw new Error(
        `OpenRouter provider error: ${choice.error?.message || JSON.stringify(choice.error || {})}`
      );
    }

    if (choice.finish_reason === "content_filter") {
      throw new Error("OpenRouter content filter triggered");
    }

    if (!choice.message?.content) {
      throw new Error("OpenRouter returned an unexpected response structure");
    }
  } else {
    throw new Error("OpenRouter returned an unexpected response structure");
  }

  const rawText = data.choices[0].message.content;

  try {
    return parseAiJson(rawText);
  } catch (parseError) {
    throw new Error(`JSON parse failed: ${parseError.message}. Raw: ${rawText}`, { cause: parseError });
  }
};

export const generateWithRetry = async (promptFn, maxRetries = 2, onLog) => {
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      if (attempt > 0) {
        const delay = attempt * 2000;
        if (onLog) onLog(`Retrying (attempt ${attempt + 1}) in ${(attempt + 1) * 2}s...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      if (onLog) onLog(`Calling AI${attempt > 0 ? ` (attempt ${attempt + 1})` : ""}...`);
      return await callOpenRouter(promptFn, onLog);
    } catch (error) {
      lastError = error;
      if (onLog) onLog(`Attempt ${attempt + 1} failed: ${error.message}`);
      console.warn(`OpenRouter attempt ${attempt + 1} failed:`, error.message);
    }
  }

  if (onLog) onLog(`All ${maxRetries + 1} attempts failed`);
  throw new Error(
    `All ${maxRetries + 1} attempts failed. Last error: ${lastError?.message}`
  );
};
