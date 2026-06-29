import { useLanguage } from "../context/LanguageContext";

export default function LoadingScreen({ messages = [], subtitle }) {
  const { language } = useLanguage();
  const langClass = language === "bn" ? "lang-bn" : "";

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
    </div>
  );
}
