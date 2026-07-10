import { useState, useEffect, useMemo } from "react";
import EliasAvatar from "./EliasAvatar";
import { useLanguage } from "../context/LanguageContext";

function StatGauge({ label, value, delay }) {
  const { language } = useLanguage();
  const langClass = language === "bn" ? "lang-bn" : "";
  return (
    <div className={langClass}>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-sm text-[#4A6741]">{label}</span>
        <span className="text-sm font-medium text-[#1A2E1A]">
          {(Math.round(value * 100))}%
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[#D4E0D4]">
        <div
          className="gauge-fill h-full rounded-full bg-[#2D6A4F]"
          style={{ width: `${Math.round(value * 100)}%`, animationDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}

function AnimatedParagraphs({ paragraphs, tag, tagLabel, side }) {
  const { language, t } = useLanguage();
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
        {side === "left" ? t.ending.eliasTitle : t.ending.judgeTitle}
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

function ExpertTraceSection({ trace }) {
  const [expanded, setExpanded] = useState(false);
  const { language, t } = useLanguage();
  const langClass = language === "bn" ? "lang-bn" : "";

  if (!trace || trace.length === 0) return null;

  return (
    <div className={`mt-16 rounded border border-[#C4943A]/30 bg-white p-6 md:p-8 shadow-sm ${langClass}`}>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between text-left"
      >
        <h3 className="font-heading text-xl text-[#C4943A]">
          {t.ending.expertTitle}
        </h3>
        <span className="text-sm text-[#4A6741]">
          {expanded ? "▲" : "▼"}
        </span>
      </button>
      <p className="mb-4 mt-2 text-xs italic text-[#4A6741]">
        {t.ending.expertDescription.replace("{count}", trace.length)}
      </p>
      {expanded && (
        <div className="space-y-3 border-t border-[#D4E0D4] pt-4">
          {trace.map((entry, i) => (
            <div key={i} className="rounded border border-[#D4E0D4]/50 bg-[#F5F7F5] p-3 text-sm">
              <div className="mb-1 flex items-center gap-2">
                <span className="rounded bg-[#C4943A]/10 px-2 py-0.5 text-xs font-medium text-[#C4943A]">
                  {entry.ruleId}
                </span>
                <span className="text-xs uppercase tracking-wider text-[#4A6741]">
                  {entry.category}
                </span>
              </div>
              <p className="font-medium text-[#1A2E1A]">{entry.description}</p>
              <p className="mt-1 text-[#4A6741]">{entry.explanation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function EndingScreen({
  endings,
  profile,
  cases,
  verdicts,
  expertTrace,
  onRestart,
}) {
  const { language, t } = useLanguage();
  const severitySuffix = t.verdict.severitySuffix ?? "/10";
  
  const archetypeLabel = endings.archetype_label;
  const archetypeDescription = endings.archetype_description;

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

      <ExpertTraceSection trace={expertTrace} />

      <div className="mt-8 rounded border border-[#D4E0D4] bg-white p-6 md:p-8 shadow-sm">
        <h3 className="font-heading mb-2 text-xl text-[#2D6A4F]">
          {archetypeLabel}
        </h3>
        <p className="mb-6 text-sm leading-relaxed text-[#4A6741]">
          {archetypeDescription}
        </p>

        <div className="mb-6 space-y-3">
          <StatGauge label={t.ending.framework} value={profile.framework_score} delay={0} />
          <StatGauge label={t.ending.leniency} value={profile.leniency_score} delay={150} />
          <StatGauge label={t.ending.empathy} value={profile.empathy_score} delay={300} />
          <StatGauge label={t.ending.consistency} value={profile.consistency_score} delay={450} />
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
                  ? `${t.verdict.guilty} (${verdicts[i].severity}${severitySuffix})`
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
