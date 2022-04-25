const calculateBadge = require("./calculate.badge");
const { issueComment } = require("./routes");

const getResults = async (payload) => {
  const resultsArray = await calculateBadge(payload);
  const message =
    "\nReview percentage: " +
    resultsArray.reviewResult +
    "\n" +
    "\nNumber of reviewers: " +
    resultsArray.reviewerCount +
    "\n";

  return await issueComment(payload, resultsArray.markdownBadgeImage + message);
};

module.exports = getResults;
