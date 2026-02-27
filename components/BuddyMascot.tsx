import { View, Text, Pressable, Animated } from "react-native";
import { useRef } from "react";
import BuddyCharacter, { BuddyState } from "./BuddyCharacter";

interface Props {
  state: BuddyState;
  message: string;
  buddyName: string;
}

const stateLabel: Record<BuddyState, string> = {
  happy: "Happy",
  neutral: "Ready",
  lazy: "Sleepy",
};

export function BuddyMascot({ state, message, buddyName }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const handleTap = () => {
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 1.12,
        useNativeDriver: true,
        speed: 50,
        bounciness: 8,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 4,
      }),
    ]).start();
  };

  return (
    <View className="items-center gap-3 py-2">
      {/* Speech bubble */}
      <View
        className="rounded-2xl px-5 py-2.5"
        style={{
          backgroundColor: "#FFFFFF",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 6,
          elevation: 2,
        }}
      >
        <Text className="text-sm font-semibold text-dark text-center">
          {message}
        </Text>
      </View>

      {/* Dog character with tap bounce */}
      <Pressable onPress={handleTap} accessibilityLabel="Tap Buddy">
        <Animated.View style={{ transform: [{ scale }] }}>
          <BuddyCharacter state={state} size={224} />
        </Animated.View>
      </Pressable>

      {/* Name tag */}
      <View className="flex-row items-center gap-2">
        <Text className="text-lg font-extrabold text-dark tracking-wide">
          {buddyName}
        </Text>
        <View
          className="rounded-full px-2.5 py-0.5"
          style={{ backgroundColor: "rgba(67, 198, 172, 0.15)" }}
        >
          <Text className="text-xs font-bold" style={{ color: "#43C6AC" }}>
            {stateLabel[state]}
          </Text>
        </View>
      </View>
    </View>
  );
}
