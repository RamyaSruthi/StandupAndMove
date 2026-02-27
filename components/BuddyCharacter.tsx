import LottieView from "lottie-react-native";

export type BuddyState = "happy" | "neutral" | "lazy";

interface BuddyCharacterProps {
  state?: BuddyState;
  size?: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const animations: Record<BuddyState, any> = {
  happy: require("../assets/animations/buddy-happy.json"),
  neutral: require("../assets/animations/buddy-neutral.json"),
  lazy: require("../assets/animations/buddy-lazy.json"),
};

export default function BuddyCharacter({
  state = "neutral",
  size = 200,
}: BuddyCharacterProps) {
  return (
    <LottieView
      key={state}
      source={animations[state]}
      autoPlay
      loop
      style={{ width: size, height: size }}
    />
  );
}
