const calculateBadge = require("./calculate.badge");
const { issueComment } = require("./routes");

const getResults = async (results) => {
  const resultsArray = await calculateBadge(results);
  const message =
    "\nReview percentage: " +
    resultsArray.reviewResult +
    "\n" +
    "\nNumber of reviewers: " +
    resultsArray.reviewerCount +
    "\n";

  return await issueComment(results, resultsArray.markdownBadgeImage + message);
};

module.exports = getResults;
