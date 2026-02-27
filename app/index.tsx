import { Redirect } from "expo-router";
import { useSettingsStore } from "@/store/useSettingsStore";

export default function Index() {
  const hasCompletedOnboarding = useSettingsStore(
    (s) => s.hasCompletedOnboarding
  );

  if (!hasCompletedOnboarding) {
    return <Redirect href="/onboarding/welcome" />;
  }

  return <Redirect href="/(tabs)" />;
}
