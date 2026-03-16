const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({

  userId: String,
  problemId: String,
  language: String,
  code: String,
  verdict: String,

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Submission", submissionSchema);