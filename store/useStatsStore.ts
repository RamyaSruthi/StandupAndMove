import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type DailyLog = Record<string, number>; // "YYYY-MM-DD" → count

interface UserStats {
  currentStreak: number;
  bestStreak: number;
  totalStandups: number;
  totalXP: number;
  lastActiveDate: string | null;
  dailyLog: DailyLog;
  stepsLog: DailyLog; // "YYYY-MM-DD" → steps from app sessions
}

interface StatsStore extends UserStats {
  pendingReminder: boolean;
  setPendingReminder: (val: boolean) => void;
  recordStandup: () => void;
  addSessionSteps: (steps: number) => void;
  addXP: (amount: number) => void;
  resetStats: () => void;
}

const XP_PER_STANDUP = 10;

const defaultStats: UserStats = {
  currentStreak: 0,
  bestStreak: 0,
  totalStandups: 0,
  totalXP: 0,
  lastActiveDate: null,
  dailyLog: {},
  stepsLog: {},
};

function todayKey(): string {
  return new Date().toISOString().split("T")[0];
}

function isYesterday(dateStr: string): boolean {
  const today = new Date();
  const last = new Date(dateStr);
  const diffDays = Math.floor(
    (today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diffDays === 1;
}

export const useStatsStore = create<StatsStore>()(
  persist(
    (set, get) => ({
      ...defaultStats,
      pendingReminder: false,
      setPendingReminder: (val) => set({ pendingReminder: val }),

      recordStandup: () => {
        const state = get();
        const today = todayKey();
        const dailyLog = {
          ...state.dailyLog,
          [today]: (state.dailyLog[today] ?? 0) + 1,
        };

        let currentStreak = state.currentStreak;
        if (state.lastActiveDate === today) {
          // Already active today — streak unchanged
        } else if (state.lastActiveDate && isYesterday(state.lastActiveDate)) {
          currentStreak += 1;
        } else {
          currentStreak = 1;
        }

        const bestStreak = Math.max(currentStreak, state.bestStreak);

        set({
          dailyLog,
          lastActiveDate: today,
          currentStreak,
          bestStreak,
          totalStandups: state.totalStandups + 1,
          totalXP: state.totalXP + XP_PER_STANDUP,
        });
      },

      addSessionSteps: (steps: number) => {
        if (steps <= 0) return;
        const today = todayKey();
        set((state) => ({
          stepsLog: {
            ...state.stepsLog,
            [today]: (state.stepsLog[today] ?? 0) + steps,
          },
        }));
      },

      addXP: (amount) =>
        set((state) => ({ totalXP: state.totalXP + amount })),

      resetStats: () => set(defaultStats),
    }),
    {
      name: "user-stats",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
