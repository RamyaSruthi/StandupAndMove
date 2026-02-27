import { View, Text, Pressable, Animated } from "react-native";
import { useRef, useState, useMemo, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

const CONFETTI_COLORS = ["#6C63FF", "#43C6AC", "#FFB347", "#FF6B6B", "#A78BFA"];

interface ConfettiParticleProps {
  color: string;
  delay: number;
}

function ConfettiParticle({ color, delay }: ConfettiParticleProps) {
  const translateY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const targetX = (Math.random() - 0.5) * 120;
    const targetY = -(40 + Math.random() * 60);

    Animated.parallel([
      Animated.timing(translateX, {
        toValue: targetX,
        duration: 900,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: targetY,
        duration: 900,
        delay,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.delay(delay + 400),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        position: "absolute",
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: color,
        transform: [{ translateX }, { translateY }],
        opacity,
      }}
    />
  );
}

interface Props {
  onPress: () => void;
}

export function MovingButton({ onPress }: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const [confettiKey, setConfettiKey] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const confettiItems = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        delay: i * 60,
      })),
    [confettiKey]
  );

  const handlePress = () => {
    // Scale animation
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    // Confetti burst
    setConfettiKey((k) => k + 1);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1500);

    onPress();
  };

  return (
    <View className="px-6 pb-10 pt-2" style={{ alignItems: "center" }}>
      {/* Confetti layer */}
      {showConfetti && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          {confettiItems.map((item, i) => (
            <ConfettiParticle key={`${confettiKey}-${i}`} {...item} />
          ))}
        </View>
      )}

      <Animated.View style={{ transform: [{ scale }], width: "100%" }}>
        <Pressable
          onPress={handlePress}
          className="w-full py-4 rounded-2xl items-center justify-center flex-row gap-2"
          style={{
            backgroundColor: "#6C63FF",
            shadowColor: "#6C63FF",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.35,
            shadowRadius: 16,
            elevation: 8,
          }}
        >
          <Ionicons name="fitness" size={20} color="white" />
          <Text className="text-lg font-extrabold text-white">I'm Moving!</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}
