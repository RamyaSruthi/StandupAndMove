import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <View className="w-40 h-40 rounded-full bg-primary mb-8" />
      <Text className="text-4xl font-bold text-dark mb-3 text-center">
        Meet Buddy
      </Text>
      <Text className="text-gray-500 text-center mb-12 text-lg">
        Your personal movement companion. Keep Buddy happy by standing up and
        moving throughout the day!
      </Text>

      <Pressable
        className="bg-primary w-full py-4 rounded-2xl items-center"
        onPress={() => router.push("/onboarding/name")}
      >
        <Text className="text-white text-lg font-semibold">Let's Go!</Text>
      </Pressable>
    </View>
  );
}
