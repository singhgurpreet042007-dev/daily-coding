import { useMemo, useState, useEffect } from "react";
import AppLayout from "../components/AppLayout";

type ProfileState = {
  name: string;
  college: string;
  intro: string;
  linkedin: string;
  github: string;
};

export default function Profile() {

  const storedUser = (() => {
  try {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
})();

  const [editing, setEditing] = useState(false);

 const [profile, setProfile] = useState<ProfileState>({
  name: storedUser?.name || "Guest",
  college: storedUser?.college || "",
  intro: storedUser?.intro || "",
  linkedin: storedUser?.linkedin || "",
  github: storedUser?.github || "",
});
useEffect(() => {
  const data = localStorage.getItem("user");

  if (data) {
    try {
      const user = JSON.parse(data);

      setProfile({
        name: user.name || "Guest",
        college: user.college || "",
        intro: user.intro || "",
        linkedin: user.linkedin || "",
        github: user.github || "",
      });

    } catch {
      console.log("User parse error");
    }
  }
}, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${10 + Math.random() * 22}px`,
        delay: `${Math.random() * 4}s`,
        duration: `${6 + Math.random() * 7}s`,
      })),
    []
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

 const saveProfile = async () => {
  try {
    const oldUser = JSON.parse(localStorage.getItem("user") || "{}");

    const res = await fetch("http://localhost:4000/api/auth/update-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: oldUser.email,
        name: profile.name,
        college: profile.college,
        intro: profile.intro,
        linkedin: profile.linkedin,
        github: profile.github,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message || "Profile update failed");
      return;
    }

    localStorage.setItem("profile", JSON.stringify(data.user));
    setProfile(data.user);
    setEditing(false);
    alert("Profile updated successfully 🚀");
  } catch (err) {
    alert("Something went wrong");
  }
};

  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
  <AppLayout title="Profile" subtitle="Your coding identity">

    <div style={{ position: "relative", padding: 36, color: "white", minHeight: "100vh" }}>
      <style>{`
        .jn-profile-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .jn-orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(70px);
          opacity: 0.28;
          animation: jnFloatOrb 12s ease-in-out infinite;
        }

        .jn-orb-a {
          width: 260px;
          height: 260px;
          background: #3b82f6;
          top: -50px;
          left: -40px;
        }

        .jn-orb-b {
          width: 300px;
          height: 300px;
          background: #facc15;
          bottom: -80px;
          right: 0;
          animation-duration: 14s;
        }

        .jn-orb-c {
          width: 220px;
          height: 220px;
          background: #06b6d4;
          top: 22%;
          right: 22%;
          animation-duration: 10s;
        }

        .jn-particle {
          position: absolute;
          border-radius: 18px;
          background: linear-gradient(135deg, rgba(59,130,246,.16), rgba(250,204,21,.12));
          border: 1px solid rgba(255,255,255,.08);
          animation: jnDrift linear infinite;
        }

        .jn-shell {
          position: relative;
          z-index: 2;
        }

        .jn-title {
          font-size: 44px;
          font-weight: 900;
          margin: 0 0 10px 0;
          background: linear-gradient(90deg, #ffffff, #60a5fa, #facc15);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          letter-spacing: .4px;
        }

        .jn-subtitle {
          margin: 0 0 26px 0;
          color: rgba(226,232,240,.72);
          font-size: 16px;
        }

        .jn-grid {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 22px;
        }

        .jn-card {
          background: rgba(8,18,40,.78);
          border: 1px solid rgba(96,165,250,.18);
          border-radius: 22px;
          box-shadow:
            0 0 28px rgba(59,130,246,.16),
            inset 0 1px 0 rgba(255,255,255,.04);
          backdrop-filter: blur(10px);
        }

        .jn-profile-card {
          padding: 28px;
          position: relative;
          overflow: hidden;
        }

        .jn-profile-card::before {
          content: "";
          position: absolute;
          inset: -1px;
          background: linear-gradient(135deg, rgba(59,130,246,.22), rgba(250,204,21,.10), transparent 55%);
          pointer-events: none;
        }

        .jn-avatar {
          width: 92px;
          height: 92px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          font-size: 30px;
          font-weight: 900;
          color: white;
          background: linear-gradient(135deg, #2563eb, #facc15);
          box-shadow: 0 0 32px rgba(59,130,246,.42);
          margin-bottom: 18px;
          position: relative;
          z-index: 2;
        }

        .jn-name {
          font-size: 28px;
          font-weight: 800;
          margin: 0;
          position: relative;
          z-index: 2;
        }

        .jn-intro {
          color: rgba(226,232,240,.78);
          margin-top: 10px;
          line-height: 1.7;
          position: relative;
          z-index: 2;
        }

        .jn-chip-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 18px;
          position: relative;
          z-index: 2;
        }

        .jn-chip {
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.08);
          color: #e2e8f0;
          font-size: 13px;
        }

        .jn-btn-row {
          display: flex;
          gap: 12px;
          margin-top: 22px;
          position: relative;
          z-index: 2;
        }

        .jn-btn {
          border: none;
          border-radius: 12px;
          padding: 12px 18px;
          font-weight: 800;
          cursor: pointer;
          transition: .22s ease;
        }

        .jn-btn:hover {
          transform: translateY(-2px);
        }

        .jn-btn-primary {
          background: linear-gradient(135deg, #2563eb, #60a5fa);
          color: white;
          box-shadow: 0 0 18px rgba(59,130,246,.32);
        }

        .jn-btn-secondary {
          background: rgba(255,255,255,.05);
          color: white;
          border: 1px solid rgba(255,255,255,.08);
        }

        .jn-main-card {
          padding: 28px;
        }

        .jn-section-title {
          margin: 0 0 18px 0;
          font-size: 24px;
          font-weight: 800;
          color: #f8fafc;
        }

        .jn-info-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 20px;
        }

        .jn-info-box {
          background: linear-gradient(145deg, rgba(15,23,42,.95), rgba(2,6,23,.92));
          border: 1px solid rgba(96,165,250,.15);
          border-radius: 18px;
          padding: 18px;
          box-shadow: 0 0 18px rgba(59,130,246,.10);
        }

        .jn-label {
          color: rgba(148,163,184,.9);
          font-size: 13px;
          margin-bottom: 8px;
          display: block;
        }

        .jn-value {
          color: #e2e8f0;
          font-size: 16px;
          font-weight: 700;
          word-break: break-word;
        }

        .jn-link {
          color: #60a5fa;
          text-decoration: none;
        }

        .jn-link:hover {
          text-decoration: underline;
        }

        .jn-form-grid {
          display: grid;
          gap: 14px;
        }

        .jn-input,
        .jn-textarea {
          width: 100%;
          box-sizing: border-box;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,.10);
          background: rgba(255,255,255,.04);
          color: white;
          outline: none;
          padding: 14px 15px;
          font-size: 15px;
          transition: .2s ease;
        }

        .jn-input:focus,
        .jn-textarea:focus {
          border-color: rgba(96,165,250,.55);
          box-shadow: 0 0 0 4px rgba(59,130,246,.12);
        }

        .jn-textarea {
          resize: vertical;
          min-height: 120px;
        }

        @keyframes jnFloatOrb {
          0%,100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-28px) translateX(12px); }
        }

        @keyframes jnDrift {
          0% { transform: translateY(0px) rotate(0deg); opacity: .25; }
          50% { transform: translateY(-26px) rotate(8deg); opacity: .55; }
          100% { transform: translateY(0px) rotate(0deg); opacity: .25; }
        }

        @media (max-width: 980px) {
          .jn-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="jn-profile-bg">
        <div className="jn-orb jn-orb-a" />
        <div className="jn-orb jn-orb-b" />
        <div className="jn-orb jn-orb-c" />
        {particles.map((p) => (
          <div
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
      </div>

      <div className="jn-shell">
        <h1 className="jn-title">Profile</h1>
        <p className="jn-subtitle">
          Build your coding identity with a polished student profile.
        </p>

        <div className="jn-grid">
          {/* Left Card */}
          <div className="jn-card jn-profile-card">
            <div className="jn-avatar">{initials}</div>
            <button
  className="jn-btn jn-btn-secondary"
  style={{ marginBottom: 16 }}
  onClick={() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }}
>
  Logout
</button>

            <h2 className="jn-name">{profile.name}</h2>

            <p className="jn-intro">{profile.intro}</p>

            <div className="jn-chip-wrap">
              <span className="jn-chip">B.Tech Student</span>
              <span className="jn-chip">{profile.college}</span>
              <span className="jn-chip">JudgeNest Builder</span>
            </div>

            <div className="jn-btn-row">
              {!editing ? (
                <button
                  className="jn-btn jn-btn-primary"
                  onClick={() => setEditing(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button className="jn-btn jn-btn-primary" onClick={saveProfile}>
                    Save Changes
                  </button>
                  <button
                    className="jn-btn jn-btn-secondary"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right Card */}
          <div className="jn-card jn-main-card">
            {!editing ? (
              <>
                <h3 className="jn-section-title">Basic Details</h3>

                <div className="jn-info-grid">
                  <div className="jn-info-box">
                    <span className="jn-label">Full Name</span>
                    <div className="jn-value">{profile.name}</div>
                  </div>

                  <div className="jn-info-box">
                    <span className="jn-label">College</span>
                    <div className="jn-value">{profile.college}</div>
                  </div>

                  <div className="jn-info-box">
                    <span className="jn-label">LinkedIn</span>
                    <div className="jn-value">
                      <a
                        className="jn-link"
                        href={profile.linkedin}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {profile.linkedin || "Not added"}
                      </a>
                    </div>
                  </div>

                  <div className="jn-info-box">
                    <span className="jn-label">GitHub</span>
                    <div className="jn-value">
                      <a
                        className="jn-link"
                        href={profile.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {profile.github || "Not added"}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="jn-info-box">
                  <span className="jn-label">About</span>
                  <div className="jn-value" style={{ lineHeight: 1.8, fontWeight: 500 }}>
                    {profile.intro}
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3 className="jn-section-title">Edit Your Profile</h3>

                <div className="jn-form-grid">
                  <input
                    className="jn-input"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                  />

                  <input
                    className="jn-input"
                    name="college"
                    value={profile.college}
                    onChange={handleChange}
                    placeholder="College Name"
                  />

                  <textarea
                    className="jn-textarea"
                    name="intro"
                    value={profile.intro}
                    onChange={handleChange}
                    placeholder="Write a short intro..."
                  />

                  <input
                    className="jn-input"
                    name="linkedin"
                    value={profile.linkedin}
                    onChange={handleChange}
                    placeholder="LinkedIn URL"
                  />

                  <input
                    className="jn-input"
                    name="github"
                    value={profile.github}
                    onChange={handleChange}
                    placeholder="GitHub URL"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    </AppLayout>
  );
}