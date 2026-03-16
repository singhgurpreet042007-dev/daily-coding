import { useEffect, useState } from "react";
import API from "../config/api";
import AppLayout from "../components/AppLayout";

export default function Leaderboard(){

 const [data,setData] = useState([]);

 useEffect(()=>{
  API.get("/leaderboard").then(res=>setData(res.data));
 },[]);

 return(

<AppLayout
 title="Leaderboard"
 subtitle="Top coders ranked by solved problems"
>

  <div style={{display:"grid",gap:18}}>

   {data.map((u:any,i)=>{

    const medal =
     i===0?"🥇":
     i===1?"🥈":
     i===2?"🥉":"#"+(i+1);

    return(

     <div
      key={i}
      style={{
       display:"grid",
       gridTemplateColumns:"120px 1fr 200px",
       alignItems:"center",
       padding:"22px 28px",
       borderRadius:18,
       background:"rgba(8,18,40,0.8)",
       border:"1px solid rgba(96,165,250,0.25)",
       backdropFilter:"blur(8px)",
       boxShadow:"0 0 25px rgba(59,130,246,0.25)"
      }}
     >

      <div style={{
       fontSize:26,
       fontWeight:900,
       color:"#facc15"
      }}>
       {medal}
      </div>

      <div style={{
       fontSize:20,
       fontWeight:700
      }}>
       {u._id}
      </div>

      <div style={{
       fontWeight:700,
       color:"#60a5fa",
       fontSize:18
      }}>
       Solved {u.solved}
      </div>

     </div>

    )

   })}

  </div>

</AppLayout>

 )

}