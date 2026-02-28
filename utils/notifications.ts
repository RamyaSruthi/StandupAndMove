import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const MAX_SCHEDULED = 60; // iOS limit is 64, leave buffer

const MESSAGES = [
  "🐕 %s needs a walk! Time to stand up.",
  "Woof! Stand up and stretch with %s 🦴",
  "%s is getting restless... move around! 🐾",
  "Don't let %s get lazy — stand up now! 🏃",
  "Time to move! %s is waiting for you 🐕",
];

function buildMessages(buddyName: string) {
  return MESSAGES.map((m) => m.replace("%s", buddyName));
}

export async function setupNotificationChannel() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("reminders", {
      name: "Movement Reminders",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#6C63FF",
    });
  }
}

export async function requestPermissions(): Promise<boolean> {
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === "granted") return true;
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

export interface ReminderSettings {
  buddyName: string;
  reminderInterval: number; // minutes
  activeHoursStart: number; // 0–23
  activeHoursEnd: number;   // 0–23
  activeDays: number[];     // 0=Sun … 6=Sat
  isDndEnabled: boolean;
}

export async function scheduleReminders(settings: ReminderSettings) {
  // Always cancel existing before rescheduling
  await Notifications.cancelAllScheduledNotificationsAsync();

  if (settings.isDndEnabled) return;

  const {
    buddyName,
    reminderInterval,
    activeHoursStart,
    activeHoursEnd,
    activeDays,
  } = settings;

  const now = new Date();
  const triggerDates: Date[] = [];

  // Build dates for the next 14 days until we hit MAX_SCHEDULED
  for (let day = 0; day < 14 && triggerDates.length < MAX_SCHEDULED; day++) {
    const base = new Date(now);
    base.setDate(base.getDate() + day);

    if (!activeDays.includes(base.getDay())) continue;

    let totalMinutes = activeHoursStart * 60;
    const endMinutes = activeHoursEnd * 60;

    while (totalMinutes < endMinutes && triggerDates.length < MAX_SCHEDULED) {
      const trigger = new Date(base);
      trigger.setHours(
        Math.floor(totalMinutes / 60),
        totalMinutes % 60,
        0,
        0
      );

      if (trigger > now) triggerDates.push(trigger);

      totalMinutes += reminderInterval;
    }
  }

  const messages = buildMessages(buddyName);

  for (let i = 0; i < triggerDates.length; i++) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Time to Move! 🐕",
        body: messages[i % messages.length],
        sound: true,
        data: { screen: "timer" },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: triggerDates[i],
      },
    });
  }
}

export async function cancelAllReminders() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
