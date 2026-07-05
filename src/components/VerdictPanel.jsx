import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

function GavelIcon() {
  return (
    <svg className="mr-2 inline-block h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="10" x2="4" y2="18" />
      <line x1="8" y1="14" x2="16" y2="6" />
      <rect x="10" y="3" width="4" height="6" rx="1" />
    </svg>
  );
}

function ScalesIcon() {
  return (
    <svg className="mr-2 inline-block h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="4" x2="12" y2="20" />
      <line x1="4" y1="8" x2="20" y2="8" />
      <path d="M4 8 L2 12 L6 12 Z" />
      <line x1="4" y1="12" x2="4" y2="20" />
      <path d="M20 8 L18 12 L22 12 Z" />
      <line x1="20" y1="12" x2="20" y2="20" />
    </svg>
  );
}

export default function VerdictPanel({ onSubmit, disabled, expertRecommendation }) {
  const { language, t } = useLanguage();
  const [verdict, setVerdict] = useState(null);
  const [severity, setSeverity] = useState(5);
  const [reasoning, setReasoning] = useState("");

  const canSubmit = verdict !== null && !disabled;
  const langClass = language === "bn" ? "lang-bn" : "";

  function handleSubmit() {
    if (!canSubmit) return;
    onSubmit({
      verdict,
      severity: verdict === "guilty" ? severity : null,
      reasoning: reasoning.trim(),
    });
  }

  return (
    <div className={`mt-8 space-y-6 border-t border-[#D4E0D4] pt-8 ${langClass}`}>
      <h3 className="font-heading text-lg text-[#1A2E1A]">
        {t.game.verdictTitle}
      </h3>

      {expertRecommendation && (
        <div className="rounded border border-[#C4943A]/30 bg-[#C4943A]/5 px-4 py-3 text-sm">
          <span className="font-medium text-[#C4943A]">{t.game.expertLabel}: </span>
          <span className="text-[#4A6741]">{expertRecommendation}</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setVerdict("guilty")}
          className={`rounded border px-4 py-5 text-lg font-medium transition-all ${
            verdict === "guilty"
              ? "border-[#B91810] bg-[#F4EAEA] text-[#7B1F1F]"
              : "border-[#D4E0D4] bg-white text-[#4A6741] hover:border-[#B91810]/50"
          }`}
        >
          <GavelIcon />
          {t.game.guiltyButton}
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => setVerdict("not_guilty")}
          className={`rounded border px-4 py-5 text-lg font-medium transition-all ${
            verdict === "not_guilty"
              ? "border-[#2D6A4F] bg-[#E8F6EA] text-[#1A2E1A]"
              : "border-[#D4E0D4] bg-white text-[#4A6741] hover:border-[#2D6A4F]/50"
          }`}
        >
          <ScalesIcon />
          {t.game.notGuiltyButton}
        </button>
      </div>

      {verdict === "guilty" && (
        <div className="space-y-2">
          <label className="flex items-center justify-between text-sm text-[#4A6741]">
            <span>{t.game.severityLabel}</span>
            <span className="text-[#1A2E1A]">{severity}</span>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={severity}
            onChange={(e) => setSeverity(Number(e.target.value))}
            disabled={disabled}
            className="severity-slider"
          />
          <p className="text-xs text-[#4A6741]">
            {t.game.severityMin} · {t.game.severityMax}
          </p>
        </div>
      )}

      <div>
        <textarea
          value={reasoning}
          onChange={(e) => setReasoning(e.target.value)}
          disabled={disabled}
          placeholder={t.game.reasoningPlaceholder}
          rows={3}
          className="w-full resize-none rounded border border-[#D4E0D4] bg-white px-4 py-3 text-sm text-[#1A2E1A] placeholder-[#4A6741]/60 outline-none focus:border-[#2D6A4F]/50"
        />
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="w-full rounded border border-[#2D6A4F] bg-[#2D6A4F] px-6 py-4 font-heading text-lg tracking-wide text-white transition-colors enabled:hover:bg-[#1B4332] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {t.game.submitButton}
      </button>
    </div>
  );
}
