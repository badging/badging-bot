const calculateBadge = require("./calculate.badge");
const checkModerator = require("./checkModerator");
const axios = require("axios");
const {parsed: envs} = require('dotenv').config()

const endReview = async (results) => {
  let resultsObj = await calculateBadge(results);
  let message =
    "\n**Markdown Badge Link:**\n```\n" +
    resultsObj.markdownBadgeImage +
    "\n```" +
    "\n**HTML Badge Link:**\n```\n" +
    resultsObj.htmlBadgeImage +
    "\n```";

  /**********
   * add logic for bot closing issue if moderator is  in the list
   * 
   * removed it because it was redundant
   */

  await axios
    .delete(
      `${process.env.REPO_API_URL}/issues/${results.issue.number}/labels/review-begin`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "content-type": "application/json",
        },
      }
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err));

  /**********
   * add review-end label to the issue
   */

  await axios
    .post(`${process.env.REPO_API_URL}/issues/${results.issue.number}/labels`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "X-Hub-Signature": `sha256=${process.env.SECRET_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: {
        labels: ["review-end"]
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err));

  await axios
    .post(
      `${process.env.REPO_API_URL}/issues/${results.issue.number}/comments`,
      {
        body: resultsObj.markdownBadgeImage + message,
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
};

module.exports = endReview;
