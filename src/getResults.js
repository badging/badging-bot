const calculateBadge = require("./calculate.badge");
const axios = require("axios");
const getResults = async results => {
  const resultsArray = await calculateBadge(results)
  const message = "\nReview percentage: " +
  resultsArray.reviewResult +
  "\n" +
  "\nNumber of reviewers: " +
  resultsArray.reviewerCount +
  "\n";
    

  return await axios
    .post(
      `${process.env.REPO_API_URL}/issues/${results.issue.number}/comments`,
      {
        body: resultsArray.markdownBadgeImage+message,
      },
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "content-type": "application/json",
        },
      }
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

module.exports = getResults;
