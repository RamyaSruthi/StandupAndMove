import { ScrollView, View, Text } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useStatsStore } from "@/store/useStatsStore";
import { GreetingHeader } from "@/components/GreetingHeader";
import { BuddyMascot } from "@/components/BuddyMascot";
import { MoodBar } from "@/components/MoodBar";
import { MovingButton } from "@/components/MovingButton";
import { DurationPicker } from "@/components/DurationPicker";
import { useDailySteps } from "@/hooks/useDailySteps";
import type { BuddyState } from "@/components/BuddyCharacter";

function todayKey() {
  return new Date().toISOString().split("T")[0];
}

const MESSAGES: Record<BuddyState, string> = {
  happy: "You're crushing it today! 🔥",
  neutral: "Let's get moving!",
  lazy: "I'm getting sleepy... wake me up! 😴",
};

export default function HomeScreen() {
  const router = useRouter();
  const buddyName = useSettingsStore((s) => s.buddyName);
  const { currentStreak, totalXP, dailyLog } = useStatsStore();
  const { steps, available: stepsAvailable } = useDailySteps();
  const [showPicker, setShowPicker] = useState(false);

  const standupsToday = dailyLog[todayKey()] ?? 0;

  const buddyState: BuddyState =
    standupsToday >= 2 ? "happy" : standupsToday >= 1 ? "neutral" : "lazy";

  const moodProgress = Math.min(Math.round((standupsToday / 3) * 100), 100);

  const handleDurationSelected = (seconds: number) => {
    setShowPicker(false);
    router.push({ pathname: "/timer", params: { duration: String(seconds) } });
  };

  return (
    <>
      <ScrollView
        className="flex-1 bg-background"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <GreetingHeader name={buddyName} streak={currentStreak} />

        <BuddyMascot
          state={buddyState}
          message={MESSAGES[buddyState]}
          buddyName={buddyName}
        />

        <MoodBar
          progress={moodProgress}
          standupsToday={standupsToday}
          totalXP={totalXP}
        />

        {/* Daily steps card */}
        {stepsAvailable && (
          <View className="px-6 mt-3">
            <View
              className="bg-white rounded-2xl px-4 py-3 flex-row items-center gap-3"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              <View
                className="w-9 h-9 rounded-full items-center justify-center"
                style={{ backgroundColor: "rgba(67,198,172,0.12)" }}
              >
                <Ionicons name="footsteps" size={18} color="#43C6AC" />
              </View>
              <View>
                <Text className="text-base font-extrabold text-dark">
                  {steps.toLocaleString()} steps
                </Text>
                <Text className="text-xs text-gray-500">
                  walked by standing up today
                </Text>
              </View>
            </View>
          </View>
        )}

        <MovingButton onPress={() => setShowPicker(true)} />
      </ScrollView>

      <DurationPicker
        visible={showPicker}
        onSelect={handleDurationSelected}
        onClose={() => setShowPicker(false)}
      />
    </>
  );
}
