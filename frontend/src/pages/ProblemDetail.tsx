import problemsData from "../data/problemsData";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../config/api";

export default function ProblemDetail() {

  const { id } = useParams<{ id: string }>();
  const problem = problemsData[id as keyof typeof problemsData];

  const [code, setCode] = useState(`print("Hello JudgeNest")`);
  const [language, setLanguage] = useState("python");
  const [output, setOutput] = useState("");

  const runCode = async () => {

    try {

      const res = await API.post("/run", {
        code,
        language
      });

      setOutput(res.data.output);

    } catch {

      setOutput("Error running code");

    }

  };

  const submitCode = async () => {

    try {

      const res = await API.post("/submit", {
  code: code,
  problemId: id,
  language: language,
  userId: localStorage.getItem("user")
});

      alert(res.data.verdict);

    } catch {

      alert("Submission failed");

    }

  };

  return (

    <div style={{padding:30, color:"white"}}>

      {/* HEADER */}
      <div style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:20
      }}>

        <h1 style={{
          fontSize:28,
          fontWeight:800,
          color:"#60a5fa"
        }}>
          {problem?.title || `Problem ${id}`}
        </h1>

        <select
          value={language}
          onChange={(e)=>setLanguage(e.target.value)}
          style={{
            background:"#020617",
            color:"white",
            border:"1px solid #334155",
            padding:"8px 14px",
            borderRadius:8
          }}
        >
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          <option value="javascript">JavaScript</option>
        </select>

      </div>


      {/* MAIN GRID */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"1fr 1.3fr",
        gap:20
      }}>


        {/* LEFT SIDE — PROBLEM */}
        <div style={{
          background:"#020617",
          border:"1px solid #1e293b",
          borderRadius:14,
          padding:20,
          height:"520px",
          overflowY:"auto"
        }}>

          <h2 style={{color:"#38bdf8", marginBottom:12}}>
            Problem Description
          </h2>

          <p style={{color:"#cbd5f5"}}>
            {problem?.description}
          </p>

          <h3 style={{marginTop:16, color:"#facc15"}}>Example</h3>

          <pre style={{
            background:"#020617",
            padding:10,
            borderRadius:8,
            border:"1px solid #334155"
          }}>
{problem?.example}
          </pre>

          <h3 style={{marginTop:16, color:"#facc15"}}>Constraints</h3>

          <ul style={{color:"#94a3b8"}}>
            {problem?.constraints?.map((c:any,i:number)=>(
              <li key={i}>{c}</li>
            ))}
          </ul>

        </div>


        {/* RIGHT SIDE — EDITOR */}
        <div style={{
          border:"1px solid #1e293b",
          borderRadius:14,
          overflow:"hidden"
        }}>

          <div style={{
            background:"#020617",
            padding:"8px 14px",
            borderBottom:"1px solid #1e293b",
            color:"#94a3b8"
          }}>
            {language.toUpperCase()} Editor
          </div>

          <Editor
            height="420px"
            theme="vs-dark"
            language={language}
            value={code}
            onChange={(value)=>setCode(value || "")}
          />

          <div style={{
            padding:14,
            background:"#020617"
          }}>

            <button
              onClick={runCode}
              style={{
                padding:"10px 22px",
                background:"#22c55e",
                border:"none",
                borderRadius:10,
                color:"white",
                fontWeight:700,
                marginRight:10
              }}
            >
              Run Code
            </button>

            <button
              onClick={submitCode}
              style={{
                padding:"10px 22px",
                background:"#3b82f6",
                border:"none",
                borderRadius:10,
                color:"white",
                fontWeight:700
              }}
            >
              Submit Code
            </button>

          </div>

        </div>

      </div>


      {/* OUTPUT */}
      <div style={{
        marginTop:20,
        background:"#020617",
        border:"1px solid #1e293b",
        padding:20,
        borderRadius:14
      }}>

        <h3 style={{color:"#38bdf8"}}>Output</h3>

        <pre style={{color:"#e2e8f0"}}>
          {output}
        </pre>

      </div>

    </div>
  );
}