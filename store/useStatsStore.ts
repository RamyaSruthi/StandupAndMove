import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type DailyLog = Record<string, number>; // "YYYY-MM-DD" → standup count

interface UserStats {
  currentStreak: number;
  bestStreak: number;
  totalStandups: number;
  totalXP: number;
  lastActiveDate: string | null;
  dailyLog: DailyLog;
}

interface StatsStore extends UserStats {
  recordStandup: () => void;
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

      recordStandup: () => {
        const state = get();
        const today = todayKey();
        const dailyLog = { ...state.dailyLog, [today]: (state.dailyLog[today] ?? 0) + 1 };

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
