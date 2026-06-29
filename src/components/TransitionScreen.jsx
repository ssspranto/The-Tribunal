import { useCallback } from "react";
import EliasAvatar from "./EliasAvatar";
import { useLanguage } from "../context/LanguageContext";

export default function TransitionScreen({
  reaction,
  timePassage,
  expression,
  emotionalState,
  onComplete,
}) {
  const { language, t } = useLanguage();
  const skip = useCallback(() => {
    onComplete();
  }, [onComplete]);

  const langClass = language === "bn" ? "lang-bn" : "";

  return (
    <div
      className={`mx-auto flex min-h-[60vh] max-w-[680px] cursor-pointer flex-col items-center justify-center px-5 py-12 ${langClass}`}
      onClick={skip}
      onKeyDown={(e) => e.key === "Enter" && skip()}
      role="button"
      tabIndex={0}
      aria-label={t.transition.skipAria}
    >
      <p className="mb-8 text-sm italic tracking-wide text-[#4A6741]">
        {timePassage}
      </p>

      <EliasAvatar expression={expression} emotionalState={emotionalState} />

      <p className="fade-in mt-10 max-w-md text-center text-lg leading-relaxed text-[#1A2E1A]">
        {reaction}
      </p>

      <p className="mt-12 text-xs text-[#4A6741]/60">{t.transition.skipText}</p>
    </div>
  );
}
