import { View, Text, ScrollView } from "react-native";
import { useStatsStore } from "@/store/useStatsStore";

export default function StatsScreen() {
  const { currentStreak, bestStreak, totalStandups, totalXP } = useStatsStore();

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6 pt-16">
        <Text className="text-2xl font-bold text-dark mb-6">Your Stats</Text>

        <View className="flex-row flex-wrap gap-4">
          <StatCard label="Current Streak" value={`${currentStreak} days`} />
          <StatCard label="Best Streak" value={`${bestStreak} days`} />
          <StatCard label="Total Stand-ups" value={String(totalStandups)} />
          <StatCard label="Total XP" value={String(totalXP)} />
        </View>

        {/* Chart placeholder — Phase 7 */}
        <View className="mt-8 h-48 bg-white rounded-2xl items-center justify-center border border-gray-200">
          <Text className="text-gray-400">Weekly chart coming soon</Text>
        </View>
      </View>
    </ScrollView>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-1 min-w-[140px] bg-white rounded-2xl p-4 border border-gray-200">
      <Text className="text-gray-500 text-sm mb-1">{label}</Text>
      <Text className="text-2xl font-bold text-primary">{value}</Text>
    </View>
  );
}
