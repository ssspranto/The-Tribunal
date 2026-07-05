import { useLanguage } from "../context/LanguageContext";

export default function CaseCard({ caseData, caseNumber, totalCases }) {
  const { language, t } = useLanguage();
  const langClass = language === "bn" ? "lang-bn" : "";

  return (
    <div className={`space-y-6 ${langClass}`}>
      <p className="text-sm tracking-wide text-[#4A6741]">
        {t.game.caseLabel} {caseNumber} {t.game.of} {totalCases}
      </p>

      {caseData.bridge_narrative && (
        <p className="border-l-2 border-[#2D6A4F]/40 pl-4 text-sm italic leading-relaxed text-[#4A6741]">
          {caseData.bridge_narrative}
        </p>
      )}

      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-[#4A6741]">
          {caseData.crime_tag}
        </span>
        <h2 className="font-heading mt-1 text-2xl text-[#2D6A4F]">
          {caseData.case_title}
        </h2>
      </div>

      <div className="rounded border border-[#D4E0D4] bg-white shadow-sm">
        <div className="h-1 w-full rounded-t bg-[#C4943A]" />
        <div className="p-5 md:p-6">
          <p className={`case-body text-[#1A2E1A] ${langClass}`}>{caseData.case_body}</p>
        </div>
      </div>
    </div>
  );
}
