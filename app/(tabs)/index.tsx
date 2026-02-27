import { ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useStatsStore } from "@/store/useStatsStore";
import { GreetingHeader } from "@/components/GreetingHeader";
import { BuddyMascot } from "@/components/BuddyMascot";
import { MoodBar } from "@/components/MoodBar";
import { MovingButton } from "@/components/MovingButton";
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

  const standupsToday = dailyLog[todayKey()] ?? 0;

  const buddyState: BuddyState =
    standupsToday >= 2 ? "happy" : standupsToday >= 1 ? "neutral" : "lazy";

  const moodProgress = Math.min(Math.round((standupsToday / 3) * 100), 100);

  return (
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

      <MovingButton onPress={() => router.push("/timer")} />
    </ScrollView>
  );
}
