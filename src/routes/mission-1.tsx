import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/mission-1")({
  head: () => ({
    meta: [
      { title: "Mission 1 — The Fake QR Code Trap | Digital Kavach" },
      {
        name: "description",
        content:
          "Digital Kavach Cyber Safety Hunt — Mission 1: The Fake QR Code Trap. Can you spot the scam? Think before you scan!",
      },
      { property: "og:title", content: "Mission 1 — The Fake QR Code Trap | Digital Kavach" },
      {
        property: "og:description",
        content:
          "Digital Kavach Cyber Safety Hunt — Mission 1. Can you spot the QR scam? Think before you scan!",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Mission1,
});

const MISSIONS = [1, 2, 3, 4, 5, 6];

function normalizeAnswer(s: string): string {
  return s.trim().toUpperCase().replace(/\s+/g, " ");
}

function isCorrect(raw: string): boolean {
  const normalized = normalizeAnswer(raw);
  const noSpaces = normalized.replace(/\s+/g, "");
  // Accept "UPI PIN", "UPIPIN", "PIN UPI", "PINUPI"
  return (
    normalized === "UPI PIN" ||
    normalized === "PIN UPI" ||
    noSpaces === "UPIPIN"
  );
}

function Mission1() {
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<"idle" | "wrong" | "correct">("idle");
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  function checkAnswer() {
    if (!answer.trim()) return;
    if (isCorrect(answer)) {
      setStatus("correct");
    } else {
      setStatus("wrong");
      setAttempts((a) => a + 1);
    }
  }

  function retry() {
    setStatus("idle");
    setAnswer("");
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  return (
    <div className="min-h-screen bg-[var(--lavender)] text-[var(--navy)] font-[var(--font-body)]">
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-30 bg-[var(--lavender)]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-md items-center justify-between gap-3 px-4 py-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--dk-purple)] text-white shadow-[3px_3px_0_0_var(--navy)] ring-3 ring-[var(--navy)]">
              <span className="font-[var(--font-display)] text-lg font-bold leading-none">
                DK
              </span>
            </div>
            <div className="min-w-0 leading-tight">
              <div className="font-[var(--font-display)] text-base font-bold tracking-tight text-[var(--navy)] sm:text-lg">
                DIGITAL <span className="text-[var(--dk-purple)]">KAVACH</span>
              </div>
              <div className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-[var(--dk-purple)] sm:text-xs">
                Cyber Safety Hunt
              </div>
            </div>
          </div>

          {/* Mission indicators */}
          <div className="flex shrink-0 items-center gap-1.5">
            {MISSIONS.map((m) => (
              <span
                key={m}
                aria-label={`Mission ${m} ${m === 1 ? "active" : "locked"}`}
                className={
                  m === 1
                    ? "grid h-7 w-7 place-items-center rounded-full bg-[var(--dk-purple)] text-xs font-bold text-white ring-3 ring-[var(--navy)] shadow-[2px_2px_0_0_var(--navy)] dk-pop"
                    : "grid h-7 w-7 place-items-center rounded-full bg-white/70 text-xs font-bold text-[var(--navy)]/40 ring-2 ring-[var(--navy)]/30"
                }
              >
                {m}
              </span>
            ))}
          </div>
        </div>
        <div className="h-[3px] w-full bg-[var(--navy)]" />
      </header>

      <main className="mx-auto max-w-md px-4 pb-12 pt-5">
        {/* ===== HERO ===== */}
        <section className="relative overflow-hidden rounded-[1.75rem] border-[5px] border-[var(--navy)] bg-white px-5 py-6 shadow-[8px_8px_0_0_var(--navy)]">
          <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[var(--dk-yellow)]/40 blur-xl" />
          <div className="pointer-events-none absolute -bottom-8 -left-6 h-20 w-20 rounded-full bg-[var(--dk-purple)]/20 blur-xl" />

          <div className="relative flex items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="inline-block rounded-full bg-[var(--dk-purple)] px-3 py-1 font-[var(--font-display)] text-xs font-bold uppercase tracking-[0.18em] text-white ring-2 ring-[var(--navy)]">
                Mission 01
              </span>
              <h1 className="mt-3 font-[var(--font-display)] text-3xl font-bold leading-[1.05] tracking-tight text-[var(--navy)] sm:text-4xl">
                THE FAKE <span className="text-[var(--dk-purple)]">QR CODE</span> TRAP
              </h1>
              <p className="mt-2 font-[var(--font-display)] text-sm font-bold uppercase tracking-[0.12em] text-[var(--dk-coral)]">
                Think Before You Scan!
              </p>
            </div>

            {/* Decorative non-functional QR element */}
            <DecoQR />
          </div>

          <p className="mt-4 text-base font-semibold leading-relaxed text-[var(--navy)]/90">
            Someone wants to trick you with a QR code.{" "}
            <span className="bg-[var(--dk-yellow)] px-1.5 py-0.5 rounded-md ring-2 ring-[var(--navy)] font-bold">
              Can you spot the trap?
            </span>
          </p>
        </section>

        {/* ===== CYBER PUZZLE CARD ===== */}
        <section className="mt-6 dk-card-lg bg-white p-5">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚨</span>
            <h2 className="font-[var(--font-display)] text-xl font-bold uppercase tracking-tight text-[var(--navy)]">
              Cyber Puzzle
            </h2>
          </div>

          <div className="mt-3 rounded-2xl border-[3px] border-[var(--navy)] bg-[var(--lavender)] p-4">
            <p className="text-[0.95rem] font-semibold leading-relaxed text-[var(--navy)]">
              You scan a QR code that promises a reward.
            </p>
            <p className="mt-2 text-[0.95rem] font-semibold leading-relaxed text-[var(--navy)]">
              After scanning, the page asks:
            </p>
            <p className="mt-2 rounded-xl bg-[var(--navy)] px-3 py-2 text-center font-[var(--font-display)] text-base font-bold text-[var(--dk-yellow)]">
              "Enter your UPI PIN to receive your prize."
            </p>
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-2xl border-[3px] border-[var(--navy)] bg-[var(--dk-coral)] p-4 text-white shadow-[4px_4px_0_0_var(--navy)]">
            <span className="text-2xl leading-none">⚠️</span>
            <div>
              <div className="font-[var(--font-display)] text-sm font-bold uppercase tracking-[0.12em]">
                Remember
              </div>
              <p className="mt-1 text-[0.95rem] font-bold leading-snug">
                You NEVER enter a UPI PIN to RECEIVE money.
              </p>
            </div>
          </div>
        </section>

        {/* ===== TASK CARD ===== */}
        <section className="mt-6 dk-card-lg bg-[var(--dk-pink)] p-5">
          <div className="flex items-center gap-2 text-white">
            <span className="text-2xl">🔐</span>
            <h2 className="font-[var(--font-display)] text-xl font-bold uppercase tracking-tight">
              Your Task
            </h2>
          </div>

          <p className="mt-3 text-center font-[var(--font-display)] text-lg font-bold uppercase tracking-[0.12em] text-white">
            Unscramble the letters
          </p>

          <div className="mt-4 flex justify-center gap-2 sm:gap-3">
            {["N", "I", "P", "I", "U"].map((letter, i) => (
              <span
                key={`${letter}-${i}`}
                className="dk-float grid h-12 w-12 place-items-center rounded-xl bg-white text-2xl font-bold text-[var(--navy)] ring-[3px] ring-[var(--navy)] shadow-[3px_3px_0_0_var(--navy)] sm:h-14 sm:w-14 sm:text-3xl"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {letter}
              </span>
            ))}
          </div>

          <p className="mt-5 text-center font-[var(--font-display)] text-base font-bold text-white">
            What does this spell?
          </p>

          <input
            ref={inputRef}
            type="text"
            inputMode="text"
            autoCapitalize="characters"
            autoComplete="off"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              if (status === "wrong") setStatus("idle");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") checkAnswer();
            }}
            placeholder="Type your answer here..."
            aria-label="Type your answer"
            className="mt-3 w-full rounded-xl border-[4px] border-[var(--navy)] bg-white px-4 py-4 text-center text-xl font-bold text-[var(--navy)] placeholder:font-semibold placeholder:text-[var(--navy)]/35 shadow-[4px_4px_0_0_var(--navy)] focus:outline-none focus:ring-4 focus:ring-[var(--dk-purple)]/40"
          />

          <button
            onClick={checkAnswer}
            className="dk-btn-yellow mt-4 w-full py-4 font-[var(--font-display)] text-xl font-bold uppercase tracking-wide active:dk-btn-yellow-press"
          >
            Check Answer
          </button>
        </section>

        {/* ===== WRONG ANSWER ===== */}
        {status === "wrong" && (
          <section key={`wrong-${attempts}`} className="dk-shake mt-6 dk-card-lg bg-[var(--dk-coral)] p-5 text-white">
            <div className="flex items-center gap-2">
              <span className="text-3xl">❌</span>
              <h2 className="font-[var(--font-display)] text-2xl font-bold uppercase tracking-tight">
                Not Quite!
              </h2>
            </div>
            <p className="mt-2 text-[0.95rem] font-bold leading-snug">
              Think about the secret number you should NEVER share just to receive money.
            </p>
            <button
              onClick={retry}
              className="dk-btn-yellow mt-4 w-full py-3 font-[var(--font-display)] text-lg font-bold uppercase tracking-wide active:dk-btn-yellow-press"
            >
              Try Again
            </button>
          </section>
        )}

        {/* ===== CORRECT ANSWER ===== */}
        {status === "correct" && (
          <>
            <section className="dk-pop mt-6 dk-card-lg bg-white p-5">
              <Confetti />
              <div className="flex items-center gap-2">
                <span className="text-3xl">🛡️</span>
                <h2 className="font-[var(--font-display)] text-2xl font-bold uppercase tracking-tight text-[var(--dk-purple)]">
                  Mission Cleared!
                </h2>
              </div>
              <p className="mt-2 text-lg font-bold text-[var(--navy)]">
                You spotted the QR scam! 🎉
              </p>

              <div className="mt-4 rounded-2xl border-[3px] border-[var(--navy)] bg-[var(--dk-yellow)] p-4 shadow-[4px_4px_0_0_var(--navy)]">
                <div className="font-[var(--font-display)] text-sm font-bold uppercase tracking-[0.12em] text-[var(--navy)]">
                  💡 Cyber Safety Tip
                </div>
                <p className="mt-1 text-[0.95rem] font-bold leading-snug text-[var(--navy)]">
                  Never enter your UPI PIN just to receive money.
                </p>
              </div>
            </section>

            {/* ===== NEXT LOCATION CLUE ===== */}
            <section className="dk-pop mt-6 dk-card-lg bg-[var(--dk-purple)] p-5 text-white">
              <div className="flex items-center gap-2">
                <span className="text-3xl">🔓</span>
                <h2 className="font-[var(--font-display)] text-2xl font-bold uppercase tracking-tight">
                  Next Location Unlocked
                </h2>
              </div>

              <div className="mt-4 rounded-2xl border-[3px] border-white bg-white/10 p-4">
                <p className="text-center font-[var(--font-display)] text-base font-semibold italic leading-relaxed text-white">
                  "I sparkle in the sunlight and dance without feet.
                  <br />
                  I have no water, but I am pool.
                  <br />
                  People gather near me where they get a cool breeze."
                </p>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-[var(--dk-yellow)]">
                <span className="text-xl">📍</span>
                <span className="font-[var(--font-display)] text-sm font-bold uppercase tracking-[0.14em]">
                  Find your next QR here
                </span>
              </div>

              <div className="mt-2 dk-pill bg-[var(--dk-yellow)] px-6 py-4 text-center">
                <span className="font-[var(--font-display)] text-4xl font-bold uppercase tracking-tight text-[var(--navy)] sm:text-5xl">
                  FOUNTAIN
                </span>
              </div>

              <p className="mt-3 text-center text-sm font-semibold text-white/80">
                Go to the FOUNTAIN and scan the next QR code to begin Mission 2.
              </p>
            </section>
          </>
        )}

        {/* ===== FOOTER ===== */}
        <footer className="mt-10 text-center">
          <div className="inline-block rounded-full border-[3px] border-[var(--navy)] bg-white px-5 py-2 shadow-[3px_3px_0_0_var(--navy)]">
            <div className="font-[var(--font-display)] text-sm font-bold uppercase tracking-tight text-[var(--navy)]">
              Digital <span className="text-[var(--dk-purple)]">Kavach</span> · Cyber Safety Hunt
            </div>
            <div className="mt-0.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[var(--dk-purple)]">
              Think • Verify • Stay Safe
            </div>
          </div>
          <p className="mt-3 font-[var(--font-display)] text-base font-bold text-[var(--navy)]">
            Jai Ganesh 🙏
          </p>
        </footer>
      </main>
    </div>
  );
}

/* Decorative, non-functional QR-ish pattern */
function DecoQR() {
  const pattern = [
    [1, 1, 1, 0, 1],
    [1, 0, 1, 1, 0],
    [1, 1, 0, 0, 1],
    [0, 1, 1, 0, 1],
    [1, 0, 1, 1, 1],
  ];
  return (
    <div
      aria-hidden="true"
      className="dk-float shrink-0 rounded-xl border-[3px] border-[var(--navy)] bg-white p-2 shadow-[3px_3px_0_0_var(--navy)]"
    >
      <div className="grid grid-cols-5 gap-1">
        {pattern.flat().map((cell, i) => (
          <span
            key={i}
            className={
              cell
                ? "h-2.5 w-2.5 rounded-[2px] bg-[var(--navy)]"
                : "h-2.5 w-2.5 rounded-[2px] bg-transparent"
            }
          />
        ))}
      </div>
      <div className="mt-1 h-1 w-full rounded-full bg-[var(--dk-yellow)]" />
    </div>
  );
}

/* Falling confetti burst for the success state */
function Confetti() {
  const colors = [
    "var(--dk-yellow)",
    "var(--dk-coral)",
    "var(--dk-purple)",
    "var(--dk-pink)",
  ];
  const pieces = Array.from({ length: 18 });
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-0 overflow-visible"
    >
      {pieces.map((_, i) => {
        const left = (i * 5.5) % 100;
        const delay = (i % 6) * 0.08;
        const color = colors[i % colors.length];
        return (
          <span
            key={i}
            className="absolute top-0 block h-2.5 w-2.5 rounded-[2px]"
            style={{
              left: `${left}%`,
              backgroundColor: color,
              animation: `dk-confetti-fall ${0.9 + (i % 4) * 0.2}s ease-in ${delay}s forwards`,
            }}
          />
        );
      })}
    </div>
  );
}
