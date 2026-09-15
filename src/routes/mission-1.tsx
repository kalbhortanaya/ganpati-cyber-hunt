import { createFileRoute } from "@tanstack/react-router";
import { DigitalKavachMission } from "../components/DigitalKavachMission";

export const Route = createFileRoute("/mission-1")({
  head: () => ({
    meta: [
      { title: "Mission 1 — The Fake Qr Code Trap | Digital Kavach" },
      { name: "description", content: "Digital Kavach Cyber Safety Hunt — Mission 1." },
    ],
  }),
  component: Mission1,
});

function Mission1() {
  return (
    <DigitalKavachMission
      config={
  number: 1,
  title: "THE FAKE QR CODE TRAP",
  subtitle: "Think Before You Scan!",
  intro: "You scan a QR code that promises a reward. After scanning, the page asks: \u201cEnter your UPI PIN to receive your prize.\u201d",
  puzzle: ["You scan a QR code that promises a reward.", "After scanning, the page asks:", "\u201cEnter your UPI PIN to receive your prize.\u201d"],
  mode: "text",
  wrongMessage: "Think about the secret number you should NEVER share just to receive money.",
  successMessage: "You spotted the QR scam!",
  safetyTitle: "Cyber Safety Tip",
  safetyTip: "Never enter your UPI PIN just to receive money.",
  clue: "I sparkle in the sunlight and dance without feet.\nI have no water, but I am pool.\nPeople gather near me where they get a cool breeze.",
  nextLabel: "Fountain",
  reminder: "You NEVER enter a UPI PIN to RECEIVE money.",
  acceptedAnswers: ["UPI PIN", "UPIPIN", "PIN UPI", "PINUPI"],
      }
    />
  );
}
