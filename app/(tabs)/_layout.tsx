import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const BASE_TAB_STYLE = {
  borderTopWidth: 0,
  elevation: 0,
  shadowOpacity: 0,
};

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "rgba(255,255,255,0.45)",
          tabBarStyle: { ...BASE_TAB_STYLE, backgroundColor: "transparent", position: "absolute" },
          tabBarLabelStyle: { fontSize: 11, fontWeight: "600", marginBottom: 4 },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
          tabBarActiveTintColor: "#6C63FF",
          tabBarInactiveTintColor: "#BBBBBB",
          tabBarStyle: { ...BASE_TAB_STYLE, backgroundColor: "#F8F7FF" },
          tabBarLabelStyle: { fontSize: 11, fontWeight: "600", marginBottom: 4 },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "bar-chart" : "bar-chart-outline"} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarActiveTintColor: "#6C63FF",
          tabBarInactiveTintColor: "#BBBBBB",
          tabBarStyle: { ...BASE_TAB_STYLE, backgroundColor: "#F8F7FF" },
          tabBarLabelStyle: { fontSize: 11, fontWeight: "600", marginBottom: 4 },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "settings" : "settings-outline"} size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
