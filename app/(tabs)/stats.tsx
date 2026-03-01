import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { useStatsStore } from "@/store/useStatsStore";

const BAR_MAX_HEIGHT = 100;
const BAR_MIN_HEIGHT = 4;

const HEALTH_FACTS = [
  "Standing for 3 hours a day burns over 30,000 extra calories a year.",
  "Taking short walks every hour can reduce back pain by up to 32%.",
  "Just 2 minutes of walking per hour significantly reduces the risks of prolonged sitting.",
  "Regular movement breaks can improve focus and productivity by up to 40%.",
  "Standing up every 30 minutes helps lower blood sugar spikes after meals.",
  "People who sit less than 3 hours a day live up to 2 years longer on average.",
  "A 5-minute walk every hour can offset many health risks of sitting all day.",
  "Walking 100 steps per minute is considered moderate-intensity exercise.",
  "Movement breaks reduce eye strain and mental fatigue from screen time.",
  "Even light movement every hour improves circulation and reduces stiffness.",
  "Sitting for long periods slows your metabolism by up to 90%.",
  "Walking boosts creative thinking by an average of 81%, according to Stanford research.",
  "Your body burns more calories digesting food when you stand vs. sit.",
  "Standing activates over 200 muscles compared to sitting.",
  "Regular walking reduces the risk of heart disease by up to 35%.",
  "People who walk regularly sleep an average of 15 minutes more per night.",
  "A 10-minute walk can boost your mood for up to 2 hours.",
  "Prolonged sitting increases your risk of type 2 diabetes by 112%.",
  "Walking 30 minutes a day reduces depression risk by 36%.",
  "Standing burns about 50 more calories per hour than sitting.",
  "Regular movement breaks improve memory and concentration.",
  "Sitting for 6+ hours a day increases anxiety risk by 21%.",
  "Walking strengthens bones and reduces the risk of osteoporosis.",
  "Just 15 minutes of walking after a meal can lower blood sugar by 22%.",
  "People with active jobs have a 30% lower risk of early death.",
  "Short movement breaks reduce feelings of fatigue by up to 65%.",
  "Walking increases blood flow to the brain, sharpening focus within minutes.",
  "Prolonged sitting increases lower back pain risk by over 60%.",
  "A brisk 5-minute walk can lower blood pressure immediately.",
  "Standing desks users report 54% less upper back and neck pain.",
  "Walking in nature reduces cortisol (stress hormone) levels by 16%.",
  "Regular walkers have a 20% lower risk of colon cancer.",
  "Micro-movement breaks every 30 minutes prevent glucose spikes after meals.",
  "The human body has 360 joints — most need movement to stay lubricated.",
  "Sitting compresses spinal discs 40% more than standing.",
  "Walking meetings are 5.3x more likely to produce creative ideas.",
  "People who move regularly have stronger immune systems.",
  "Even 1 minute of movement per hour reduces cardiovascular risk markers.",
  "Regular walking reduces the need for blood pressure medication.",
  "Standing up after long periods reduces blood pooling in the legs.",
  "Movement breaks improve insulin sensitivity throughout the day.",
  "People who walk regularly have larger hippocampi — better memory.",
  "Walking 10,000 steps burns roughly 400–500 calories.",
  "Sitting increases pressure on the lumbar spine by 40% vs. standing.",
  "Regular walkers have a 50% lower risk of Alzheimer's disease.",
  "Short walks improve attention span better than caffeine in some studies.",
  "The average person sits for 10+ hours a day.",
  "Standing reduces the risk of weight gain by keeping metabolism active.",
  "Regular movement keeps cartilage healthy by pumping nutrients into joints.",
  "Walking improves posture by strengthening the core and back muscles.",
  "People who sit less report higher overall life satisfaction.",
  "A 2-minute walk every 20 minutes counters the effects of 8 hours of sitting.",
  "Walking reduces stress hormones adrenaline and cortisol.",
  "Leg muscles are your body's largest — keeping them active matters most.",
  "Movement stimulates the release of BDNF, a brain growth protein.",
  "People who stand more have lower triglyceride levels.",
  "Short movement breaks reduce the risk of deep vein thrombosis (DVT).",
  "Standing after meals helps your digestive system process food faster.",
  "Walking at a moderate pace for 30 min burns as many calories as jogging for 15 min.",
  "Regular walkers have a 30% lower risk of stroke.",
  "Movement breaks help regulate circadian rhythms and improve sleep quality.",
  "Prolonged sitting reduces the electrical activity in leg muscles almost entirely.",
  "Walking activates the parasympathetic nervous system, reducing anxiety.",
  "Desk workers who move regularly report 33% less neck tension.",
  "Even a slow 20-minute walk a day adds years to your life expectancy.",
  "Movement breaks every hour improve afternoon energy levels significantly.",
  "Regular walkers spend fewer days sick than sedentary people.",
  "Standing up improves venous return — blood flows back to your heart faster.",
  "Walking after meals reduces postprandial fat storage.",
  "People who walk regularly have lower resting heart rates.",
  "Short movement breaks prevent the mid-afternoon productivity slump.",
  "Walking improves gut motility and reduces bloating.",
  "The WHO recommends breaking sitting time every 30 minutes.",
  "Regular movement keeps tendons and ligaments flexible and strong.",
  "Walking barefoot stimulates thousands of nerve endings in your feet.",
  "Standing up activates your glutes, which are often 'switched off' by sitting.",
  "Movement breaks reduce the risk of metabolic syndrome by 35%.",
  "People who walk in the morning report higher energy all day.",
  "Walking improves lymphatic drainage, helping remove toxins from the body.",
  "A standing break every hour reduces eye fatigue from screens.",
  "Regular movement reduces chronic inflammation throughout the body.",
  "Walking improves balance and reduces fall risk as we age.",
  "Standing activates postural muscles that protect your spine.",
  "People with active routines report higher self-esteem and confidence.",
  "Short walks increase serotonin levels, improving mood naturally.",
  "Moving regularly prevents the stiffening of arteries.",
  "Walking for 20 minutes can reduce food cravings significantly.",
  "Regular movement breaks help prevent repetitive strain injuries.",
  "Standing improves core muscle activation by 30% vs. sitting.",
  "Walking releases endorphins — the same chemicals triggered by laughter.",
  "People who move frequently have better skin circulation and complexion.",
  "Short movement breaks reset your focus and reduce mental errors.",
  "Walking outside for 5 minutes boosts mood more than walking indoors.",
  "Regular movers have a significantly lower risk of gallstones.",
  "Sitting after eating slows digestion and increases reflux risk.",
  "A short walk before bed improves sleep onset time.",
  "Movement throughout the day prevents the buildup of lactic acid.",
  "People who take regular breaks are more productive overall than those who don't.",
  "Walking 15 minutes after each meal is as effective as a 45-minute walk once a day.",
  "Regular movement keeps your mitochondria — the cell's energy factories — active.",
  "Standing up tall improves confidence and reduces stress almost immediately.",
];

function getWeekDays(dailyLog: Record<string, number>, weekOffset: number) {
  const LABELS = ["S", "M", "T", "W", "T", "F", "S"];
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i) - weekOffset * 7);
    const key = d.toISOString().split("T")[0];
    return {
      label: LABELS[d.getDay()],
      count: dailyLog[key] ?? 0,
      isToday: i === 6 && weekOffset === 0,
    };
  });
}

function getWeekLabel(weekOffset: number) {
  if (weekOffset === 0) return "This Week";
  if (weekOffset === 1) return "Last Week";
  const start = new Date();
  start.setDate(start.getDate() - 6 - weekOffset * 7);
  const end = new Date();
  end.setDate(end.getDate() - weekOffset * 7);
  const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${fmt(start)} – ${fmt(end)}`;
}

function WeeklyChart({ days }: { days: ReturnType<typeof getWeekDays> }) {
  const maxCount = Math.max(...days.map((d) => d.count), 1);

  return (
    <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" }}>
      {days.map((day, i) => {
        const barHeight =
          day.count === 0
            ? BAR_MIN_HEIGHT
            : BAR_MIN_HEIGHT + (day.count / maxCount) * (BAR_MAX_HEIGHT - BAR_MIN_HEIGHT);

        return (
          <View key={i} style={{ alignItems: "center" }}>
            <Text style={{
              color: day.count > 0 ? "white" : "transparent",
              fontSize: 12, fontWeight: "700", marginBottom: 4,
            }}>
              {day.count}
            </Text>
            <View style={{
              height: barHeight,
              width: 30,
              borderRadius: 6,
              backgroundColor: day.isToday
                ? "white"
                : day.count > 0
                  ? "rgba(255,255,255,0.65)"
                  : "rgba(255,255,255,0.15)",
            }} />
            <Text style={{
              color: day.isToday ? "white" : "rgba(255,255,255,0.5)",
              fontSize: 12,
              fontWeight: day.isToday ? "800" : "500",
              marginTop: 8,
            }}>
              {day.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

export default function StatsScreen() {
  const insets = useSafeAreaInsets();
  const { totalStandups, dailyLog, stepsLog } = useStatsStore();
  const [weekOffset, setWeekOffset] = useState(0);
  const [healthFact, setHealthFact] = useState(
    () => HEALTH_FACTS[Math.floor(Math.random() * HEALTH_FACTS.length)]
  );

  useFocusEffect(
    useCallback(() => {
      setHealthFact(HEALTH_FACTS[Math.floor(Math.random() * HEALTH_FACTS.length)]);
    }, [])
  );

  const days = getWeekDays(dailyLog, weekOffset);
  const weekSessions = days.reduce((sum, d) => sum + d.count, 0);
  const totalStepsAllTime = Object.values(stepsLog).reduce((a, b) => a + b, 0);

  return (
    <View style={{ flex: 1, backgroundColor: "#6C63FF" }}>

      {/* Header */}
      <View style={{ paddingTop: insets.top + 16, paddingHorizontal: 28 }}>
        <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: "600" }}>
          Your Progress
        </Text>
      </View>

      {/* Chart section */}
      <View style={{ flex: 1, paddingHorizontal: 28, justifyContent: "center" }}>

        {/* Sessions count + week navigator — vertically centered */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 36 }}>
          <View>
            <Text style={{ color: "white", fontSize: 32, fontWeight: "900", lineHeight: 36 }}>
              {weekSessions}
            </Text>
            <Text style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, fontWeight: "600", marginTop: 4 }}>
              sessions
            </Text>
          </View>

          {/* Week picker */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Pressable
              onPress={() => setWeekOffset((w) => w + 1)}
              style={{
                width: 32, height: 32, borderRadius: 16,
                backgroundColor: "rgba(255,255,255,0.18)",
                alignItems: "center", justifyContent: "center",
              }}
            >
              <Ionicons name="chevron-back" size={16} color="white" />
            </Pressable>

            <Text style={{ color: "white", fontSize: 13, fontWeight: "700", minWidth: 80, textAlign: "center" }}>
              {getWeekLabel(weekOffset)}
            </Text>

            <Pressable
              onPress={() => setWeekOffset((w) => Math.max(0, w - 1))}
              disabled={weekOffset === 0}
              style={{
                width: 32, height: 32, borderRadius: 16,
                backgroundColor: weekOffset === 0 ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.18)",
                alignItems: "center", justifyContent: "center",
              }}
            >
              <Ionicons name="chevron-forward" size={16} color={weekOffset === 0 ? "rgba(255,255,255,0.3)" : "white"} />
            </Pressable>
          </View>
        </View>

        <WeeklyChart days={days} />
      </View>

      {/* White bottom */}
      <View style={{
        backgroundColor: "#F8F7FF",
        borderTopLeftRadius: 32, borderTopRightRadius: 32,
        paddingHorizontal: 20, paddingTop: 24,
        paddingBottom: insets.bottom + 16,
        gap: 12,
      }}>
        {/* Lifetime stats */}
        <View style={{ flexDirection: "row", gap: 12 }}>
          <StatBlock
            value={String(totalStandups)}
            label="Lifetime Sessions"
            icon="walk"
            color="#6C63FF"
          />
          <StatBlock
            value={totalStepsAllTime.toLocaleString()}
            label="Lifetime Steps"
            icon="footsteps"
            color="#43C6AC"
          />
        </View>

        {/* Health fact */}
        <View style={{
          backgroundColor: "white", borderRadius: 16,
          paddingHorizontal: 16, paddingVertical: 14,
          flexDirection: "row", alignItems: "flex-start", gap: 12,
          shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
        }}>
          <View style={{
            width: 32, height: 32, borderRadius: 10,
            backgroundColor: "rgba(255,183,71,0.12)",
            alignItems: "center", justifyContent: "center", marginTop: 1,
          }}>
            <Ionicons name="bulb-outline" size={17} color="#FFB347" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 11, fontWeight: "700", color: "#FFB347", marginBottom: 4, letterSpacing: 0.5 }}>
              DID YOU KNOW
            </Text>
            <Text style={{ fontSize: 13, color: "#555", fontWeight: "500", lineHeight: 19 }}>
              {healthFact}
            </Text>
          </View>
        </View>
      </View>

    </View>
  );
}

function StatBlock({ value, label, icon, color }: {
  value: string; label: string; icon: string; color: string;
}) {
  return (
    <View style={{
      flex: 1, backgroundColor: "white", borderRadius: 16,
      paddingHorizontal: 16, paddingVertical: 16,
      shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
    }}>
      <Ionicons name={icon as any} size={18} color={color} />
      <Text style={{ fontSize: 26, fontWeight: "900", color: "#2D2D2D", marginTop: 8, lineHeight: 30 }}>
        {value}
      </Text>
      <Text style={{ fontSize: 12, color: "#999", fontWeight: "600", marginTop: 3 }}>
        {label}
      </Text>
    </View>
  );
}
