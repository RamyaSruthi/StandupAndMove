import { useState, useEffect, useRef } from "react";
import { Pedometer } from "expo-sensors";

export function useDailySteps() {
  const [steps, setSteps] = useState(0);
  const [available, setAvailable] = useState(false);
  const baseSteps = useRef(0);

  useEffect(() => {
    let subscription: ReturnType<typeof Pedometer.watchStepCount> | null = null;

    const init = async () => {
      const isAvailable = await Pedometer.isAvailableAsync();
      if (!isAvailable) return;

      setAvailable(true);

      // Steps from midnight until now
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const { steps: todaySteps } = await Pedometer.getStepCountAsync(
        startOfDay,
        new Date()
      );
      baseSteps.current = todaySteps;
      setSteps(todaySteps);

      // Add new steps as they come in
      subscription = Pedometer.watchStepCount((result) => {
        setSteps(baseSteps.current + result.steps);
      });
    };

    init();

    return () => {
      subscription?.remove();
    };
  }, []);

  return { steps, available };
}
