import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function LoadingScreen({ messages = [], subtitle, logMessages = [] }) {
  const { language } = useLanguage();
  const langClass = language === "bn" ? "lang-bn" : "";
  const [showLog, setShowLog] = useState(false);

  return (
    <div className={`mx-auto flex min-h-[60vh] max-w-[680px] flex-col items-center justify-center px-5 py-12 ${langClass}`}>
      <div className="mb-8 h-1 w-16 animate-pulse bg-[#2D6A4F]/60" />
      <div className="space-y-4 text-center">
        {messages.map((msg, i) => (
          <p
            key={i}
            className="font-heading text-lg text-[#1A2E1A]"
            style={{ animationDelay: `${i * 600}ms` }}
          >
            {msg}
          </p>
        ))}
      </div>
      {subtitle && (
        <p className="mt-8 text-sm italic text-[#4A6741]">{subtitle}</p>
      )}

      <button
        onClick={() => setShowLog((s) => !s)}
        className="mt-8 rounded border border-[#4A6741] px-5 py-1.5 font-mono text-sm text-[#4A6741] transition-colors hover:bg-[#4A6741] hover:text-white"
      >
        {showLog ? "Hide Log" : "Show Log"}
      </button>

      {showLog && (
        <div className="mt-4 max-h-[240px] w-full overflow-y-auto rounded bg-black/90 p-3 font-mono text-xs leading-relaxed text-green-400">
          {logMessages.length === 0 && <span className="text-gray-500">Waiting for log messages...</span>}
          {logMessages.map((msg, i) => (
            <div key={i}>{msg}</div>
          ))}
        </div>
      )}
    </div>
  );
}
