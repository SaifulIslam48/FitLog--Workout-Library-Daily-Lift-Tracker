#  FitLog — Workout Library & Daily Lift Tracker

## 📖 Short Description
**FitLog** is a dark, no-nonsense gym companion web application designed to help athletes train with intent and log every set. Users can browse a curated library of twelve foundational compound and isolation lifts covering every major muscle group, inspect detailed form instructions and key specs, build their daily workout plan, bookmark exercises for later, and track their total exercises, minutes, and calories burned in real time.

---

## 🛠️ Technologies Used
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Markup & Styling:** HTML5 & Tailwind CSS
- **Typography:** Google Fonts (`Oswald` for display headings & `Inter` for body text)
- **State Management & Persistence:** React Context API (`useContext`, `useState`, `useEffect`) + Browser `localStorage`
- **API Integration:** FitLog REST API (`https://api.abcz.workers.dev/api/fitlog`)

---

## ✨ 5 Key Features of the Project

1. **Dynamic 3x4 Workout Library Grid:** Fetches all 12 foundational workouts directly from the FitLog API with a custom loading spinner animation, displaying each lift's illustration, muscle category pills, equipment needed, duration, calories burned, and rating in a fully responsive layout.
2. **Comprehensive Two-Column Workout Detail Page:** Provides an in-depth view for every exercise featuring a high-resolution visual, muscle group tags, a 7-row **Key Specs** table (`Equipment`, `Difficulty`, `Sets`, `Reps`, `Duration`, `Calories`, `Rating`), and a 4-step ordered **Instructions** guide.
3. **Interactive Plan & Saved Management with Live Navbar Counters:** Allows users to lock exercises into **Today's Plan** or bookmark them to **Saved** for later, dynamically updating the `Plan` and `Saved` status badge counters in the navbar and persisting all data in `localStorage` across page reloads.
4. **Real-Time Workout Metrics & Dynamic Sorting:** Automatically calculates and updates total **Exercises**, **Minutes**, and **Calories** on the `/my-plan` page, and includes a **Sort By** dropdown (`Duration`, `Calories`, `Rating`) to dynamically re-order planned and saved workouts.
5. **Completion Tracking & Instant Toast Notifications:** Features a permanent **Mark as Done** action and a **Remove (`X`)** option on planned lifts, paired with custom top-right toast notifications (green checkmarks for successful actions and red cross alerts for duplicate entries) and a custom **404 Not Found** page for invalid routes.

---

vercel link- [https://fit-log-workout-library-daily-lift.vercel.app/]
github repo- [https://github.com/SaifulIslam48]