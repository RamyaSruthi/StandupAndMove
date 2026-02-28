import { ScrollView, View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import { useStatsStore } from "@/store/useStatsStore";

const SCREEN_WIDTH = Dimensions.get("window").width;
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getLast7Days(dailyLog: Record<string, number>) {
  const labels: string[] = [];
  const data: number[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    labels.push(DAY_LABELS[d.getDay()]);
    data.push(dailyLog[d.toISOString().split("T")[0]] ?? 0);
  }
  return { labels, data };
}

export default function StatsScreen() {
  const { currentStreak, bestStreak, totalStandups, totalXP, dailyLog } =
    useStatsStore();

  const { labels, data } = getLast7Days(dailyLog);
  const weekTotal = data.reduce((sum, v) => sum + v, 0);
  const todayCount = data[data.length - 1];
  const hasData = data.some((v) => v > 0);

  return (
    <ScrollView
      className="flex-1 bg-background"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <View className="px-6 pt-16">
        <Text className="text-2xl font-extrabold text-dark mb-6">
          Your Stats
        </Text>

        {/* Stat cards — 2×2 grid */}
        <View className="flex-row gap-3 mb-3">
          <StatCard
            icon="flame"
            iconColor="#FF6B3D"
            label="Current Streak"
            value={String(currentStreak)}
            unit="days"
          />
          <StatCard
            icon="trophy"
            iconColor="#FFB347"
            label="Best Streak"
            value={String(bestStreak)}
            unit="days"
          />
        </View>
        <View className="flex-row gap-3 mb-6">
          <StatCard
            icon="fitness"
            iconColor="#6C63FF"
            label="Total Stand-ups"
            value={String(totalStandups)}
            unit="total"
          />
          <StatCard
            icon="flash"
            iconColor="#43C6AC"
            label="Total XP"
            value={String(totalXP)}
            unit="xp"
          />
        </View>

        {/* Weekly bar chart */}
        <View
          className="bg-white rounded-2xl p-4 mb-4"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 6,
            elevation: 2,
          }}
        >
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-base font-bold text-dark">This Week</Text>
            <Text
              className="text-sm font-semibold"
              style={{ color: "#6C63FF" }}
            >
              {weekTotal} stand-ups
            </Text>
          </View>

          {hasData ? (
            <BarChart
              data={{ labels, datasets: [{ data }] }}
              width={SCREEN_WIDTH - 80}
              height={160}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={{
                backgroundColor: "#FFFFFF",
                backgroundGradientFrom: "#FFFFFF",
                backgroundGradientTo: "#FFFFFF",
                decimalPlaces: 0,
                color: (opacity = 1) =>
                  `rgba(108, 99, 255, ${opacity})`,
                labelColor: () => "#9E9E9E",
                barPercentage: 0.55,
                propsForBackgroundLines: {
                  stroke: "#F5F5F5",
                  strokeDasharray: "",
                },
              }}
              style={{ borderRadius: 8, marginLeft: -16 }}
              showValuesOnTopOfBars
              fromZero
              withInnerLines
            />
          ) : (
            <View className="h-40 items-center justify-center">
              <Ionicons name="bar-chart-outline" size={40} color="#BDBDBD" />
              <Text className="text-gray-400 text-sm mt-2">
                Complete your first stand-up to see data
              </Text>
            </View>
          )}
        </View>

        {/* Today summary */}
        <View
          className="bg-white rounded-2xl p-4"
          style={{ borderWidth: 1, borderColor: "#EEEEEE" }}
        >
          <Text className="text-base font-bold text-dark mb-3">Today</Text>
          <View className="flex-row items-center gap-4">
            <View
              className="w-14 h-14 rounded-full items-center justify-center"
              style={{ backgroundColor: "rgba(108, 99, 255, 0.1)" }}
            >
              <Ionicons name="walk" size={26} color="#6C63FF" />
            </View>
            <View>
              <Text className="text-3xl font-extrabold text-dark">
                {todayCount}
              </Text>
              <Text className="text-sm text-gray-500">
                stand-ups completed today
              </Text>
            </View>
            {todayCount > 0 && (
              <View
                className="ml-auto rounded-full px-3 py-1"
                style={{ backgroundColor: "rgba(67, 198, 172, 0.15)" }}
              >
                <Text
                  className="text-xs font-bold"
                  style={{ color: "#43C6AC" }}
                >
                  +{todayCount * 10} XP
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

interface StatCardProps {
  icon: string;
  iconColor: string;
  label: string;
  value: string;
  unit: string;
}

function StatCard({ icon, iconColor, label, value, unit }: StatCardProps) {
  return (
    <View
      className="flex-1 bg-white rounded-2xl p-4"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      <View
        className="w-8 h-8 rounded-full items-center justify-center mb-2"
        style={{ backgroundColor: `${iconColor}20` }}
      >
        <Ionicons name={icon as any} size={16} color={iconColor} />
      </View>
      <Text className="text-2xl font-extrabold text-dark">{value}</Text>
      <Text className="text-xs text-gray-500 mt-0.5">{unit}</Text>
      <Text className="text-xs text-gray-400 mt-1">{label}</Text>
    </View>
  );
}
