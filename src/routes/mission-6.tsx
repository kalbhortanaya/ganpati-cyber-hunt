import { createFileRoute } from "@tanstack/react-router";
import { DigitalKavachMission } from "../components/DigitalKavachMission";

export const Route = createFileRoute("/mission-6")({
  head: () => ({
    meta: [
      { title: "Mission 6 — The Ultimate Cyber Shield | Digital Kavach" },
      { name: "description", content: "Digital Kavach Cyber Safety Hunt — Mission 6." },
    ],
  }),
  component: Mission6,
});

function Mission6() {
  return (
    <DigitalKavachMission
      config={
  number: 6,
  title: "THE ULTIMATE CYBER SHIELD",
  subtitle: "The Final Shield Is In Your Hands.",
  intro: "If you or someone in your family ever becomes a victim of a cyber scam, what National Cybercrime Helpline number should you call immediately to report the fraud?",
  puzzle: ["CYBERCRIME HELPLINE", "Fill in the missing digits:", "1 _ 3 _"],
  mode: "text",
  wrongMessage: "The National Cybercrime Helpline number is 1930.",
  successMessage: "You activated the Ultimate Cyber Shield!",
  safetyTitle: "Remember",
  safetyTip: "Report cyber fraud immediately using 1930.",
  clue: "\ud83c\udf89 CYBER SHIELD ACTIVATED! \ud83c\udf89\n\nDIGITAL KAVACH COMPLETE!\n\nYou have successfully completed all 6 cyber safety missions.\n\n\ud83c\udfc6 TREASURE UNLOCKED \ud83d\udd13\n\nShow your completed mission to the organizers.",
  nextLabel: "Treasure",
  acceptedAnswers: ["1930"],
      }
    />
  );
}
