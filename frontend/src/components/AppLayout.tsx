import { Link, useLocation } from "react-router-dom";
import {
 FaHome,
 FaCode,
 FaTrophy,
 FaHistory,
 FaUser
} from "react-icons/fa";

export default function AppLayout({
 title,
 subtitle,
 children
}:{
 title:string
 subtitle:string
 children:React.ReactNode
}){

const location = useLocation();

const nav = [
 {name:"Dashboard",path:"/dashboard",icon:<FaHome/>},
 {name:"Problems",path:"/problems",icon:<FaCode/>},
 {name:"Leaderboard",path:"/leaderboard",icon:<FaTrophy/>},
 {name:"Submissions",path:"/submissions",icon:<FaHistory/>},
 {name:"Profile",path:"/profile",icon:<FaUser/>}
]

return(

<div style={{
 display:"flex",
 minHeight:"100vh",
 background:"#020617"
}}>


{/* SIDEBAR */}

<div style={{
 width:270,
 background:"linear-gradient(180deg,#020617,#030b1a)",
 padding:30,
 borderRight:"1px solid rgba(96,165,250,.15)",
 boxShadow:"0 0 40px rgba(59,130,246,.2)"
}}>

<h2 style={{
 color:"#60a5fa",
 fontWeight:900,
 fontSize:24,
 marginBottom:40
}}>
JudgeNest
</h2>

<div style={{
 display:"grid",
 gap:16
}}>

{nav.map(n=>{

const active = location.pathname===n.path;

return(

<Link
key={n.name}
to={n.path}
style={{textDecoration:"none"}}
>

<div style={{
 display:"flex",
 alignItems:"center",
 gap:12,
 padding:"13px 18px",
 borderRadius:14,
 fontWeight:700,
 color: active ? "#fff" : "#cbd5f5",
 background: active
  ? "linear-gradient(90deg,#2563eb,#60a5fa)"
  : "transparent",
 boxShadow: active
  ? "0 0 25px rgba(59,130,246,.7)"
  : "none",
 transition:"0.25s",
 cursor:"pointer"
}}

className="sidebar-item"
>

<span style={{
 fontSize:18,
 display:"flex",
 alignItems:"center"
}}>
{n.icon}
</span>

{n.name}

</div>

</Link>

)

})}

</div>

</div>


{/* MAIN CONTENT */}

<div style={{
 flex:1,
 padding:"40px 50px",
 background:"radial-gradient(circle at top,#0f172a,#020617)"
}}>

<h1 style={{
 fontSize:42,
 fontWeight:900,
 marginBottom:6,
 background:"linear-gradient(90deg,#ffffff,#60a5fa,#facc15)",
 WebkitBackgroundClip:"text",
 color:"transparent"
}}>
{title}
</h1>

<p style={{
 color:"#94a3b8",
 marginBottom:30
}}>
{subtitle}
</p>

{children}

</div>

</div>

)

}