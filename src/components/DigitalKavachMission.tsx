import { useRef, useState } from "react";

type Mode = "text" | "choice" | "multi";

type MissionConfig = {
  number: number;
  title: string;
  accentTitle?: string;
  subtitle: string;
  intro: string;
  puzzle: string[];
  reminder?: string;
  mode: Mode;
  options?: string[];
  correctOptions?: string[];
  acceptedAnswers?: string[];
  wrongMessage: string;
  successMessage: string;
  safetyTitle: string;
  safetyTip: string;
  clue: string;
  nextLabel: string;
};

const MISSIONS = [1, 2, 3, 4, 5, 6];

function normalize(s: string) {
  return s.trim().toUpperCase().replace(/\s+/g, " ");
}

export function DigitalKavachMission({ config }: { config: MissionConfig }) {
  const [answer, setAnswer] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "wrong" | "correct">("idle");
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  function checkAnswer() {
    let correct = false;

    if (config.mode === "text") {
      const n = normalize(answer);
      correct = (config.acceptedAnswers ?? []).some((a) => normalize(a) === n);
    } else if (config.mode === "choice") {
      correct = selected.length === 1 && (config.correctOptions ?? []).includes(selected[0]);
    } else {
      const a = [...selected].sort();
      const b = [...(config.correctOptions ?? [])].sort();
      correct = a.length === b.length && a.every((v, i) => v === b[i]);
    }

    if (correct) setStatus("correct");
    else {
      setStatus("wrong");
      setAttempts((x) => x + 1);
    }
  }

  function retry() {
    setStatus("idle");
    setAnswer("");
    setSelected([]);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  return (
    <div className="min-h-screen bg-[var(--lavender)] text-[var(--navy)] font-[var(--font-body)]">
      <header className="sticky top-0 z-30 bg-[var(--lavender)]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-md items-center justify-between gap-3 px-4 py-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--dk-purple)] text-white shadow-[3px_3px_0_0_var(--navy)] ring-3 ring-[var(--navy)]">
              <span className="font-[var(--font-display)] text-lg font-bold leading-none">DK</span>
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
          <div className="flex shrink-0 items-center gap-1.5">
            {MISSIONS.map((m) => (
              <span key={m} className={m === config.number
                ? "grid h-7 w-7 place-items-center rounded-full bg-[var(--dk-purple)] text-xs font-bold text-white ring-3 ring-[var(--navy)] shadow-[2px_2px_0_0_var(--navy)] dk-pop"
                : "grid h-7 w-7 place-items-center rounded-full bg-white/70 text-xs font-bold text-[var(--navy)]/40 ring-2 ring-[var(--navy)]/30"}>
                {m}
              </span>
            ))}
          </div>
        </div>
        <div className="h-[3px] w-full bg-[var(--navy)]" />
      </header>

      <main className="mx-auto max-w-md px-4 pb-12 pt-5">
        <section className="relative overflow-hidden rounded-[1.75rem] border-[5px] border-[var(--navy)] bg-white px-5 py-6 shadow-[8px_8px_0_0_var(--navy)]">
          <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[var(--dk-yellow)]/40 blur-xl" />
          <div className="pointer-events-none absolute -bottom-8 -left-6 h-20 w-20 rounded-full bg-[var(--dk-purple)]/20 blur-xl" />
          <div className="relative flex items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="inline-block rounded-full bg-[var(--dk-purple)] px-3 py-1 font-[var(--font-display)] text-xs font-bold uppercase tracking-[0.18em] text-white ring-2 ring-[var(--navy)]">
                Mission {String(config.number).padStart(2, "0")}
              </span>
              <h1 className="mt-3 font-[var(--font-display)] text-3xl font-bold leading-[1.05] tracking-tight text-[var(--navy)] sm:text-4xl">
                {config.title}
              </h1>
              <p className="mt-2 font-[var(--font-display)] text-sm font-bold uppercase tracking-[0.12em] text-[var(--dk-coral)]">
                {config.subtitle}
              </p>
            </div>
            <DecoQR />
          </div>
          <p className="mt-4 text-base font-semibold leading-relaxed text-[var(--navy)]/90">
            {config.intro}
          </p>
        </section>

        <section className="mt-6 dk-card-lg bg-white p-5">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚨</span>
            <h2 className="font-[var(--font-display)] text-xl font-bold uppercase tracking-tight text-[var(--navy)]">Cyber Puzzle</h2>
          </div>
          <div className="mt-3 rounded-2xl border-[3px] border-[var(--navy)] bg-[var(--lavender)] p-4">
            {config.puzzle.map((p, i) => (
              <p key={i} className={`${i ? "mt-2 " : ""}text-[0.95rem] font-semibold leading-relaxed text-[var(--navy)]`}>
                {p}
              </p>
            ))}
          </div>
          {config.reminder && (
            <div className="mt-4 flex items-start gap-3 rounded-2xl border-[3px] border-[var(--navy)] bg-[var(--dk-coral)] p-4 text-white shadow-[4px_4px_0_0_var(--navy)]">
              <span className="text-2xl leading-none">⚠️</span>
              <div>
                <div className="font-[var(--font-display)] text-sm font-bold uppercase tracking-[0.12em]">Remember</div>
                <p className="mt-1 text-[0.95rem] font-bold leading-snug">{config.reminder}</p>
              </div>
            </div>
          )}
        </section>

        <section className="mt-6 dk-card-lg bg-[var(--dk-pink)] p-5">
          <div className="flex items-center gap-2 text-white">
            <span className="text-2xl">🔐</span>
            <h2 className="font-[var(--font-display)] text-xl font-bold uppercase tracking-tight">Your Task</h2>
          </div>

          {config.mode === "text" && (
            <>
              <p className="mt-3 text-center font-[var(--font-display)] text-lg font-bold uppercase tracking-[0.12em] text-white">
                {config.number === 1 ? "Unscramble the letters" : "Enter your answer"}
              </p>
              {config.number === 1 && (
                <div className="mt-4 flex justify-center gap-2 sm:gap-3">
                  {["N", "I", "P", "I", "U"].map((letter, i) => (
                    <span key={`${letter}-${i}`} className="dk-float grid h-12 w-12 place-items-center rounded-xl bg-white text-2xl font-bold text-[var(--navy)] ring-[3px] ring-[var(--navy)] shadow-[3px_3px_0_0_var(--navy)] sm:h-14 sm:w-14 sm:text-3xl" style={{ animationDelay: `${i * 0.2}s` }}>
                      {letter}
                    </span>
                  ))}
                </div>
              )}
              <p className="mt-5 text-center font-[var(--font-display)] text-base font-bold text-white">
                {config.number === 1 ? "What does this spell?" : config.number === 5 ? "Write the secret code:" : config.number === 6 ? "Fill in the missing digits:" : ""}
              </p>
              {config.number === 6 && (
                <div className="mt-3 text-center font-[var(--font-display)] text-4xl font-bold tracking-[0.35em] text-white">1 _ 3 _</div>
              )}
              {config.number === 5 && (
                <div className="mt-3 rounded-xl border-[3px] border-[var(--navy)] bg-white/90 p-3 text-center font-bold text-[var(--navy)]">
                  SECRET CODE
                </div>
              )}
              <input ref={inputRef} type="text" inputMode="text" autoCapitalize="characters" autoComplete="off" value={answer}
                onChange={(e) => { setAnswer(e.target.value); if (status === "wrong") setStatus("idle"); }}
                onKeyDown={(e) => { if (e.key === "Enter") checkAnswer(); }}
                placeholder={config.number === 6 ? "Enter 1930" : "Type your answer here..."}
                aria-label="Type your answer"
                className="mt-3 w-full rounded-xl border-[4px] border-[var(--navy)] bg-white px-4 py-4 text-center text-xl font-bold text-[var(--navy)] placeholder:font-semibold placeholder:text-[var(--navy)]/35 shadow-[4px_4px_0_0_var(--navy)] focus:outline-none focus:ring-4 focus:ring-[var(--dk-purple)]/40" />
            </>
          )}

          {config.mode === "choice" && (
            <>
              <p className="mt-3 text-center font-[var(--font-display)] text-lg font-bold text-white">{config.number === 2 ? "Choose the correct answer" : "Choose one"}</p>
              <div className="mt-4 space-y-3">
                {(config.options ?? []).map((option) => (
                  <button key={option} type="button" onClick={() => { setSelected([option]); if (status === "wrong") setStatus("idle"); }}
                    className={`w-full rounded-xl border-[3px] border-[var(--navy)] p-4 text-left font-bold shadow-[3px_3px_0_0_var(--navy)] ${selected.includes(option) ? "bg-[var(--dk-yellow)] text-[var(--navy)]" : "bg-white text-[var(--navy)]"}`}>
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}

          {config.mode === "multi" && (
            <>
              <p className="mt-3 text-center font-[var(--font-display)] text-lg font-bold text-white">Cross out / select the unsafe choices</p>
              <div className="mt-4 space-y-3">
                {(config.options ?? []).map((option) => {
                  const on = selected.includes(option);
                  return (
                    <button key={option} type="button" onClick={() => {
                      setSelected(on ? selected.filter((x) => x !== option) : [...selected, option]);
                      if (status === "wrong") setStatus("idle");
                    }} className={`w-full rounded-xl border-[3px] border-[var(--navy)] p-4 text-left font-bold shadow-[3px_3px_0_0_var(--navy)] ${on ? "bg-[var(--dk-yellow)] text-[var(--navy)]" : "bg-white text-[var(--navy)]"}`}>
                      <span className="mr-2">{on ? "☑" : "☐"}</span>{option}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          <button onClick={checkAnswer} className="dk-btn-yellow mt-4 w-full py-4 font-[var(--font-display)] text-xl font-bold uppercase tracking-wide active:dk-btn-yellow-press">
            Check Answer
          </button>
        </section>

        {status === "wrong" && (
          <section key={`wrong-${attempts}`} className="dk-shake mt-6 dk-card-lg bg-[var(--dk-coral)] p-5 text-white">
            <div className="flex items-center gap-2">
              <span className="text-3xl">❌</span>
              <h2 className="font-[var(--font-display)] text-2xl font-bold uppercase tracking-tight">Not Quite!</h2>
            </div>
            <p className="mt-2 text-[0.95rem] font-bold leading-snug">{config.wrongMessage}</p>
            <button onClick={retry} className="dk-btn-yellow mt-4 w-full py-3 font-[var(--font-display)] text-lg font-bold uppercase tracking-wide active:dk-btn-yellow-press">Try Again</button>
          </section>
        )}

        {status === "correct" && (
          <>
            <section className="relative dk-pop mt-6 dk-card-lg bg-white p-5">
              <Confetti />
              <div className="flex items-center gap-2">
                <span className="text-3xl">🛡️</span>
                <h2 className="font-[var(--font-display)] text-2xl font-bold uppercase tracking-tight text-[var(--dk-purple)]">Mission Cleared!</h2>
              </div>
              <p className="mt-2 text-lg font-bold text-[var(--navy)]">{config.successMessage} 🎉</p>
              <div className="mt-4 rounded-2xl border-[3px] border-[var(--navy)] bg-[var(--dk-yellow)] p-4 shadow-[4px_4px_0_0_var(--navy)]">
                <div className="font-[var(--font-display)] text-sm font-bold uppercase tracking-[0.12em] text-[var(--navy)]">💡 {config.safetyTitle}</div>
                <p className="mt-1 text-[0.95rem] font-bold leading-snug text-[var(--navy)]">{config.safetyTip}</p>
              </div>
            </section>

            <section className="dk-pop mt-6 dk-card-lg bg-[var(--dk-purple)] p-5 text-white">
              <div className="flex items-center gap-2">
                <span className="text-3xl">🔓</span>
                <h2 className="font-[var(--font-display)] text-2xl font-bold uppercase tracking-tight">Next Clue</h2>
              </div>
              <div className="mt-4 rounded-2xl border-[3px] border-white bg-white/10 p-4">
                <p className="text-center font-[var(--font-display)] text-base font-semibold italic leading-relaxed text-white">{config.clue}</p>
              </div>
              <p className="mt-4 text-center font-[var(--font-display)] text-sm font-bold uppercase tracking-[0.12em] text-[var(--dk-yellow)]">
                {config.number === 6 ? "Show this completed screen to the organizers." : "Solve the riddle. Find the next QR."}
              </p>
              {config.number === 6 && (
                <div className="mt-5 rounded-2xl border-[3px] border-white bg-white p-4 text-[var(--navy)]">
                  <div className="font-[var(--font-display)] text-sm font-bold uppercase tracking-[0.12em]">Treasure Rewards</div>
                  <p className="mt-2 text-sm font-bold leading-relaxed">🎁 Smart Tech Gadget / Power Bank<br/>🏅 Ganeshotsav Souvenir<br/>🛡️ Certified Cyber Guard Digital Badge / Certificate<br/>📘 Pocket-sized “10 Commandments of Cyber Safety”</p>
                  <div className="mt-4 border-t-2 border-[var(--navy)]/20 pt-4">
                    <div className="font-[var(--font-display)] text-sm font-bold uppercase tracking-[0.12em]">I AM A DIGITAL KAVACH!</div>
                    <p className="mt-2 text-sm font-semibold leading-relaxed">✓ Think before you click.<br/>✓ Keep your information private.<br/>✓ Verify before you trust.<br/>✓ Say NO to online scams.<br/>✓ Help your family and friends stay safe.</p>
                  </div>
                </div>
              )}
            </section>
          </>
        )}

        <footer className="mt-10 text-center">
          <div className="inline-block rounded-full border-[3px] border-[var(--navy)] bg-white px-5 py-2 shadow-[3px_3px_0_0_var(--navy)]">
            <div className="font-[var(--font-display)] text-sm font-bold uppercase tracking-tight text-[var(--navy)]">
              Digital <span className="text-[var(--dk-purple)]">Kavach</span> · Cyber Safety Hunt
            </div>
            <div className="mt-0.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[var(--dk-purple)]">Think • Verify • Stay Safe</div>
          </div>
          <p className="mt-3 font-[var(--font-display)] text-base font-bold text-[var(--navy)]">Jai Ganesh 🙏</p>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--navy)]/60">By Tanaya Kalbhor</p>
        </footer>
      </main>
    </div>
  );
}

function DecoQR() {
  const pattern = [[1,1,1,0,1],[1,0,1,1,0],[1,1,0,0,1],[0,1,1,0,1],[1,0,1,1,1]];
  return <div aria-hidden="true" className="dk-float shrink-0 rounded-xl border-[3px] border-[var(--navy)] bg-white p-2 shadow-[3px_3px_0_0_var(--navy)]">
    <div className="grid grid-cols-5 gap-1">{pattern.flat().map((cell,i)=><span key={i} className={cell ? "h-2.5 w-2.5 rounded-[2px] bg-[var(--navy)]" : "h-2.5 w-2.5 rounded-[2px] bg-transparent"} />)}</div>
    <div className="mt-1 h-1 w-full rounded-full bg-[var(--dk-yellow)]" />
  </div>;
}

function Confetti() {
  const pieces = Array.from({ length: 18 });
  const colors = ["var(--dk-yellow)","var(--dk-coral)","var(--dk-purple)","var(--dk-pink)"];
  return <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-0 overflow-visible">
    {pieces.map((_,i)=><span key={i} className="absolute top-0 block h-2.5 w-2.5 rounded-[2px]" style={{left:`${(i*5.5)%100}%`,backgroundColor:colors[i%colors.length],animation:`dk-confetti-fall ${0.9+(i%4)*0.2}s ease-in ${(i%6)*0.08}s forwards`}} />)}
  </div>;
}
