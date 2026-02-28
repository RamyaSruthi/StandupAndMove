import { View, Text, Pressable, Animated } from "react-native";
import { useRouter } from "expo-router";
import { useStatsStore } from "@/store/useStatsStore";
import { useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import BuddyCharacter from "@/components/BuddyCharacter";

export default function CompleteScreen() {
  const router = useRouter();
  const { recordStandup, currentStreak, totalXP, totalStandups } =
    useStatsStore();

  // Prevent double-recording if component re-renders
  const recorded = useRef(false);

  // Entrance scale animation
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!recorded.current) {
      recorded.current = true;
      recordStandup();
    }

    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 10,
        speed: 8,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Animated.View
        style={{ transform: [{ scale: scaleAnim }], opacity: opacityAnim, alignItems: "center", width: "100%" }}
      >
        {/* Header */}
        <Text className="text-4xl font-extrabold text-dark mb-1">
          Great job! 🎉
        </Text>
        <Text className="text-gray-500 mb-8 text-center">
          You completed a movement session
        </Text>

        {/* Buddy in happy state */}
        <BuddyCharacter state="happy" size={200} />

        {/* Stats row */}
        <View className="flex-row gap-3 mt-8 mb-10 w-full">
          <StatCard
            icon="flash"
            value="+10 XP"
            label="Earned"
            color="#43C6AC"
          />
          <StatCard
            icon="flame"
            value={String(currentStreak)}
            label="Day Streak"
            color="#FF6B3D"
          />
          <StatCard
            icon="fitness"
            value={String(totalStandups)}
            label="Total"
            color="#6C63FF"
          />
        </View>

        {/* Back to home */}
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

function StatCard({
  icon,
  value,
  label,
  color,
}: {
  icon: string;
  value: string;
  label: string;
  color: string;
}) {
  return (
    <View
      className="flex-1 rounded-2xl p-4 items-center"
      style={{
        backgroundColor: "#FFFFFF",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      <Ionicons name={icon as any} size={22} color={color} />
      <Text className="text-xl font-extrabold text-dark mt-1">{value}</Text>
      <Text className="text-xs text-gray-500">{label}</Text>
    </View>
  );
}
