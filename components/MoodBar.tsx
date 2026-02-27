import { View, Text, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  progress: number; // 0–100
  standupsToday: number;
  totalXP: number;
}

export function MoodBar({ progress, standupsToday, totalXP }: Props) {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 700,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const widthInterpolated = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View className="px-6">
      <View
        className="rounded-2xl p-4"
        style={{
          backgroundColor: "#FFFFFF",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 6,
          elevation: 2,
        }}
      >
        {/* Header row */}
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center gap-2">
            <View
              className="w-7 h-7 rounded-full items-center justify-center"
              style={{ backgroundColor: "rgba(108, 99, 255, 0.1)" }}
            >
              <Ionicons name="heart" size={14} color="#6C63FF" />
            </View>
            <Text className="text-sm font-bold text-dark">Mood Level</Text>
          </View>
          <Text className="text-sm font-extrabold" style={{ color: "#6C63FF" }}>
            {progress}%
          </Text>
        </View>

        {/* Progress bar */}
        <View
          className="h-4 rounded-full overflow-hidden"
          style={{ backgroundColor: "#F0F0F0" }}
        >
          <Animated.View
            className="h-full rounded-full"
            style={{
              width: widthInterpolated,
              backgroundColor: "#6C63FF",
            }}
          />
        </View>

        {/* Quick stats */}
        <View className="flex-row items-center justify-between mt-3 px-1">
          <View className="flex-row items-center gap-1.5">
            <Ionicons name="flash" size={14} color="#43C6AC" />
            <Text className="text-xs font-semibold text-gray-500">
              {standupsToday} stand-ups today
            </Text>
          </View>
          <View className="flex-row items-center gap-1.5">
            <Ionicons name="star" size={14} color="#FFB347" />
            <Text className="text-xs font-semibold text-gray-500">
              {totalXP} XP earned
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
