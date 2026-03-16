import { useLocation, useNavigate } from "react-router-dom";

const titleMap: Record<string, string> = {
  "/": "Dashboard",
  "/problems": "Problems",
  "/leaderboard": "Leaderboard",
  "/submissions": "Submissions",
  "/profile": "Profile",
};

export default function Topbar() {
  const loc = useLocation();
  const navigate = useNavigate();
  const title = titleMap[loc.pathname] ?? "JudgeNest";
  const user = sessionStorage.getItem("user") || "User";

  const logout = () => {
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/40 backdrop-blur">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <div className="text-lg font-semibold">{title}</div>
          <div className="text-xs text-white/50">
            Welcome, <span className="text-white/80">{user}</span>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-xl bg-red-500/90 hover:bg-red-500 transition font-semibold"
        >
          Logout
        </button>
      </div>
    </header>
  );
}