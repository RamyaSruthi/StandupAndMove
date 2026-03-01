import { View, Text, Pressable, Animated, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { useState, useRef } from "react";
import { Svg, Circle } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useStatsStore } from "@/store/useStatsStore";
import { DurationPicker } from "@/components/DurationPicker";
import BuddyCharacter from "@/components/BuddyCharacter";
import type { BuddyState } from "@/components/BuddyCharacter";

const RING_SIZE = 260;
const RADIUS = 115;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function todayKey() {
  return new Date().toISOString().split("T")[0];
}

const STATE_LABEL: Record<BuddyState, string> = {
  happy: "Happy & energetic! 🔥",
  neutral: "Ready to move",
  lazy: "Getting sleepy... 😴",
};

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const buddyName = useSettingsStore((s) => s.buddyName);
  const { dailyLog, stepsLog, pendingReminder, setPendingReminder } = useStatsStore();

  const todayStandups = dailyLog[todayKey()] ?? 0;
  const todaySteps = stepsLog[todayKey()] ?? 0;

  const [showPicker, setShowPicker] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;

  const buddyState: BuddyState =
    todayStandups >= 2 ? "happy" : todayStandups >= 1 ? "neutral" : "lazy";

  const displayState: BuddyState = pendingReminder ? "lazy" : buddyState;
  const moodProgress = Math.min(todayStandups / 3, 1);
  const strokeDashoffset = CIRCUMFERENCE * (1 - moodProgress);

  const handleTap = () => {
    Animated.sequence([
      Animated.spring(scale, { toValue: 1.1, useNativeDriver: true, speed: 50, bounciness: 8 }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 4 }),
    ]).start();
  };

  const handleDurationSelected = (seconds: number) => {
    setPendingReminder(false);
    setShowPicker(false);
    router.push({ pathname: "/timer", params: { duration: String(seconds) } });
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1, backgroundColor: "#6C63FF" }}>

        {/* Greeting */}
        <View style={{ paddingTop: insets.top + 12, paddingHorizontal: 24 }}>
          <Text style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, fontWeight: "600" }}>
            Hey, {buddyName} 👋
          </Text>
        </View>

        {/* Buddy + ring + stats — all on purple */}
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 28 }}>
          {/* Ring + character */}
          <View style={{ width: RING_SIZE, height: RING_SIZE, alignItems: "center", justifyContent: "center" }}>
            <Svg width={RING_SIZE} height={RING_SIZE} style={{ position: "absolute" }}>
              <Circle
                cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RADIUS}
                fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={14}
              />
              <Circle
                cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RADIUS}
                fill="none" stroke="white" strokeWidth={14}
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={strokeDashoffset}
                transform={`rotate(-90, ${RING_SIZE / 2}, ${RING_SIZE / 2})`}
              />
            </Svg>

            <Pressable onPress={handleTap} accessibilityLabel="Tap Buddy">
              <Animated.View style={{ transform: [{ scale }] }}>
                <BuddyCharacter state={displayState} size={200} />
              </Animated.View>
            </Pressable>
          </View>

          {/* Mood label pill */}
          <View style={{
            backgroundColor: pendingReminder ? "rgba(255,101,132,0.85)" : "rgba(255,255,255,0.18)",
            borderRadius: 999, paddingHorizontal: 16, paddingVertical: 6, marginTop: 12,
          }}>
            <Text style={{ color: "white", fontSize: 13, fontWeight: "700" }}>
              {pendingReminder ? "Buddy needs a walk with you! 🐾" : STATE_LABEL[buddyState]}
            </Text>
          </View>

          {/* Steps count */}
          <Text style={{ color: "white", fontSize: 56, fontWeight: "900", marginTop: 20, lineHeight: 60 }}>
            {todaySteps.toLocaleString()}
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, fontWeight: "600", marginTop: 4 }}>
            {todayStandups > 0
              ? `steps across ${todayStandups} move ${todayStandups === 1 ? "session" : "sessions"} today`
              : "Start your first move session!"}
          </Text>
        </View>

        {/* Button */}
        <View style={{ paddingHorizontal: 28, paddingBottom: insets.bottom + 130 }}>
          <Pressable
            onPress={() => setShowPicker(true)}
            style={{
              backgroundColor: "white",
              borderRadius: 18, paddingVertical: 18,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.15,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <Text style={{ color: "#6C63FF", fontSize: 17, fontWeight: "800" }}>I'm Moving! 🏃</Text>
          </Pressable>
        </View>
      </View>

      <DurationPicker
        visible={showPicker}
        onSelect={handleDurationSelected}
        onClose={() => setShowPicker(false)}
      />
    </>
  );
}
