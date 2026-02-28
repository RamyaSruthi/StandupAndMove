import { useEffect, useRef } from "react";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
import { setupNotificationChannel } from "@/utils/notifications";
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

  useEffect(() => {
    SplashScreen.hideAsync();
    setupNotificationChannel();

    // Tapping a notification opens the timer directly
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const screen =
          response.notification.request.content.data?.screen;
        if (screen === "timer") {
          router.push("/timer");
        }
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
