import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  name: string;
  streak: number;
}

export function GreetingHeader({ name, streak }: Props) {
  return (
    <View className="flex-row items-center justify-between px-6 pt-14 pb-2">
      <View>
        <Text className="text-sm text-gray-500 font-medium">Good morning</Text>
        <Text className="text-2xl font-extrabold text-dark tracking-tight">
          Hey, {name}!
        </Text>
      </View>
      <View
        className="flex-row items-center gap-1.5 rounded-full px-3.5 py-2"
        style={{ backgroundColor: "#F0F0F0" }}
      >
        <Ionicons name="flame" size={16} color="#FF6B3D" />
        <Text className="text-sm font-bold text-dark">{streak} days</Text>
      </View>
    </View>
  );
}
