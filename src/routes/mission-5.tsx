import { createFileRoute } from "@tanstack/react-router";
import { DigitalKavachMission } from "../components/DigitalKavachMission";

export const Route = createFileRoute("/mission-5")({
  head: () => ({
    meta: [
      { title: "Mission 5 — The Deepfake & Voice Clone | Digital Kavach" },
      { name: "description", content: "Digital Kavach Cyber Safety Hunt — Mission 5." },
    ],
  }),
  component: Mission5,
});

function Mission5() {
  return (
    <DigitalKavachMission
      config={
  number: 5,
  title: "THE DEEPFAKE & VOICE CLONE",
  subtitle: "Can You Tell Who Is Really Calling?",
  intro: "Your phone rings. You hear your best friend or family member crying and saying: \u201cPlease help me! I am in trouble. Send money immediately!\u201d The voice sounds exactly like them.",
  puzzle: ["It could be an AI-generated voice clone.", "What should you do to verify that the caller is really your friend or family member?", "Use a secret phrase or personal question and verify through another trusted method.", "Write the SECRET CODE:"],
  mode: "text",
  wrongMessage: "Use the secret verification code from the clue: KAVACH.",
  successMessage: "You did not trust a suspicious voice blindly!",
  safetyTitle: "Cyber Safety Tip",
  safetyTip: "Don't trust a voice just because it sounds familiar. Verify using a secret phrase, another number, or a trusted person.",
  clue: "I am the powerhouse where the Vista Team sits,\nwhere information and help are given.\nIf you need an authority, come looking here.\nYour final clue is waiting nearby.",
  nextLabel: "Vista Team / Club House Office",
  acceptedAnswers: ["KAVACH"],
      }
    />
  );
}
