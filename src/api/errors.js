export class ApiError extends Error {
  constructor({ title, message, isQuota = false }) {
    super(message);
    this.name = "ApiError";
    this.title = title;
    this.userMessage = message;
    this.isQuota = isQuota;
  }
}

function isRateLimitError(error) {
  const msg = error?.message ?? String(error);
  return (
    msg.includes("429") ||
    msg.includes("quota") ||
    msg.includes("RESOURCE_EXHAUSTED") ||
    msg.includes("Too Many Requests")
  );
}

function parseRetryDelayMs(error) {
  const msg = error?.message ?? "";
  const secondsMatch = msg.match(/retry in (\d+(?:\.\d+)?)s/i);
  if (secondsMatch) {
    return Math.ceil(parseFloat(secondsMatch[1]) * 1000) + 1000;
  }
  const jsonMatch = msg.match(/"retryDelay":\s*"(\d+)s"/);
  if (jsonMatch) {
    return parseInt(jsonMatch[1], 10) * 1000 + 1000;
  }
  return 15000;
}

export function formatApiError(error) {
  const msg = error?.message ?? String(error);

  if (
    msg.includes("API key not configured") ||
    msg.includes("your_api_key_here")
  ) {
    return new ApiError({
      title: "The court cannot convene",
      message:
        "No OpenRouter API key found. Add your key to the .env file as VITE_OPENROUTER_API_KEY, then restart the dev server.",
    });
  }

  if (
    msg.includes("API_KEY_INVALID") ||
    msg.includes("API key not valid") ||
    (msg.includes("403") && msg.includes("API"))
  ) {
    return new ApiError({
      title: "The court cannot convene",
      message:
        "Your OpenRouter API key appears invalid. Check VITE_OPENROUTER_API_KEY in your .env file and restart the dev server.",
    });
  }

  if (isRateLimitError(error)) {
    const dailyLimit = msg.includes("PerDay") || msg.includes("per day");
    return new ApiError({
      title: "The court is adjourned",
      message: dailyLimit
        ? "You've reached the daily OpenRouter API limit on the free tier. Quotas reset over time — try again later."
        : "The OpenRouter API rate limit was hit. The court will wait and retry automatically, or you can press Try again in a moment.",
      isQuota: true,
    });
  }

  if (error instanceof SyntaxError) {
    return new ApiError({
      title: "The record could not be completed",
      message:
        `JSON parse error: ${error.message}. The narrative engine returned an unreadable response.`,
    });
  }

  return new ApiError({
    title: "The record could not be completed",
    message:
      `API Error: ${msg}. Your progress has been saved — try again shortly.`,
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { isRateLimitError, parseRetryDelayMs, sleep };
