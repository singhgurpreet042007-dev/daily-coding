import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";

function FeatureCard({
  title,
  desc,
  color,
  onClick,
}: {
  title: string;
  desc: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "rgba(8,18,40,0.78)",
        border: `1px solid ${color}55`,
        borderRadius: 20,
        padding: 22,
        cursor: "pointer",
        boxShadow: `0 0 30px ${color}22`,
        transition: "0.25s",
      }}
    >
      <div style={{ fontSize: 24, fontWeight: 800, color }}>{title}</div>
      <p style={{ color: "rgba(255,255,255,0.68)", marginTop: 10 }}>{desc}</p>
    </div>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 18,
        padding: 20,
      }}
    >
      <div style={{ color: "rgba(255,255,255,0.58)", fontSize: 14 }}>{label}</div>
      <div
        style={{
          fontSize: 34,
          fontWeight: 900,
          marginTop: 8,
          background: "linear-gradient(90deg,#60a5fa,#facc15)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <AppLayout
      title="JudgeNest Dashboard"
      subtitle="Your command center for problems, rankings, submissions, and profile updates."
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 18,
          marginBottom: 28,
        }}
      >
        <Stat label="Problems Ready" value="15" />
        <Stat label="Difficulty Mix" value="E/M/H" />
        <Stat label="Weekly Rank" value="#12" />
        <Stat label="Accepted Rate" value="84%" />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 18,
        }}
      >
        <FeatureCard
          title="Problems"
          desc="Practice 15 hand-picked LeetCode-style questions with Easy, Medium, and Hard tags."
          color="#60a5fa"
          onClick={() => navigate("/problems")}
        />
        <FeatureCard
          title="Leaderboard"
          desc="See top coders, compare scores, and track your standing."
          color="#facc15"
          onClick={() => navigate("/leaderboard")}
        />
        <FeatureCard
          title="Submissions"
          desc="Review verdicts like Accepted, Wrong Answer, and Runtime Error."
          color="#38bdf8"
          onClick={() => navigate("/submissions")}
        />
        <FeatureCard
          title="Edit Profile"
          desc="Update your basic info and personalize your JudgeNest presence."
          color="#eab308"
          onClick={() => navigate("/profile")}
        />
      </div>

      <div
        style={{
          marginTop: 28,
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 18,
        }}
      >
        <div
          style={{
            background: "rgba(8,18,40,0.78)",
            border: "1px solid rgba(96,165,250,0.18)",
            borderRadius: 20,
            padding: 24,
          }}
        >
          <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 14 }}>
            Highlight of the week
          </div>
          <div
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.78)",
              lineHeight: 1.7,
            }}
          >
            Solve <b style={{ color: "#facc15" }}>3 Medium</b> problems and{" "}
            <b style={{ color: "#60a5fa" }}>1 Hard</b> problem to push your rank
            into the top 10 this week.
          </div>
        </div>

        <div
          style={{
            background: "rgba(8,18,40,0.78)",
            border: "1px solid rgba(250,204,21,0.18)",
            borderRadius: 20,
            padding: 24,
          }}
        >
          <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>
            Quick Links
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            <button
              onClick={() => navigate("/problems")}
              style={quickBtn}
            >
              Open Problems
            </button>
            <button
              onClick={() => navigate("/submissions")}
              style={quickBtn}
            >
              View Submissions
            </button>
            <button
              onClick={() => navigate("/leaderboard")}
              style={quickBtn}
            >
              Check Leaderboard
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

const quickBtn: React.CSSProperties = {
  padding: "13px 16px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  color: "#fff",
  cursor: "pointer",
  textAlign: "left",
  fontWeight: 700,
};