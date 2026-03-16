// frontend/src/data/profile.ts

export type UserProfile = {
  email: string;
  name: string;
  bio: string;
  college: string;
  github: string;
  linkedin: string;
  avatarUrl: string;
};

const KEY = "jn_profile_v1";

// token/user se email nikaalna (tumhare login flow me userEmail localStorage me ho sakta hai)
// fallback: "test@test.com"
export function getCurrentEmail(): string {
  return (
    localStorage.getItem("email") ||
    localStorage.getItem("user") || // agar tum user email "user" key me store kar rahe ho
    "test@test.com"
  );
}

export function getProfile(): UserProfile {
  const email = getCurrentEmail();

  const raw = localStorage.getItem(KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as Partial<UserProfile>;
      return {
        email: parsed.email ?? email,
        name: parsed.name ?? "Gurpreet",
        bio: parsed.bio ?? "B.Tech CSE • Building JudgeNest",
        college: parsed.college ?? "Your College",
        github: parsed.github ?? "",
        linkedin: parsed.linkedin ?? "",
        avatarUrl:
          parsed.avatarUrl ??
          "https://api.dicebear.com/9.x/thumbs/svg?seed=JudgeNest",
      };
    } catch {
      // ignore
    }
  }

  // default profile
  return {
    email,
    name: "Gurpreet",
    bio: "B.Tech CSE • Building JudgeNest",
    college: "Your College",
    github: "",
    linkedin: "",
    avatarUrl: "https://api.dicebear.com/9.x/thumbs/svg?seed=JudgeNest",
  };
}

export function saveProfile(profile: UserProfile) {
  localStorage.setItem(KEY, JSON.stringify(profile));
}