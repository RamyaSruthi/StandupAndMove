import { View, Text, TextInput, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useSettingsStore } from "@/store/useSettingsStore";

export default function NameScreen() {
  const router = useRouter();
  const setBuddyName = useSettingsStore((s) => s.setBuddyName);
  const [name, setName] = useState("Buddy");

  const handleNext = () => {
    if (name.trim()) {
      setBuddyName(name.trim());
      router.push("/onboarding/schedule");
    }
  };

  return (
    <View className="flex-1 justify-center bg-background px-6">
      <Text className="text-3xl font-bold text-dark mb-2">
        Name your buddy
      </Text>
      <Text className="text-gray-500 mb-8">
        Give your dog a name — it'll stick with you all day!
      </Text>

      <TextInput
        className="bg-white border border-gray-200 rounded-2xl px-4 py-3 text-lg text-dark mb-8"
        value={name}
        onChangeText={setName}
        placeholder="Buddy"
        maxLength={20}
        autoFocus
      />

      <Pressable
        className="bg-primary w-full py-4 rounded-2xl items-center"
        onPress={handleNext}
      >
        <Text className="text-white text-lg font-semibold">Next</Text>
      </Pressable>
    </View>
  );
}
