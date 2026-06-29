const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "openrouter/free";

export const SYSTEM_CONTEXT =
  "You are a narrative engine for a moral consequence game. You must respond with ONLY a valid JSON object. No markdown. No backticks. No explanation. No preamble. Start your response with { and end with }.";

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

const callOpenRouter = async (promptFn) => {
  const prompt = promptFn();
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
    body: JSON.stringify({
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
      max_tokens: 1500,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenRouter error ${response.status}: ${errorBody}`);
  }

  const data = await response.json();

  if (!data.choices || !data.choices[0]?.message?.content) {
    throw new Error("OpenRouter returned an unexpected response structure");
  }

  const rawText = data.choices[0].message.content;
  const cleaned = rawText.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch (parseError) {
    throw new Error(`JSON parse failed. Raw response was: ${rawText}`);
  }
};

export const generateWithRetry = async (promptFn, options = {}) => {
  const maxRetries = options.maxRetries ?? 2;
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      if (attempt > 0) {
        const delay = attempt * 2000;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      return await callOpenRouter(promptFn);
    } catch (error) {
      lastError = error;
      console.warn(`OpenRouter attempt ${attempt + 1} failed:`, error.message);

      if (attempt < maxRetries) {
        console.log(`Retrying in ${(attempt + 1) * 2} seconds...`);
      }
    }
  }

  throw new Error(
    `All ${maxRetries + 1} attempts failed. Last error: ${lastError?.message}`
  );
};
