import {
  View,
  Text,
  Pressable,
  Modal,
  Animated,
} from "react-native";
import { useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";

const DURATIONS = [
  { label: "1 min", seconds: 60, description: "Quick stretch", icon: "body" },
  { label: "3 min", seconds: 180, description: "Short walk", icon: "walk" },
  { label: "5 min", seconds: 300, description: "Active break", icon: "bicycle" },
] as const;

interface Props {
  visible: boolean;
  onSelect: (seconds: number) => void;
  onClose: () => void;
}

export function DurationPicker({ visible, onSelect, onClose }: Props) {
  const slideAnim = useRef(new Animated.Value(400)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: visible ? 0 : 400,
      useNativeDriver: true,
      bounciness: 5,
      speed: 16,
    }).start();
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={{ flex: 1 }}>
        {/* Dimmed backdrop */}
        <Pressable
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.45)" }}
          onPress={onClose}
        />

        {/* Bottom sheet */}
        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
            backgroundColor: "#FFFFFF",
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            padding: 24,
            paddingBottom: 44,
          }}
        >
          {/* Handle bar */}
          <View
            style={{
              width: 40,
              height: 4,
              backgroundColor: "#E0E0E0",
              borderRadius: 2,
              alignSelf: "center",
              marginBottom: 20,
            }}
          />

          <Text
            style={{
              fontSize: 20,
              fontWeight: "800",
              color: "#2D2D2D",
              marginBottom: 4,
            }}
          >
            How long do you want to move?
          </Text>
          <Text
            style={{ fontSize: 14, color: "#9E9E9E", marginBottom: 20 }}
          >
            Choose a duration for your movement break
          </Text>

          {DURATIONS.map((d) => (
            <Pressable
              key={d.seconds}
              onPress={() => onSelect(d.seconds)}
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: pressed ? "#F5F4FF" : "#FAFAFA",
                borderRadius: 16,
                padding: 16,
                marginBottom: 10,
                borderWidth: 1.5,
                borderColor: pressed ? "#6C63FF" : "#EEEEEE",
              })}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: "rgba(108,99,255,0.1)",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name={d.icon as any} size={22} color="#6C63FF" />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "700",
                      color: "#2D2D2D",
                    }}
                  >
                    {d.label}
                  </Text>
                  <Text style={{ fontSize: 13, color: "#9E9E9E", marginTop: 1 }}>
                    {d.description}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: "#6C63FF",
                  borderRadius: 20,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                }}
              >
                <Text style={{ color: "white", fontWeight: "700", fontSize: 13 }}>
                  Start
                </Text>
              </View>
            </Pressable>
          ))}
        </Animated.View>
      </View>
    </Modal>
  );
}
