import API from "../config/api";
import { useMemo, useState } from "react";

type GlowWord = {
  text: string;
  top: string;
  left: string;
  delay: string;
  duration: string;
};

type FloatCard = {
  top: string;
  left: string;
  rotate: string;
  delay: string;
};

export default function Login() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const words = useMemo<GlowWord[]>(
    () => [
      { text: "ALGO", top: "12%", left: "12%", delay: "0s", duration: "5s" },
      { text: "ARRAY", top: "22%", left: "66%", delay: "1s", duration: "6s" },
      { text: "GRAPH", top: "68%", left: "18%", delay: "0.5s", duration: "5.5s" },
      { text: "TREE", top: "77%", left: "58%", delay: "1.5s", duration: "6.5s" },
      { text: "DP", top: "40%", left: "8%", delay: "2s", duration: "4.8s" },
      { text: "STACK", top: "14%", left: "82%", delay: "1.8s", duration: "5.2s" },
      { text: "QUEUE", top: "58%", left: "78%", delay: "0.8s", duration: "6.2s" },
      { text: "BFS", top: "84%", left: "34%", delay: "2.2s", duration: "5.4s" },
      { text: "DFS", top: "30%", left: "42%", delay: "1.1s", duration: "6.1s" },
    ],
    []
  );

  const cards = useMemo<FloatCard[]>(
    () => [
      { top: "10%", left: "5%", rotate: "-16deg", delay: "0s" },
      { top: "18%", left: "78%", rotate: "18deg", delay: "1.2s" },
      { top: "72%", left: "10%", rotate: "12deg", delay: "0.7s" },
      { top: "76%", left: "86%", rotate: "-14deg", delay: "1.7s" },
      { top: "42%", left: "90%", rotate: "8deg", delay: "0.3s" },
    ],
    []
  );

  const particles = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${2 + Math.random() * 4}px`,
        delay: `${Math.random() * 4}s`,
        duration: `${3 + Math.random() * 5}s`,
      })),
    []
  );
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    if (mode === "signup") {
      const res = await API.post("/api/auth/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("tempName", name);

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);

        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user || { name, email })
        );

        window.location.href = "/dashboard";
        return;
      }

      alert(res.data?.message || "Account created");
      setMode("login");
    } else {
      const res = await API.post("/api/auth/login", {
        email,
        password,
      });

      if (!res.data?.token) {
        alert("Token missing");
        return;
      }

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
       JSON.stringify(
  res.data.user || {
    name: localStorage.getItem("tempName") || "User",
    email
  }
) 
      );

      window.location.href = "/dashboard";
    }
  } catch (err: any) {
    alert(err?.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="jn-auth-page">
      <div className="jn-bg-grid" />
      <div className="jn-orb jn-orb-1" />
      <div className="jn-orb jn-orb-2" />
      <div className="jn-orb jn-orb-3" />

      {particles.map((p) => (
        <span
          key={p.id}
          className="jn-particle"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}

      {words.map((w) => (
        <span
          key={w.text + w.top + w.left}
          className="jn-word"
          style={{
            top: w.top,
            left: w.left,
            animationDelay: w.delay,
            animationDuration: w.duration,
          }}
        >
          {w.text}
        </span>
      ))}

      {cards.map((c, idx) => (
        <div
          key={idx}
          className="jn-float-card"
          style={{
            top: c.top,
            left: c.left,
            transform: `rotate(${c.rotate})`,
            animationDelay: c.delay,
          }}
        />
      ))}

      <div className="jn-auth-shell">
        <section className="jn-left">
          <div className="jn-brand-row">
            <div className="jn-brand-icon">J</div>
            <div>
              <h2>JudgeNest</h2>
              <p>Practice • Compete • Improve</p>
            </div>
          </div>

          <h1 className="jn-hero-title">
            Code.
            <br />
            Create.
            <br />
            Conquer.
          </h1>

          <p className="jn-hero-sub">
            Build your coding universe with contests, streaks, smart practice,
            and a futuristic judge experience.
          </p>

          <div className="jn-stat-row">
            <div className="jn-stat-card">
              <span>Problems</span>
              <strong>150+</strong>
            </div>
            <div className="jn-stat-card">
              <span>Tracks</span>
              <strong>DSA</strong>
            </div>
            <div className="jn-stat-card">
              <span>Mode</span>
              <strong>Elite</strong>
            </div>
          </div>
        </section>

        <section className="jn-right">
          <div className="jn-panel">
            <div className="jn-toggle">
              <button
                className={mode === "login" ? "active" : ""}
                onClick={() => setMode("login")}
                type="button"
              >
                Login
              </button>
              <button
                className={mode === "signup" ? "active" : ""}
                onClick={() => setMode("signup")}
                type="button"
              >
                Sign up
              </button>
            </div>

            <h3>{mode === "login" ? "Welcome back" : "Create account"}</h3>
            <p className="jn-panel-sub">
              {mode === "login"
                ? "Enter your credentials to enter the arena."
                : "Join JudgeNest and start your coding streak."}
            </p>

            <form onSubmit={handleSubmit}>
              {mode === "signup" && (
                <div className="jn-input-wrap">
                  <input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="jn-input-wrap">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="jn-input-wrap">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button className="jn-submit" type="submit" disabled={loading}>
                {loading
                  ? mode === "login"
                    ? "Redirecting..."
                    : "Creating..."
                  : mode === "login"
                  ? "Enter JudgeNest →"
                  : "Create account →"}
              </button>
            </form>

            <div className="jn-mini-line" />

            <p className="jn-foot-note">
              {mode === "login"
                ? "New here?"
                : "Already have an account?"}{" "}
              <span onClick={() => setMode(mode === "login" ? "signup" : "login")}>
                {mode === "login" ? "Create account" : "Login"}
              </span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}