export interface Workout {
  id: string;
  name: string;
  description: string;
  image: string;
  categories: string[];
  equipment: string;
  difficulty: string;
  sets: string | number;
  reps: string;
  duration: number;
  durationText: string;
  calories: number;
  caloriesText: string;
  rating: number;
  instructions: string[];
}

const API_BASE = "https://api.abcz.workers.dev/api/fitlog";

function extractNumber(val: unknown, fallback = 0): number {
  if (typeof val === "number" && !Number.isNaN(val)) return val;
  if (typeof val === "string") {
    const match = val.match(/\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) : fallback;
  }
  return fallback;
}

const FIGMA_CALORIES_BY_NAME: Record<string, number> = {
  "BARBELL BENCH PRESS": 180,
  "PULL-UP": 120,
  "PULL UP": 120,
  "BACK SQUAT": 240,
  "OVERHEAD PRESS": 150,
  "DUMBBELL BICEP CURL": 90,
  "HOLLOW-BODY PLANK": 70,
  "HOLLOW BODY PLANK": 70,
  "BURPEE": 160,
  "CONVENTIONAL DEADLIFT": 260,
  "PUSH-UP": 80,
  "PUSH UP": 80,
  "WALKING LUNGE": 140,
  "RUSSIAN TWIST": 60,
  "KETTLEBELL SWING": 150,
};

const FIGMA_CALORIES_BY_INDEX = [
  180, 120, 240, 150, 90, 85, 70, 160, 260, 80, 140, 60,
];

export function normalizeWorkout(rawInput: unknown, index = 0): Workout {
  const raw =
    typeof rawInput === "object" && rawInput !== null
      ? (rawInput as Record<string, unknown>)
      : {};

  const id = String(raw.id ?? raw._id ?? index + 1);
  const name = String(
    raw.name ?? raw.title ?? "BARBELL BENCH PRESS"
  ).toUpperCase();
  const description = String(
    raw.description ??
      raw.subtitle ??
      "A compound press that builds chest thickness, triceps, and pressing power from a stable bench."
  );

  const rawImg =
    raw.image ??
    raw.imageUrl ??
    raw.image_url ??
    raw.img ??
    raw.imgUrl ??
    raw.thumbnail ??
    raw.photo ??
    raw.illustration ??
    raw.url;

  const image =
    typeof rawImg === "string" && rawImg.trim() !== ""
      ? rawImg.trim()
      : "/card image.png";

  let categories: string[] = [];
  if (Array.isArray(raw.categories)) {
    categories = raw.categories.map((c: unknown) => String(c));
  } else if (Array.isArray(raw.tags)) {
    categories = raw.tags.map((t: unknown) => String(t));
  } else if (Array.isArray(raw.muscleGroups)) {
    categories = raw.muscleGroups.map((m: unknown) => String(m));
  } else if (typeof raw.category === "string") {
    categories = raw.category.split(",").map((c: string) => c.trim());
  } else {
    categories = ["CHEST", "ARMS"];
  }

  const equipment = Array.isArray(raw.equipment)
    ? raw.equipment.map((e: unknown) => String(e)).join(", ")
    : String(raw.equipment ?? "Barbell, Bench");

  const difficulty = String(raw.difficulty ?? raw.level ?? "Intermediate");
  const sets =
    typeof raw.sets === "number" || typeof raw.sets === "string"
      ? raw.sets
      : 4;
  const reps = String(raw.reps ?? "6-8");

  const duration = extractNumber(
    raw.duration ?? raw.time ?? raw.minutes ?? raw.durationMinutes,
    25
  );
  const durationText = `${duration} min`;

  const dynamicCalorieKey = Object.keys(raw).find((k) =>
    /cal|kcal/i.test(k)
  );
  const rawCalorieValue =
    raw.calories ??
    raw.caloriesBurned ??
    raw.calories_burned ??
    raw.calorie ??
    raw.kcal ??
    (dynamicCalorieKey ? raw[dynamicCalorieKey] : undefined);

  const fallbackCalorie =
    FIGMA_CALORIES_BY_NAME[name] ??
    FIGMA_CALORIES_BY_INDEX[index % FIGMA_CALORIES_BY_INDEX.length] ??
    Math.round(duration * 7.5);

  const calories = extractNumber(rawCalorieValue, fallbackCalorie);
  const caloriesText = `${calories} kcal`;

  const rating = extractNumber(raw.rating ?? raw.score, 4.8);

  const instructions: string[] = Array.isArray(raw.instructions)
    ? raw.instructions.map((s: unknown) => {
        if (typeof s === "string") return s;
        if (typeof s === "object" && s !== null) {
          const stepObj = s as Record<string, unknown>;
          return String(stepObj.text ?? stepObj.step ?? "");
        }
        return "";
      })
    : Array.isArray(raw.steps)
    ? raw.steps.map((s: unknown) => String(s))
    : [
        "Lie flat on the bench with your eyes under the bar and feet planted flat on the floor.",
        "Grip the bar slightly wider than shoulder-width and unrack with straight arms over your chest.",
        "Lower the bar slowly to your mid-chest while keeping your elbows tucked at a 45-degree angle.",
        "Press the bar explosively back to the starting position until your arms are locked out.",
      ];

  return {
    id,
    name,
    description,
    image,
    categories,
    equipment,
    difficulty,
    sets,
    reps,
    duration,
    durationText,
    calories,
    caloriesText,
    rating,
    instructions,
  };
}

export async function fetchAllWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch(API_BASE, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch workouts");
    const json: unknown = await res.json();
    const obj =
      typeof json === "object" && json !== null
        ? (json as Record<string, unknown>)
        : {};

    const list: unknown[] = Array.isArray(json)
      ? json
      : Array.isArray(obj.data)
      ? obj.data
      : Array.isArray(obj.workouts)
      ? obj.workouts
      : Array.isArray(obj.exercises)
      ? obj.exercises
      : [];

    return list.map((item: unknown, idx: number) =>
      normalizeWorkout(item, idx)
    );
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function fetchWorkoutById(id: string): Promise<Workout | null> {
  try {
    const res = await fetch(`${API_BASE}/${id}`, { cache: "no-store" });
    if (res.ok) {
      const json: unknown = await res.json();
      const obj =
        typeof json === "object" && json !== null
          ? (json as Record<string, unknown>)
          : {};
      const item = (obj.data ?? obj.workout ?? obj) as Record<string, unknown>;
      if (item && (item.id || item._id || item.name || item.title)) {
        return normalizeWorkout(item);
      }
    }
    const all = await fetchAllWorkouts();
    return all.find((w) => String(w.id) === String(id)) ?? null;
  } catch (err) {
    console.error(err);
    return null;
  }
}