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

  // 🔥 FIXED FUNCTION
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

      // ✅ IMPORTANT FIX
      localStorage.setItem("user", JSON.stringify(data.user));

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
        
        {/* 👇 UI SAME AS YOURS (NO CHANGE) */}

        <div className="jn-shell">
          <h1 className="jn-title">Profile</h1>

          <div className="jn-grid">

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

            <div className="jn-card jn-main-card">

              {!editing ? (
                <>
                  <div>{profile.name}</div>
                  <div>{profile.college}</div>
                  <div>{profile.linkedin}</div>
                  <div>{profile.github}</div>
                  <div>{profile.intro}</div>
                </>
              ) : (
                <>
                  <input name="name" value={profile.name} onChange={handleChange} />
                  <input name="college" value={profile.college} onChange={handleChange} />
                  <textarea name="intro" value={profile.intro} onChange={handleChange} />
                  <input name="linkedin" value={profile.linkedin} onChange={handleChange} />
                  <input name="github" value={profile.github} onChange={handleChange} />
                </>
              )}

            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}