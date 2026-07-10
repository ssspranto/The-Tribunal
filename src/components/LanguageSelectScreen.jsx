import { useLanguage } from "../context/LanguageContext";
import { LANGUAGES } from "../localization";

export default function LanguageSelectScreen({ onSelect, speedrunMode, onToggleSpeedrun }) {
  const { language: currentLang, changeLanguage, t } = useLanguage();

  const handleSelect = (code) => {
    changeLanguage(code);
    onSelect(code);
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-[800px] flex-col items-center justify-center px-5 py-12">
      <header className="mb-12 text-center">
        <h1 className="flex flex-col items-center gap-2">
          <span className="title-reveal font-heading text-4xl font-bold tracking-wide text-[#2D6A4F] md:text-5xl" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Tribunal
          </span>
          <span className="title-reveal text-3xl font-medium text-[#2D6A4F] md:text-4xl" style={{ fontFamily: "serif", animationDelay: "200ms" }}>
            ট্রাইব্যুনাল
          </span>
        </h1>
        <div className="mt-6 space-y-1">
          <p className="text-lg text-[#4A6741]">Select your language</p>
          <p className="text-lg text-[#4A6741]">আপনার ভাষা নির্বাচন করুন</p>
        </div>
      </header>

      <div className="grid w-full max-w-2xl grid-cols-1 gap-6 md:grid-cols-2">
        {Object.values(LANGUAGES).map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleSelect(lang.code)}
            className={`group relative flex flex-col items-center justify-center rounded-lg border-2 bg-white p-10 transition-all hover:bg-[#EEF4EE] ${
              currentLang === lang.code
                ? "border-[#2D6A4F] shadow-md"
                : "border-[#D4E0D4] hover:border-[#2D6A4F]/50"
            }`}
          >
            <span className="mb-2 text-2xl font-medium text-[#1A2E1A]">
              {lang.nativeName}
            </span>
            <span className="text-sm text-[#4A6741]">
              {lang.code === "bn" ? "Bengali" : "English"}
            </span>
            <div className="absolute bottom-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
              <svg
                className="h-5 w-5 text-[#2D6A4F]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={speedrunMode}
          onClick={() => onToggleSpeedrun(!speedrunMode)}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none ${
            speedrunMode ? "bg-[#2D6A4F]" : "bg-[#D4E0D4]"
          }`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
              speedrunMode ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
        <span className="text-sm text-[#4A6741]">
          {t.languageSelect.speedrunLabel}
        </span>
      </div>

      <footer className="mt-16 space-y-1 text-center text-sm text-[#4A6741]/80">
        <p>You can restart the game at any time to change language.</p>
        <p>যেকোনো সময় গেম পুনরায় শুরু করে ভাষা পরিবর্তন করতে পারবেন।</p>
      </footer>
    </div>
  );
}
