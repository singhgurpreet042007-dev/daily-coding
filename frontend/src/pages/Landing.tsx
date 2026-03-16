import { Link } from "react-router-dom";

export default function Landing() {

  return (
    <div className="min-h-screen bg-black text-white flex overflow-hidden">

      {/* LEFT HERO */}

      <div className="w-1/2 flex flex-col justify-center px-20 relative">

        <h1 className="text-6xl font-bold leading-tight bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Build Your Coding Dominance
        </h1>

        <p className="text-gray-400 mt-6 text-lg max-w-md">
          Practice coding problems, run your code instantly and climb the leaderboard.
        </p>

        <Link to="/login">
          <button className="mt-10 px-8 py-4 bg-green-500 rounded-xl hover:bg-green-600 transition text-lg">
            Start Coding
          </button>
        </Link>

        {/* glow background */}

        <div className="absolute w-[400px] h-[400px] bg-green-500 blur-[180px] opacity-20 -z-10 top-40 left-20"/>
        <div className="absolute w-[300px] h-[300px] bg-blue-500 blur-[180px] opacity-20 -z-10 bottom-10 left-40"/>

      </div>


      {/* RIGHT 3D LOGIN CARD */}

      <div className="w-1/2 flex justify-center items-center">

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-2xl shadow-2xl w-[360px] transform hover:scale-105 transition">

          <h2 className="text-2xl text-center font-semibold text-green-400 mb-6">
            Welcome to JudgeNest
          </h2>

          <p className="text-gray-400 text-center mb-8">
            Login and start solving coding challenges.
          </p>

          <Link to="/login">
            <button className="w-full py-3 bg-green-500 rounded-lg hover:bg-green-600 transition">
              Login
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
}