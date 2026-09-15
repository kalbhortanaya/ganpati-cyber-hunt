import { createFileRoute } from "@tanstack/react-router";
import { DigitalKavachMission } from "../components/DigitalKavachMission";

export const Route = createFileRoute("/mission-4")({
  head: () => ({
    meta: [
      { title: "Mission 4 — The Otp Trapdoor | Digital Kavach" },
      { name: "description", content: "Digital Kavach Cyber Safety Hunt — Mission 4." },
    ],
  }),
  component: Mission4,
});

function Mission4() {
  return (
    <DigitalKavachMission
      config={
  number: 4,
  title: "THE OTP TRAPDOOR",
  subtitle: "One Code Can Open The Wrong Door.",
  intro: "A 6-digit code is sent to your phone. Someone calls claiming to be from your bank and asks for the code to complete a transaction.",
  puzzle: ["A 6-digit code is sent to your phone.", "Someone says: \u201cI am from your bank. Please tell me the code you just received.\u201d", "What is this secret code called? Unscramble: T \u2013 P \u2013 O"],
  mode: "text",
  wrongMessage: "It is the one-time code sent to your phone. Think: T \u2013 P \u2013 O.",
  successMessage: "You protected your one-time password!",
  safetyTitle: "Golden Rule",
  safetyTip: "NEVER share your OTP with anyone\u2014not even someone claiming to be from your bank.",
  clue: "I am where the music plays,\nthe crowd cheers,\nand the spotlight shines.\nYou will find me at the Main Stage.",
  nextLabel: "Main Stage",
  acceptedAnswers: ["OTP", "ONE TIME PASSWORD", "ONETIMEPASSWORD"],
      }
    />
  );
}
