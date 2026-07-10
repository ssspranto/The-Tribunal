import { useLanguage } from "../context/LanguageContext";

const EXPRESSIONS = {
  state_0: {
    brow: "M 55 42 Q 70 38 85 42",
    browInner: null,
    eyes: { left: "M 58 52 A 4 5 0 1 1 58 52.1", right: "M 82 52 A 4 5 0 1 1 82 52.1" },
    mouth: "M 62 72 Q 70 76 78 72",
    headTilt: 0,
    eyeOffset: 0,
  },
  state_1: {
    brow: "M 54 40 Q 70 36 86 40",
    browInner: "M 60 44 L 64 40 M 76 40 L 80 44",
    eyes: { left: "M 58 54 A 3.5 4.5 0 1 1 58 54.1", right: "M 82 54 A 3.5 4.5 0 1 1 82 54.1" },
    mouth: "M 64 74 L 76 74",
    headTilt: -1,
    eyeOffset: 0,
  },
  state_2a: {
    brow: "M 52 44 Q 70 48 88 44",
    browInner: null,
    eyes: { left: "M 58 53 A 3 4 0 1 1 58 53.1", right: "M 82 53 A 3 4 0 1 1 82 53.1" },
    mouth: "M 63 75 L 77 75",
    headTilt: 0,
    eyeOffset: 0,
  },
  state_2b: {
    brow: "M 55 43 Q 70 40 85 43",
    browInner: null,
    eyes: { left: "M 58 52 A 4 4.5 0 1 1 58 52.1", right: "M 82 52 A 4 4.5 0 1 1 82 52.1" },
    mouth: "M 64 73 Q 70 76 76 73",
    headTilt: 1,
    eyeOffset: 0,
  },
  state_3a: {
    brow: "M 52 38 Q 70 34 88 38",
    browInner: "M 58 42 L 62 36 M 78 36 L 82 42",
    eyes: { left: "M 56 52 A 5 6 0 1 1 56 52.1", right: "M 84 52 A 5 6 0 1 1 84 52.1" },
    mouth: "M 66 76 L 74 76",
    headTilt: 0,
    eyeOffset: 0,
  },
  state_3b: {
    brow: "M 56 44 Q 70 42 84 44",
    browInner: null,
    eyes: { left: "M 58 53 A 4 4 0 1 1 58 53.1", right: "M 82 53 A 4 4 0 1 1 82 53.1" },
    mouth: "M 64 74 Q 70 75 76 74",
    headTilt: 0,
    eyeOffset: 0,
  },
  state_4: {
    brow: "M 54 46 Q 70 50 86 46",
    browInner: null,
    eyes: { left: "M 58 55 A 3 3.5 0 1 1 58 55.1", right: "M 82 55 A 3 3.5 0 1 1 82 55.1" },
    mouth: "M 62 78 Q 70 74 78 78",
    headTilt: 2,
    eyeOffset: 1,
  },
  state_5a: {
    brow: "M 56 48 Q 70 52 84 48",
    browInner: null,
    eyes: { left: "M 60 58 A 2.5 3 0 1 1 60 58.1", right: "M 80 56 A 2.5 3 0 1 1 80 56.1" },
    mouth: "M 64 80 Q 70 76 74 80",
    headTilt: 4,
    eyeOffset: 3,
  },
  state_5b: {
    brow: "M 52 42 Q 70 40 88 42",
    browInner: null,
    eyes: { left: "M 57 52 A 3.5 4 0 1 1 57 52.1", right: "M 83 52 A 3.5 4 0 1 1 83 52.1" },
    mouth: "M 63 76 L 77 76",
    headTilt: -1,
    eyeOffset: 0,
  },
};

export default function EliasAvatar({ expression = "state_0", emotionalState }) {
  const { language, t } = useLanguage();
  const expr = EXPRESSIONS[expression] ?? EXPRESSIONS.state_0;
  const langClass = language === "bn" ? "lang-bn" : "";

  return (
    <div className={`flex flex-col items-center ${langClass}`}>
      <svg
        viewBox="0 0 140 120"
        width="100"
        height="86"
        className="drop-shadow-lg"
        aria-label={`${t.ending.eliasTitle} — ${emotionalState ?? t.avatar.present}`}
      >
        <ellipse cx="70" cy="95" rx="28" ry="8" fill="#A7D7A9" opacity="0.45" />
        <g transform={`rotate(${expr.headTilt} 70 60)`}>
          <ellipse cx="70" cy="58" rx="32" ry="38" fill="#D7E8D7" />
          <ellipse cx="70" cy="62" rx="28" ry="34" fill="#F5F7F5" />
          <path
            d="M 42 55 Q 70 30 98 55"
            fill="#B3CBB3"
            opacity="0.9"
          />
          <path d={expr.brow} stroke="#4A6741" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {expr.browInner && (
            <path d={expr.browInner} stroke="#4A6741" strokeWidth="2" fill="none" strokeLinecap="round" />
          )}
          <g transform={`translate(0 ${expr.eyeOffset})`}>
            <path d={expr.eyes.left} fill="#1A2E1A" />
            <path d={expr.eyes.right} fill="#1A2E1A" />
            <circle cx="58" cy="53" r="1.5" fill="#1A2E1A" transform={`translate(0 ${expr.eyeOffset})`} />
            <circle cx="82" cy="53" r="1.5" fill="#1A2E1A" transform={`translate(0 ${expr.eyeOffset})`} />
          </g>
          <path d="M 58 64 Q 70 70 82 64" stroke="#4A6741" strokeWidth="1.5" fill="none" />
          <path d={expr.mouth} stroke="#4A6741" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
        <rect x="52" y="94" width="36" height="18" rx="4" fill="#EAF4EA" stroke="#D4E0D4" />
        <text x="70" y="106" textAnchor="middle" fill="#4A6741" fontSize="7" fontFamily="system-ui">
          {t.ending.eliasTitle.toUpperCase()}
        </text>
      </svg>
      {emotionalState && (
        <span className="mt-1 text-xs capitalize tracking-wider text-[#4A6741]">
          {emotionalState}
        </span>
      )}
    </div>
  );
}
