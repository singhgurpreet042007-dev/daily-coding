import { useLocation, useNavigate } from "react-router-dom";

const items = [
  { label: "Dashboard", path: "/dashboard", icon: "⌂" },
  { label: "Problems", path: "/problems", icon: "◎" },
  { label: "Leaderboard", path: "/leaderboard", icon: "★" },
  { label: "Submissions", path: "/submissions", icon: "▣" },
  { label: "Edit Profile", path: "/profile", icon: "✎" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <aside
      style={{
        width: 250,
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, rgba(8,17,40,0.96), rgba(4,10,24,0.98))",
        borderRight: "1px solid rgba(95,136,255,0.18)",
        padding: 24,
        boxSizing: "border-box",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 28,
        }}
      >
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 14,
            display: "grid",
            placeItems: "center",
            fontWeight: 800,
            color: "#fff",
            background: "linear-gradient(135deg, #61b8ff, #8b5cf6)",
            boxShadow: "0 0 30px rgba(96,165,250,0.35)",
          }}
        >
          J
        </div>
        <div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              lineHeight: 1,
              color: "#fff",
            }}
          >
            JudgeNest
          </div>
          <div style={{ color: "rgba(255,255,255,0.55)", marginTop: 4 }}>
            Pro Panel
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {items.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 16px",
                borderRadius: 14,
                border: active
                  ? "1px solid rgba(255,215,0,0.35)"
                  : "1px solid rgba(255,255,255,0.08)",
                background: active
                  ? "linear-gradient(90deg, rgba(31,89,197,0.38), rgba(255,215,0,0.10))"
                  : "rgba(255,255,255,0.03)",
                color: active ? "#fff" : "rgba(255,255,255,0.82)",
                cursor: "pointer",
                fontSize: 16,
                fontWeight: active ? 700 : 500,
                textAlign: "left",
                boxShadow: active
                  ? "0 0 24px rgba(59,130,246,0.22)"
                  : "none",
              }}
            >
              <span style={{ width: 20 }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <button
        onClick={logout}
        style={{
          position: "absolute",
          left: 24,
          right: 24,
          bottom: 24,
          padding: "14px 16px",
          borderRadius: 14,
          border: "1px solid rgba(255,99,99,0.24)",
          background: "rgba(255,99,99,0.08)",
          color: "#fff",
          cursor: "pointer",
          fontWeight: 700,
        }}
      >
        Logout
      </button>
    </aside>
  );
}