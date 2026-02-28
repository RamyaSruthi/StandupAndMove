import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Svg, Circle } from "react-native-svg";
import BuddyCharacter from "@/components/BuddyCharacter";

const DURATION = 60;
const RADIUS = 100;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function TimerScreen() {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(DURATION);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Tick down every second
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

  // Navigate when timer reaches zero (must be outside state setter)
  useEffect(() => {
    if (secondsLeft === 0) {
      router.replace("/complete");
    }
  }, [secondsLeft]);

  const handleFinishEarly = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    router.replace("/complete");
  };

  const handleCancel = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    router.back();
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeLabel = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const progress = secondsLeft / DURATION;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  // Ring colour shifts from purple → teal → pink as time runs out
  const ringColor =
    progress > 0.5 ? "#6C63FF" : progress > 0.25 ? "#43C6AC" : "#FF6584";

  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Text className="text-2xl font-extrabold text-dark mb-10">
        Keep Moving!
      </Text>

      {/* Circular progress ring with Buddy inside */}
      <View style={{ width: 240, height: 240, alignItems: "center", justifyContent: "center", marginBottom: 40 }}>
        <Svg width={240} height={240} style={{ position: "absolute" }}>
          {/* Background ring */}
          <Circle
            cx={120}
            cy={120}
            r={RADIUS}
            fill="none"
            stroke="#EEEEEE"
            strokeWidth={12}
          />
          {/* Progress ring */}
          <Circle
            cx={120}
            cy={120}
            r={RADIUS}
            fill="none"
            stroke={ringColor}
            strokeWidth={12}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            transform={`rotate(-90, 120, 120)`}
          />
        </Svg>

        {/* Buddy + countdown inside ring */}
        <View className="items-center">
          <BuddyCharacter state="happy" size={140} />
          <Text
            className="text-3xl font-extrabold mt-1"
            style={{ color: ringColor }}
          >
            {timeLabel}
          </Text>
        </View>
      </View>

      {/* Finish early */}
      <Pressable
        className="w-full py-4 rounded-2xl items-center mb-3"
        style={{ backgroundColor: "#6C63FF" }}
        onPress={handleFinishEarly}
      >
        <Text className="text-white text-lg font-semibold">Done Early ✓</Text>
      </Pressable>

      {/* Cancel */}
      <Pressable onPress={handleCancel} className="py-2">
        <Text className="text-gray-400 text-sm">Cancel</Text>
      </Pressable>
    </View>
  );
}
