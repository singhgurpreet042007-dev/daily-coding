const express = require("express");
const Submission = require("../models/Submission");

const router = express.Router();

router.get("/:user", async (req,res)=>{

 const user = req.params.user;

 try{

  const submissions = await Submission.find({userId:user});

  const accepted = submissions.filter(s=>s.verdict==="Accepted");

  const solvedProblems = [...new Set(accepted.map(s=>s.problemId))];

  res.json({
    totalSubmissions: submissions.length,
    solved: solvedProblems.length,
    solvedProblems
  });

 }catch(err){

  console.log(err);
  res.json({});

 }

});

module.exports = router;