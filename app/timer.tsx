import { View, Text, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Svg, Circle } from "react-native-svg";
import { Pedometer } from "expo-sensors";
import BuddyCharacter from "@/components/BuddyCharacter";

const RADIUS = 100;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function TimerScreen() {
  const router = useRouter();
  const { duration } = useLocalSearchParams<{ duration: string }>();
  const DURATION = parseInt(duration ?? "60");

  const [secondsLeft, setSecondsLeft] = useState(DURATION);
  const [sessionSteps, setSessionSteps] = useState(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pedometerRef = useRef<ReturnType<typeof Pedometer.watchStepCount> | null>(null);
  const stepsRef = useRef(0);

  // Countdown ticker
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Navigate when timer hits zero
  useEffect(() => {
    if (secondsLeft === 0) navigate();
  }, [secondsLeft]);

  // Pedometer — update display immediately on every batch
  useEffect(() => {
    Pedometer.isAvailableAsync().then((available) => {
      if (!available) return;
      pedometerRef.current = Pedometer.watchStepCount((result) => {
        stepsRef.current = result.steps;
        setSessionSteps(result.steps);
      });
    });
    return () => { pedometerRef.current?.remove(); };
  }, []);

  const navigate = () => {
    pedometerRef.current?.remove();
    router.replace({
      pathname: "/complete",
      params: { steps: String(stepsRef.current), duration: String(DURATION) },
    });
  };

  const handleFinishEarly = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    navigate();
  };

  const handleCancel = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    pedometerRef.current?.remove();
    router.back();
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeLabel = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const progress = secondsLeft / DURATION;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);
  const ringColor = progress > 0.5 ? "#6C63FF" : progress > 0.25 ? "#43C6AC" : "#FF6584";

  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Text className="text-2xl font-extrabold text-dark mb-10">
        Keep Moving!
      </Text>

      {/* Ring + Buddy */}
      <View style={{ width: 240, height: 240, alignItems: "center", justifyContent: "center", marginBottom: 32 }}>
        <Svg width={240} height={240} style={{ position: "absolute" }}>
          <Circle cx={120} cy={120} r={RADIUS} fill="none" stroke="#EEEEEE" strokeWidth={12} />
          <Circle
            cx={120} cy={120} r={RADIUS}
            fill="none" stroke={ringColor} strokeWidth={12}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            transform={`rotate(-90, 120, 120)`}
          />
        </Svg>
        <View className="items-center">
          <BuddyCharacter state="happy" size={140} />
          <Text className="text-3xl font-extrabold mt-1" style={{ color: ringColor }}>
            {timeLabel}
          </Text>
        </View>
      </View>

      <Pressable
        className="w-full py-4 rounded-2xl items-center mb-3"
        style={{ backgroundColor: "#6C63FF" }}
        onPress={handleFinishEarly}
      >
        <Text className="text-white text-lg font-semibold">Done Early ✓</Text>
      </Pressable>

      <Pressable onPress={handleCancel} className="py-2">
        <Text className="text-gray-400 text-sm">Cancel</Text>
      </Pressable>
    </View>
  );
}
