import { View, Text, ScrollView, Switch, Pressable, Alert } from "react-native";
import { useSettingsStore } from "@/store/useSettingsStore";
import { scheduleReminders, cancelAllReminders } from "@/utils/notifications";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
  const {
    buddyName,
    reminderInterval,
    activeHoursStart,
    activeHoursEnd,
    activeDays,
    isDndEnabled,
    setDndEnabled,
  } = useSettingsStore();

  const handleDndToggle = async (enabled: boolean) => {
    setDndEnabled(enabled);
    if (enabled) {
      await cancelAllReminders();
    } else {
      await scheduleReminders({
        buddyName,
        reminderInterval,
        activeHoursStart,
        activeHoursEnd,
        activeDays,
        isDndEnabled: false,
      });
    }
  };

  const handleReschedule = async () => {
    await scheduleReminders({
      buddyName,
      reminderInterval,
      activeHoursStart,
      activeHoursEnd,
      activeDays,
      isDndEnabled,
    });
    Alert.alert("Done!", "Reminders have been rescheduled.");
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6 pt-16">
        <Text className="text-2xl font-bold text-dark mb-6">Settings</Text>

        {/* Info rows */}
        <View
          className="bg-white rounded-2xl overflow-hidden mb-4"
          style={{ borderWidth: 1, borderColor: "#EEEEEE" }}
        >
          <SettingsRow label="Buddy's Name" value={buddyName} />
          <SettingsRow
            label="Reminder Every"
            value={`${reminderInterval} min`}
          />
          <SettingsRow
            label="Active Hours"
            value={`${activeHoursStart}:00 – ${activeHoursEnd}:00`}
          />
          <View className="flex-row items-center justify-between px-4 py-3.5 border-t border-gray-100">
            <View className="flex-row items-center gap-2">
              <Ionicons name="moon" size={16} color="#6C63FF" />
              <Text className="text-dark font-medium">Do Not Disturb</Text>
            </View>
            <Switch
              value={isDndEnabled}
              onValueChange={handleDndToggle}
              trackColor={{ true: "#6C63FF" }}
            />
          </View>
        </View>

        {/* Reschedule button */}
        <Pressable
          className="bg-white rounded-2xl px-4 py-4 flex-row items-center justify-between"
          style={{ borderWidth: 1, borderColor: "#EEEEEE" }}
          onPress={handleReschedule}
        >
          <View className="flex-row items-center gap-2">
            <Ionicons name="notifications" size={16} color="#6C63FF" />
            <Text className="text-dark font-medium">Reschedule Reminders</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#BDBDBD" />
        </Pressable>
      </View>
    </ScrollView>
  );
}

function SettingsRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between px-4 py-3.5 border-b border-gray-100">
      <Text className="text-dark font-medium">{label}</Text>
      <Text className="text-gray-500">{value}</Text>
    </View>
  );
}
