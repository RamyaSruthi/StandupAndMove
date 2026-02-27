# Buddy App — Claude Context

## App Overview
Buddy is a movement reminder app for iOS & Android (React Native + Expo).
The emotional core is a dog character whose mood reflects the user's movement habits.
When the user stands up and moves, Buddy becomes happy and energetic.
When reminders are ignored, Buddy gets sad and lazy.

## Tech Stack
- Framework: React Native + Expo SDK 52
- Navigation: Expo Router (file-based routing)
- Animations: lottie-react-native (for Buddy character states)
- State Management: Zustand (useSettingsStore, useStatsStore)
- Storage: AsyncStorage + MMKV
- Notifications: Expo Notifications (local only, no backend needed)
- Styling: NativeWind (Tailwind for React Native)
- Charts: react-native-chart-kit (for stats screen)

## Design Tokens
- Primary: #6C63FF (purple)
- Secondary: #FF6584 (pink)
- Accent: #43C6AC (teal)
- Dark: #2D2D2D
- Background: #F8F7FF

## Buddy Character States
- happy → user just completed a movement session
- neutral → app opened, no pending reminders
- lazy → reminder(s) missed
Lottie animation files live in /assets/animations/

## Screens
1. Onboarding: Welcome → Name Buddy → Set Schedule
2. Home (main screen): Buddy character + health bar + streak + "I'm Moving!" button
3. Move Timer: 60 second countdown with Buddy animation
4. Move Complete: Reward screen with XP and streak update
5. Settings: Edit reminder interval, active hours, days, DND toggle
6. Stats: Weekly bar chart, streaks, total standups, total XP

## Data Models
UserSettings: buddyName, reminderInterval, activeHoursStart, activeHoursEnd, activeDays, isDndEnabled
UserStats: currentStreak, bestStreak, totalStandups, totalXP, lastActiveDate, dailyLog

## Build Phases
- Phase 1: Project setup + navigation + stores
- Phase 2: Navigation skeleton + all screen routes
- Phase 3: Home screen + Buddy character component
- Phase 4: Movement flow (Timer → Complete)
- Phase 5: Push notifications
- Phase 6: Onboarding screens
- Phase 7: Stats + Settings screens
- Phase 8: Polish + streak logic + testing