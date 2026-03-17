import { Link, useLocation } from "react-router-dom";
import { FaHome, FaCode, FaTrophy, FaHistory, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function AppLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  const location = useLocation();

  // ✅ USER NAME FIX (JSON parse)
  let userName = "User";
  try {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    userName = userData.name || "User";
  } catch {
    userName = "User";
  }

  // ✅ GREETING FUNCTION
  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning 🌅";
    if (hour < 17) return "Good Afternoon ☀️";
    return "Good Evening 🌙";
  }

  // ✅ LIVE GREETING
  const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const nav = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Problems", path: "/problems", icon: <FaCode /> },
    { name: "Leaderboard", path: "/leaderboard", icon: <FaTrophy /> },
    { name: "Submissions", path: "/submissions", icon: <FaHistory /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* 🔥 SIDEBAR */}
      <div style={{
        width: 240,
        background: "rgba(2,6,23,0.85)",
        backdropFilter: "blur(14px)",
        padding: 25,
        borderRight: "1px solid rgba(96,165,250,.2)",
        boxShadow: "0 0 30px rgba(59,130,246,.15)"
      }}>
        
        <h2 style={{
          color: "#60a5fa",
          fontWeight: 900,
          marginBottom: 35,
          textShadow: "0 0 15px rgba(59,130,246,.7)",
        }}>
          JudgeNest 🚀
        </h2>

        {nav.map((n) => {
          const active = location.pathname === n.path;

          return (
            <Link key={n.name} to={n.path} style={{ textDecoration: "none" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "13px 16px",
                marginBottom: 12,
                borderRadius: 14,
                fontWeight: 700,
                color: active ? "#fff" : "#cbd5f5",
                background: active
                  ? "linear-gradient(90deg,#2563eb,#60a5fa)"
                  : "transparent",
                boxShadow: active
                  ? "0 0 25px rgba(59,130,246,.7)"
                  : "none",
                transform: active ? "scale(1.06)" : "scale(1)",
                transition: "all 0.25s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "rgba(59,130,246,.15)";
                  e.currentTarget.style.transform = "scale(1.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.transform = "scale(1)";
                }
              }}
              >
                <span style={{ fontSize: 18 }}>
                  {n.icon}
                </span>
                {n.name}
              </div>
            </Link>
          );
        })}
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div style={{
        flex: 1,
        padding: "30px",
        color: "white"
      }}>

        {/* 🔥 TOP BAR */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20
        }}>
          <div></div>

          {/* 🔥 PREMIUM GREETING */}
          <div style={{
            background: "linear-gradient(135deg, #facc15, #fb923c)",
            padding: "10px 20px",
            borderRadius: 14,
            fontSize: 15,
            fontWeight: 800,
            color: "#111827",
            boxShadow: "0 0 25px rgba(251,146,60,.6)",
            border: "1px solid rgba(255,255,255,.2)",
            letterSpacing: ".5px",
            transform: "scale(1.05)",
            transition: "all 0.3s ease"
          }}>
            {greeting}, {userName} 👋
          </div>
        </div>

        {/* 🔥 TITLE */}
        <h1 style={{
          fontSize: 38,
          fontWeight: 900,
          marginBottom: 8,
          background: "linear-gradient(90deg,#ffffff,#60a5fa,#facc15)",
          WebkitBackgroundClip: "text",
          color: "transparent"
        }}>
          {title}
        </h1>

        {/* SUBTITLE */}
        <p style={{
          color: "#94a3b8",
          marginBottom: 25
        }}>
          {subtitle}
        </p>

        {children}
      </div>
    </div>
  );
}