import { View, Text, Pressable, Animated } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useStatsStore } from "@/store/useStatsStore";
import { useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import BuddyCharacter from "@/components/BuddyCharacter";

export default function CompleteScreen() {
  const router = useRouter();
  const { steps, duration } = useLocalSearchParams<{ steps: string; duration: string }>();
  const sessionSteps = parseInt(steps ?? "0");
  const sessionMins = Math.round(parseInt(duration ?? "60") / 60);

  const { recordStandup, addSessionSteps, totalStandups } = useStatsStore();

  const recorded = useRef(false);
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!recorded.current) {
      recorded.current = true;
      recordStandup();
      addSessionSteps(sessionSteps);
    }

    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, bounciness: 10, speed: 8 }),
      Animated.timing(opacityAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
  }, []);

  const subtitle = sessionSteps > 0
    ? `You completed ${sessionSteps.toLocaleString()} steps in this standup session!`
    : "You completed a standup session!";

  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text className="text-4xl font-extrabold text-dark mb-2">Great job! 🎉</Text>
        <Text className="text-base text-gray-500 mb-8 text-center leading-6">
          {subtitle}
        </Text>

        <BuddyCharacter state="happy" size={200} />

        {/* Sessions stat */}
        <View
          className="flex-row items-center gap-4 rounded-2xl px-6 py-4 mt-8 mb-6"
          style={{
            backgroundColor: "#FFFFFF",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 6,
            elevation: 2,
            alignSelf: "stretch",
          }}
        >
          <View
            style={{ backgroundColor: "rgba(108,99,255,0.1)", borderRadius: 12, padding: 10 }}
          >
            <Ionicons name="walk" size={24} color="#6C63FF" />
          </View>
          <View>
            <Text style={{ fontSize: 22, fontWeight: "900", color: "#2D2D2D" }}>
              {totalStandups} standup {totalStandups === 1 ? "session" : "sessions"}
            </Text>
            <Text style={{ fontSize: 13, color: "#999", fontWeight: "600", marginTop: 1 }}>
              completed in total
            </Text>
          </View>
        </View>

        <Pressable
          className="w-full py-4 rounded-2xl items-center"
          style={{ backgroundColor: "#6C63FF" }}
          onPress={() => router.dismissAll()}
        >
          <Text className="text-white text-lg font-semibold">Back to Home</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}
