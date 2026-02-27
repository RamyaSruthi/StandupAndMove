import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserSettings {
  buddyName: string;
  reminderInterval: number;   // minutes between reminders
  activeHoursStart: number;   // 0–23
  activeHoursEnd: number;     // 0–23
  activeDays: number[];       // 0=Sun … 6=Sat
  isDndEnabled: boolean;
  hasCompletedOnboarding: boolean;
}

interface SettingsStore extends UserSettings {
  setBuddyName: (name: string) => void;
  setReminderInterval: (interval: number) => void;
  setActiveHours: (start: number, end: number) => void;
  setActiveDays: (days: number[]) => void;
  setDndEnabled: (enabled: boolean) => void;
  setOnboardingComplete: () => void;
  resetSettings: () => void;
}

const defaultSettings: UserSettings = {
  buddyName: "Buddy",
  reminderInterval: 60,
  activeHoursStart: 9,
  activeHoursEnd: 18,
  activeDays: [1, 2, 3, 4, 5],
  isDndEnabled: false,
  hasCompletedOnboarding: false,
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...defaultSettings,
      setBuddyName: (name) => set({ buddyName: name }),
      setReminderInterval: (interval) => set({ reminderInterval: interval }),
      setActiveHours: (start, end) =>
        set({ activeHoursStart: start, activeHoursEnd: end }),
      setActiveDays: (days) => set({ activeDays: days }),
      setDndEnabled: (enabled) => set({ isDndEnabled: enabled }),
      setOnboardingComplete: () => set({ hasCompletedOnboarding: true }),
      resetSettings: () => set(defaultSettings),
    }),
    {
      name: "user-settings",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
