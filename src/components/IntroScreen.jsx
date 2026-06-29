import { useLanguage } from "../context/LanguageContext";

export default function IntroScreen({ onStart, totalCases }) {
  const { language, t } = useLanguage();
  const langClass = language === "bn" ? "lang-bn" : "";
  const count = String(totalCases);
  const subtitle = t.intro.subtitle.replace("{count}", count);
  const caseCountStr = t.intro.caseCount.replace("{count}", count);

  return (
    <div className={`mx-auto max-w-[680px] px-5 py-12 ${langClass}`}>
      <header className="mb-10 text-center">
        <h1 className="font-heading text-4xl font-bold tracking-wide text-[#2D6A4F] md:text-5xl">
          {t.intro.title}
        </h1>
        <p className="mt-3 text-sm uppercase tracking-[0.25em] text-[#4A6741]">
          {t.intro.tagline}
        </p>
        <p className="mt-4 text-xs tracking-wide text-[#4A6741]">
          {caseCountStr}
        </p>
      </header>

      <div className="rounded border border-[#D4E0D4] bg-white p-6 md:p-8 shadow-sm">
        <h2 className="font-heading mb-4 text-xl text-[#2D6A4F]">
          {t.intro.eliasIntro}
        </h2>
        <div className="case-body space-y-4 text-[#1A2E1A]">
          <p>{subtitle}</p>
          <p>{t.intro.eliasBackstory}</p>
          <p>{t.intro.disclaimer}</p>
        </div>

        <button
          type="button"
          onClick={onStart}
          className="mt-8 w-full rounded border border-[#2D6A4F] bg-transparent px-6 py-4 font-heading text-lg tracking-wide text-[#2D6A4F] transition-colors hover:bg-[#EEF4EE]"
        >
          {t.intro.continueButton}
        </button>
      </div>
    </div>
  );
}
