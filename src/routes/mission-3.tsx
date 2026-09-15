import { createFileRoute } from "@tanstack/react-router";
import { DigitalKavachMission } from "../components/DigitalKavachMission";

export const Route = createFileRoute("/mission-3")({
  head: () => ({
    meta: [
      { title: "Mission 3 — The Fake Wi-Fi & App Scam | Digital Kavach" },
      { name: "description", content: "Digital Kavach Cyber Safety Hunt — Mission 3." },
    ],
  }),
  component: Mission3,
});

function Mission3() {
  return (
    <DigitalKavachMission
      config={
  number: 3,
  title: "THE FAKE WI-FI & APP SCAM",
  subtitle: "Free Isn't Always Safe.",
  intro: "A Wi-Fi network promises free, unlimited high-speed internet with no password. You are also offered random APK files and unverified apps.",
  puzzle: ["You are offered \u201cFREE UNLIMITED HIGH-SPEED WI-FI\u201d with no password.", "The network secretly watches what you do and can steal passwords.", "Which choices are unsafe?"],
  mode: "multi",
  wrongMessage: "Select all three unsafe choices: unknown/unsecured Wi-Fi, random APK files, and unverified apps.",
  successMessage: "You avoided the unsafe digital shortcuts!",
  safetyTitle: "Cyber Safety Tip",
  safetyTip: "Avoid unknown Wi-Fi and never install random APK files or unverified apps.",
  clue: "Up and down, I take children high,\nthen bring them gently back nearby.\nHold on tight and have some fun\u2014find me where children swing under the sun.",
  nextLabel: "Swing Area",
  options: ["Unknown / unsecured Wi-Fi", "Random APK files", "Unverified apps", "Official apps from trusted app stores"],
  correctOptions: ["Unknown / unsecured Wi-Fi", "Random APK files", "Unverified apps"],
      }
    />
  );
}
