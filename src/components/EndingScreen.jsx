import { useState, useEffect, useMemo } from "react";
import EliasAvatar from "./EliasAvatar";
import { useLanguage } from "../context/LanguageContext";
import { deriveArchetype } from "../data/archetypes";

function AnimatedParagraphs({ paragraphs, tag, tagLabel, side }) {
  const { language } = useLanguage();
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= paragraphs.length) return;
    const timer = setTimeout(() => setVisibleCount((c) => c + 1), 800);
    return () => clearTimeout(timer);
  }, [visibleCount, paragraphs.length]);

  const langClass = language === "bn" ? "lang-bn" : "";

  return (
    <div className={`flex-1 ${side === "left" ? "md:pr-6" : "md:pl-6"} ${langClass}`}>
      <h3 className="font-heading mb-2 text-xl text-[#2D6A4F]">
        {side === "left" ? (language === "bn" ? "এলিয়াস ভস" : "Elias Voss") : (language === "bn" ? "বিচারক" : "The Judge")}
      </h3>
      {tag && (
        <span className="mb-4 inline-block text-xs uppercase tracking-[0.2em] text-[#4A6741]">
          {tagLabel}: {tag}
        </span>
      )}
      <div className="space-y-4">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className={`case-body text-[#1A2E1A] ${
              i < visibleCount ? "fade-in" : "fade-in-hidden"
            } ${langClass}`}
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function EndingScreen({
  endings,
  profile,
  cases,
  verdicts,
  onRestart,
}) {
  const { language, t } = useLanguage();
  
  const fallbackArchetype = useMemo(() => deriveArchetype(profile, t), [profile, t]);
  const archetypeLabel = endings.archetype_label || fallbackArchetype.label;
  const archetypeDescription = endings.archetype_description || fallbackArchetype.description;

  const avgTime =
    verdicts.reduce((sum, v) => sum + (v.timeTaken ?? 0), 0) /
    verdicts.length /
    1000;

  const langClass = language === "bn" ? "lang-bn" : "";

  return (
    <div className={`mx-auto max-w-5xl px-5 py-12 ${langClass}`}>
      <header className="mb-10 text-center">
        <h2 className="font-heading text-3xl text-[#2D6A4F]">{t.ending.title}</h2>
        <p className="mt-2 text-sm text-[#4A6741]">
          {t.ending.subtitle}
        </p>
      </header>

      <div className="mb-12 flex flex-col gap-10 md:flex-row">
        <div className="flex justify-center md:hidden">
          <EliasAvatar
            expression={
              endings.elias_ending.outcome_tag === "reformed" ||
              endings.elias_ending.outcome_tag === "reborn"
                ? "state_3b"
                : "state_5a"
            }
          />
        </div>
        <AnimatedParagraphs
          paragraphs={endings.elias_ending.paragraphs}
          tag={endings.elias_ending.outcome_tag}
          tagLabel={t.ending.eliasOutcomeLabel}
          side="left"
        />
        <div className="hidden md:flex md:items-start md:justify-center">
          <div className="h-full w-px bg-[#D4E0D4]" />
        </div>
        <AnimatedParagraphs
          paragraphs={endings.judge_ending.paragraphs}
          tag={endings.judge_ending.feeling_tag}
          tagLabel={t.ending.judgeFeelingLabel}
          side="right"
        />
      </div>

      <div className="mt-16 rounded border border-[#D4E0D4] bg-white p-6 md:p-8 shadow-sm">
        <h3 className="font-heading mb-2 text-xl text-[#2D6A4F]">
          {archetypeLabel}
        </h3>
        <p className="mb-6 text-sm leading-relaxed text-[#4A6741]">
          {archetypeDescription}
        </p>

        <div className="mb-6 grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
          <div>
            <span className="text-[#4A6741]">{t.ending.framework}</span>
            <p className="text-[#1A2E1A]">
              {(profile.framework_score * 100).toFixed(0)}%
            </p>
          </div>
          <div>
            <span className="text-[#4A6741]">{t.ending.leniency}</span>
            <p className="text-[#1A2E1A]">
              {(profile.leniency_score * 100).toFixed(0)}%
            </p>
          </div>
          <div>
            <span className="text-[#4A6741]">{t.ending.empathy}</span>
            <p className="text-[#1A2E1A]">
              {(profile.empathy_score * 100).toFixed(0)}%
            </p>
          </div>
          <div>
            <span className="text-[#4A6741]">{t.ending.consistency}</span>
            <p className="text-[#1A2E1A]">
              {(profile.consistency_score * 100).toFixed(0)}%
            </p>
          </div>
        </div>

        <p className="mb-4 text-xs text-[#4A6741]">
          {t.ending.avgDecisionTime}: {avgTime.toFixed(1)}{t.ending.seconds} {t.ending.perCase}
        </p>

        <div className="space-y-2 border-t border-[#D4E0D4] pt-4">
          <h4 className="text-xs uppercase tracking-[0.2em] text-[#4A6741]">
            {t.ending.caseHistoryTitle}
          </h4>
          {cases.map((c, i) => (
            <div
              key={i}
              className="flex flex-wrap items-baseline gap-2 text-sm"
            >
              <span className="text-[#2D6A4F]">{c.case_title}</span>
              <span className="text-[#4A6741]">—</span>
              <span className="text-[#1A2E1A]">
                {verdicts[i]?.verdict === "guilty"
                  ? `${t.verdict.guilty} (${verdicts[i].severity}/10)`
                  : verdicts[i]?.verdict === "not_guilty"
                    ? t.verdict.notGuilty
                    : "—"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="mt-8 w-full rounded border border-[#D4E0D4] bg-white px-6 py-4 text-[#4A6741] transition-colors hover:border-[#2D6A4F] hover:text-[#2D6A4F]"
      >
        {t.ending.restartButton}
      </button>
    </div>
  );
}
