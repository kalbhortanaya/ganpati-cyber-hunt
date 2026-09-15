import { createFileRoute } from "@tanstack/react-router";
import { DigitalKavachMission } from "../components/DigitalKavachMission";

export const Route = createFileRoute("/mission-2")({
  head: () => ({
    meta: [
      { title: "Mission 2 — The Digital Arrest Scam | Digital Kavach" },
      { name: "description", content: "Digital Kavach Cyber Safety Hunt — Mission 2." },
    ],
  }),
  component: Mission2,
});

function Mission2() {
  return (
    <DigitalKavachMission
      config={
  number: 2,
  title: "THE DIGITAL ARREST SCAM",
  subtitle: "Don't Panic. Think First!",
  intro: "A caller wearing a police uniform appears on a video call and says: \u201cThis is a DIGITAL ARREST. Stay on this video call and send money immediately.\u201d",
  puzzle: ["A caller wearing a police uniform appears on a video call.", "They claim you are under a \u201cDigital Arrest\u201d and demand money.", "Would real police officers arrest or interrogate citizens through a WhatsApp video call and demand money?"],
  mode: "choice",
  wrongMessage: "Real police do not use WhatsApp video calls to carry out a \u201cdigital arrest\u201d or demand money.",
  successMessage: "You did not fall for the digital arrest scam!",
  safetyTitle: "Cyber Safety Tip",
  safetyTip: "Stay calm, hang up, and verify through an official police contact.",
  clue: "I am a tall, beautiful tree with bright red flowers.\nYou will find me in the park.\nLook for the Gulmohar tree to find your next clue.",
  nextLabel: "Gulmohar Tree",
  options: ["YES", "NO"],
  correctOptions: ["NO"],
      }
    />
  );
}
