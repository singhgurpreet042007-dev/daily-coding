type Difficulty = "Easy" | "Medium" | "Hard";

export type Submission = {
  id: string;
  problemId: string;
  problemTitle: string;
  status: "Accepted" | "Wrong Answer" | "TLE" | "Runtime Error";
  lang: "C++" | "Python" | "Java" | "JS";
  runtimeMs: number;
  memoryMb: number;
  points: number;
  createdAt: string; // ISO
};

export type Profile = {
  name: string;
  email: string;
  headline: string;
  bio: string;
  github: string;
  linkedin: string;
  college: string;
  skills: string[];
  level: number;
  xp: number;
  streakDays: number;
  solved: Record<Difficulty, number>;
};

export type LeaderboardUser = {
  id: string;
  name: string;
  handle: string;
  tier: "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond";
  score: number;
  streak: number;
  solved: number;
  delta: number; // rank change (+ up, - down)
  badges: string[];
};

const KEY_PROFILE = "jn_profile_v1";
const KEY_SUBS = "jn_submissions_v1";
const KEY_LB = "jn_leaderboard_v1";

function nowIso() {
  return new Date().toISOString();
}

export function getProfile(): Profile {
  const raw =
    localStorage.getItem(KEY_PROFILE) || sessionStorage.getItem(KEY_PROFILE);
  if (raw) return JSON.parse(raw);

  // Default profile (you can edit later)
  const userRaw =
    localStorage.getItem("user") || sessionStorage.getItem("user");
  const user = userRaw ? safeJson(userRaw) : null;

  const profile: Profile = {
    name: user?.name || "Gurpreet",
    email: user?.email || "test@test.com",
    headline: "Building JudgeNest — a modern coding arena",
    bio: "I’m a B.Tech student focused on backend + system design. Currently building JudgeNest with React + NestJS.",
    github: "",
    linkedin: "",
    college: "CGC (or your college)",
    skills: ["DSA", "React", "TypeScript", "NestJS", "PostgreSQL"],
    level: 7,
    xp: 1840,
    streakDays: 21,
    solved: { Easy: 42, Medium: 26, Hard: 10 },
  };

  persistProfile(profile);
  return profile;
}

export function persistProfile(p: Profile) {
  localStorage.setItem(KEY_PROFILE, JSON.stringify(p));
}

export function getSubmissions(): Submission[] {
  const raw = localStorage.getItem(KEY_SUBS);
  if (raw) return JSON.parse(raw);

  const seed: Submission[] = [
    {
      id: "sub_1",
      problemId: "jn-010",
      problemTitle: "Stream Echo Validator",
      status: "Accepted",
      lang: "C++",
      runtimeMs: 42,
      memoryMb: 18,
      points: 60,
      createdAt: nowIso(),
    },
    {
      id: "sub_2",
      problemId: "jn-004",
      problemTitle: "Neon Parcel Split",
      status: "Wrong Answer",
      lang: "Python",
      runtimeMs: 110,
      memoryMb: 34,
      points: 0,
      createdAt: nowIso(),
    },
  ];

  localStorage.setItem(KEY_SUBS, JSON.stringify(seed));
  return seed;
}

export function addSubmission(s: Omit<Submission, "id" | "createdAt">) {
  const all = getSubmissions();
  const newOne: Submission = {
    ...s,
    id: `sub_${Math.random().toString(16).slice(2)}`,
    createdAt: nowIso(),
  };
  const next = [newOne, ...all];
  localStorage.setItem(KEY_SUBS, JSON.stringify(next));

  // Update profile XP + solved counters (simple gamification)
  const p = getProfile();
  if (newOne.status === "Accepted") {
    p.xp += Math.max(10, newOne.points);
    // naive: difficulty inferred by points
    const d: Difficulty =
      newOne.points <= 40 ? "Easy" : newOne.points <= 70 ? "Medium" : "Hard";
    p.solved[d] = (p.solved[d] || 0) + 1;
    if (p.xp > p.level * 350) p.level += 1;
    persistProfile(p);
  }
}

export function getLeaderboard(): LeaderboardUser[] {
  const raw = localStorage.getItem(KEY_LB);
  if (raw) return JSON.parse(raw);

  const seed: LeaderboardUser[] = [
    {
      id: "u1",
      name: "Aarav",
      handle: "aarav.dev",
      tier: "Diamond",
      score: 2840,
      streak: 31,
      solved: 196,
      delta: +2,
      badges: ["⚡ Speedster", "🔥 Streaklord", "🧠 DP"],
    },
    {
      id: "u2",
      name: "Meera",
      handle: "meera.codes",
      tier: "Platinum",
      score: 2610,
      streak: 19,
      solved: 172,
      delta: -1,
      badges: ["🧩 Graph", "🎯 Precision"],
    },
    {
      id: "u3",
      name: "Kabir",
      handle: "kabir.stack",
      tier: "Gold",
      score: 2180,
      streak: 14,
      solved: 141,
      delta: +5,
      badges: ["🧠 Greedy", "🧊 Cool head"],
    },
    {
      id: "u4",
      name: "Riya",
      handle: "riya.ai",
      tier: "Silver",
      score: 1670,
      streak: 8,
      solved: 92,
      delta: +1,
      badges: ["🧪 Tester"],
    },
  ];

  // add “you” from profile
  const p = getProfile();
  seed.splice(2, 0, {
    id: "you",
    name: p.name,
    handle: (p.email || "you").split("@")[0],
    tier: p.level >= 9 ? "Diamond" : p.level >= 8 ? "Platinum" : p.level >= 6 ? "Gold" : "Silver",
    score: p.xp,
    streak: p.streakDays,
    solved: p.solved.Easy + p.solved.Medium + p.solved.Hard,
    delta: +3,
    badges: ["🛠 Builder", "🚀 Ship it", "🧠 Problem Solver"],
  });

  localStorage.setItem(KEY_LB, JSON.stringify(seed));
  return seed;
}

export function saveLeaderboard(users: LeaderboardUser[]) {
  localStorage.setItem(KEY_LB, JSON.stringify(users));
}

function safeJson(raw: string) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}