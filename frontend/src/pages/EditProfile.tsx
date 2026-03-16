import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, persistProfile } from "../lib/store";

export default function EditProfile() {
  const nav = useNavigate();
  const p = useMemo(() => getProfile(), []);

  const [name, setName] = useState(p.name);
  const [email, setEmail] = useState(p.email);
  const [headline, setHeadline] = useState(p.headline);
  const [bio, setBio] = useState(p.bio);
  const [github, setGithub] = useState(p.github);
  const [linkedin, setLinkedin] = useState(p.linkedin);
  const [college, setCollege] = useState(p.college);
  const [skills, setSkills] = useState(p.skills.join(", "));

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    persistProfile({
      ...p,
      name,
      email,
      headline,
      bio,
      github,
      linkedin,
      college,
      skills: skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 20),
    });
    nav("/profile");
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg shadow-xl">
      <h1 className="text-2xl font-bold">Edit Profile</h1>
      <p className="mt-1 text-sm text-white/60">Make your profile pitch-ready.</p>

      <form onSubmit={save} className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Field label="Name">
          <input value={name} onChange={(e) => setName(e.target.value)} className={inp} />
        </Field>

        <Field label="Email">
          <input value={email} onChange={(e) => setEmail(e.target.value)} className={inp} />
        </Field>

        <Field label="Headline" className="lg:col-span-2">
          <input value={headline} onChange={(e) => setHeadline(e.target.value)} className={inp} />
        </Field>

        <Field label="Bio" className="lg:col-span-2">
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} className={inp} rows={5} />
        </Field>

        <Field label="GitHub">
          <input value={github} onChange={(e) => setGithub(e.target.value)} className={inp} placeholder="https://github.com/..." />
        </Field>

        <Field label="LinkedIn">
          <input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className={inp} placeholder="https://linkedin.com/in/..." />
        </Field>

        <Field label="College">
          <input value={college} onChange={(e) => setCollege(e.target.value)} className={inp} />
        </Field>

        <Field label="Skills (comma separated)" className="lg:col-span-2">
          <input value={skills} onChange={(e) => setSkills(e.target.value)} className={inp} />
        </Field>

        <div className="lg:col-span-2 flex gap-3">
          <button
            type="submit"
            className="rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold hover:bg-indigo-600 transition"
          >
            Save →
          </button>
          <button
            type="button"
            onClick={() => nav("/profile")}
            className="rounded-xl bg-white/10 px-5 py-3 text-sm hover:bg-white/15"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children, className = "" }: any) {
  return (
    <div className={className}>
      <div className="mb-2 text-xs text-white/70">{label}</div>
      {children}
    </div>
  );
}

const inp =
  "w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-400/50";