import { useEffect,useState } from "react";
import API from "../config/api";
import AppLayout from "../components/AppLayout";

export default function Submissions(){

 const [data,setData] = useState([]);

 useEffect(()=>{
  API.get("/submissions").then(res=>setData(res.data));
 },[]);

 return(

<AppLayout
 title="Submissions"
 subtitle="Review all your verdicts and attempts"
>

   <div style={{display:"grid",gap:14}}>

    {data.map((s:any,i)=>{

     const color =
      s.verdict==="Accepted"
       ? "#22c55e"
       : s.verdict==="Wrong Answer"
       ? "#ef4444"
       : "#facc15";

     return(

      <div
       key={i}
       style={{
        display:"grid",
        gridTemplateColumns:"150px 150px 200px 1fr",
        alignItems:"center",
        padding:"18px 24px",
        borderRadius:16,
        background:"rgba(8,18,40,0.8)",
        border:"1px solid rgba(96,165,250,0.2)",
        boxShadow:"0 0 20px rgba(59,130,246,0.2)"
       }}
      >

       <div style={{fontWeight:700}}>
        Problem {s.problemId}
       </div>

       <div style={{textTransform:"capitalize"}}>
        {s.language}
       </div>

       <div style={{
        color,
        fontWeight:800
       }}>
        {s.verdict}
       </div>

       <div style={{
        color:"#94a3b8"
       }}>
        {new Date(s.createdAt).toLocaleString()}
       </div>

      </div>

     )

    })}

   </div>

</AppLayout>

 )

}