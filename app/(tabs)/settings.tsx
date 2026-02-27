import { View, Text, ScrollView, Switch, Pressable } from "react-native";
import { useSettingsStore } from "@/store/useSettingsStore";

export default function SettingsScreen() {
  const {
    buddyName,
    reminderInterval,
    activeHoursStart,
    activeHoursEnd,
    isDndEnabled,
    setDndEnabled,
  } = useSettingsStore();

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6 pt-16">
        <Text className="text-2xl font-bold text-dark mb-6">Settings</Text>

        <View className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <SettingsRow label="Buddy's Name" value={buddyName} />
          <SettingsRow label="Reminder Every" value={`${reminderInterval} min`} />
          <SettingsRow
            label="Active Hours"
            value={`${activeHoursStart}:00 – ${activeHoursEnd}:00`}
          />
          <View className="flex-row items-center justify-between px-4 py-3 border-t border-gray-100">
            <Text className="text-dark">Do Not Disturb</Text>
            <Switch
              value={isDndEnabled}
              onValueChange={setDndEnabled}
              trackColor={{ true: "#6C63FF" }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function SettingsRow({ label, value }: { label: string; value: string }) {
  return (
    <Pressable className="flex-row items-center justify-between px-4 py-3 border-t border-gray-100 first:border-t-0">
      <Text className="text-dark">{label}</Text>
      <Text className="text-gray-500">{value}</Text>
    </Pressable>
  );
}
