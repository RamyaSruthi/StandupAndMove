import { useEffect, useRef } from "react";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
import { setupNotificationChannel } from "@/utils/notifications";
import { useStatsStore } from "@/store/useStatsStore";
import "../global.css";

SplashScreen.preventAutoHideAsync();

// Must be configured before any notification is received
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  const router = useRouter();
  const responseListener = useRef<Notifications.Subscription | null>(null);
  const setPendingReminder = useStatsStore((s) => s.setPendingReminder);

  useEffect(() => {
    SplashScreen.hideAsync();
    setupNotificationChannel();

    // Tapping a notification lands on home with Buddy in "needs walk" state
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(() => {
        setPendingReminder(true);
        router.replace("/(tabs)");
      });

    return () => {
      responseListener.current?.remove();
    };
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen
        name="timer"
        options={{ title: "Time to Move!", presentation: "modal" }}
      />
      <Stack.Screen
        name="complete"
        options={{ title: "Great Job!", presentation: "modal" }}
      />
    </Stack>
  );
}
