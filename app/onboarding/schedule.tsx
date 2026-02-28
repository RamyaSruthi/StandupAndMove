import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useSettingsStore } from "@/store/useSettingsStore";
import { requestPermissions, scheduleReminders } from "@/utils/notifications";

const INTERVALS = [30, 45, 60, 90] as const;

export default function ScheduleScreen() {
  const router = useRouter();
  const {
    buddyName,
    reminderInterval,
    activeHoursStart,
    activeHoursEnd,
    activeDays,
    setReminderInterval,
    setOnboardingComplete,
  } = useSettingsStore();

  const [loading, setLoading] = useState(false);

  const handleDone = async () => {
    setLoading(true);
    setOnboardingComplete();

    const granted = await requestPermissions();
    if (granted) {
      await scheduleReminders({
        buddyName,
        reminderInterval,
        activeHoursStart,
        activeHoursEnd,
        activeDays,
        isDndEnabled: false,
      });
    }

    setLoading(false);
    router.replace("/(tabs)");
  };

  return (
    <View className="flex-1 justify-center bg-background px-6">
      <Text className="text-3xl font-bold text-dark mb-2">
        Set your schedule
      </Text>
      <Text className="text-gray-500 mb-8">
        How often should Buddy remind you to move?
      </Text>

      <View className="gap-3 mb-10">
        {INTERVALS.map((interval) => (
          <Pressable
            key={interval}
            className={`w-full py-4 rounded-2xl items-center border ${
              reminderInterval === interval
                ? "bg-primary border-primary"
                : "bg-white border-gray-200"
            }`}
            onPress={() => setReminderInterval(interval)}
          >
            <Text
              className={`text-lg font-semibold ${
                reminderInterval === interval ? "text-white" : "text-dark"
              }`}
            >
              Every {interval} minutes
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        className="bg-primary w-full py-4 rounded-2xl items-center"
        onPress={handleDone}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-lg font-semibold">
            Start Moving!
          </Text>
        )}
      </Pressable>
    </View>
  );
}
