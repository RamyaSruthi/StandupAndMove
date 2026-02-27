import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useStatsStore } from "@/store/useStatsStore";
import { useEffect } from "react";

export default function CompleteScreen() {
  const router = useRouter();
  const { recordStandup, totalXP } = useStatsStore();

  useEffect(() => {
    recordStandup();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-4xl font-bold text-dark mb-2">Great job!</Text>
      <Text className="text-gray-500 mb-2">+10 XP earned</Text>
      <Text className="text-primary font-semibold mb-12">
        Total XP: {totalXP}
      </Text>

      {/* Celebrate animation placeholder */}
      <View className="w-40 h-40 rounded-full bg-secondary mb-12" />

      <Pressable
        className="bg-primary px-8 py-4 rounded-2xl"
        onPress={() => router.dismissAll()}
      >
        <Text className="text-white text-lg font-semibold">Back to Home</Text>
      </Pressable>
    </View>
  );
}
