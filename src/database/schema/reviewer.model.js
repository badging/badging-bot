const mongoose = require("mongoose");

const reviewerSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  githubUsername: { type: String, required: true },
  // slack: {type: String, required: true},
  // email: {type: String, required: true},
  eventReviews: [
    {
      eventName: { type: String, required: true },
      reviewDate: { type: Date, required: true },
      badge: { type: String, required: true },
      reviewResult: { type: String, required: true },
    },
  ],
  // currentReview: {type: String, required: true},
  // lastLogin: {type: Date, required: true}
});

module.exports = mongoose.model("reviewer", reviewerSchema);
