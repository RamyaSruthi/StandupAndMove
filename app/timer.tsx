import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function TimerScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-5xl font-bold text-primary mb-4">1:00</Text>
      <Text className="text-gray-500 mb-12">Keep moving!</Text>

      {/* Buddy animation placeholder */}
      <View className="w-40 h-40 rounded-full bg-accent mb-12" />

      <Pressable
        className="bg-secondary px-8 py-4 rounded-2xl"
        onPress={() => router.replace("/complete")}
      >
        <Text className="text-white text-lg font-semibold">Done!</Text>
      </Pressable>
    </View>
  );
}
