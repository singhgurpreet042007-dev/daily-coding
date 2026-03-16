// frontend/src/data/leaderboard.ts

export type Tier = "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond";

export type LeaderboardUser = {
  id: string;
  name: string;
  handle: string;

  tier: Tier;

  rating: number;
  solved: number;
  streak: number;

  last7dSolved: number;

  // ✅ rank movement
  rankDelta: number; // + means up, - means down, 0 same

  badges: string[];
};

export const leaderboardUsers: LeaderboardUser[] = [
  {
    id: "u1",
    name: "Gurpreet Singh",
    handle: "gurpreet_dev",
    tier: "Gold",
    rating: 1680,
    solved: 214,
    streak: 12,
    last7dSolved: 18,
    rankDelta: 7,
    badges: ["Streaker", "Bug Hunter", "Fast AC"],
  },
  {
    id: "u2",
    name: "Aarav Mehta",
    handle: "aarav.codes",
    tier: "Platinum",
    rating: 1920,
    solved: 402,
    streak: 21,
    last7dSolved: 26,
    rankDelta: 3,
    badges: ["Top 10%", "Contest Grinder", "Streaker"],
  },
  {
    id: "u3",
    name: "Sara Khan",
    handle: "sara_k",
    tier: "Diamond",
    rating: 2230,
    solved: 520,
    streak: 8,
    last7dSolved: 11,
    rankDelta: -2,
    badges: ["Top 1%", "Speed Runner", "Grandmaster Aura"],
  },
  {
    id: "u4",
    name: "Ishaan Verma",
    handle: "ishaan_v",
    tier: "Silver",
    rating: 1240,
    solved: 98,
    streak: 4,
    last7dSolved: 9,
    rankDelta: 12,
    badges: ["Rising Star"],
  },
  {
    id: "u5",
    name: "Neha Sharma",
    handle: "neha.sh",
    tier: "Gold",
    rating: 1585,
    solved: 176,
    streak: 15,
    last7dSolved: 15,
    rankDelta: 0,
    badges: ["Streaker", "Clean Code"],
  },
  {
    id: "u6",
    name: "Daniel Lee",
    handle: "dan_lee",
    tier: "Platinum",
    rating: 1870,
    solved: 330,
    streak: 10,
    last7dSolved: 20,
    rankDelta: -4,
    badges: ["Contest Grinder", "Top 10%"],
  },
  {
    id: "u7",
    name: "Mina Park",
    handle: "minapark",
    tier: "Diamond",
    rating: 2105,
    solved: 470,
    streak: 30,
    last7dSolved: 22,
    rankDelta: 1,
    badges: ["Streak Legend", "Top 1%", "Contest Queen"],
  },
  {
    id: "u8",
    name: "Rohit Gupta",
    handle: "rohit.g",
    tier: "Bronze",
    rating: 980,
    solved: 40,
    streak: 2,
    last7dSolved: 5,
    rankDelta: 9,
    badges: ["Newcomer"],
  },
];