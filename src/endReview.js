const calculateBadge = require("./calculate.badge");
const checkModerator = require("./checkModerator");
const axios = require("axios");

const endReview = async results => {
  let message = await calculateBadge(results).then(res => {
    "\n**Markdown Badge Link:**\n```\n" +
    res[0] +
    "\n```" +
    "\n**HTML Badge Link:**\n```\n" +
    res[1] +
    "\n```";
  })
  if ((await checkModerator(results)) == true){
    await axios
    .patch(
      `&{process.env.REPO_API_URL}/issues/${results.issue.number}`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "content-type": "application/json",
        },
        state: "closed"
      }
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err));
  }

  await axios
    .delete(
      `&{process.env.REPO_API_URL}/issues/${results.issue.number}/labels/review-begin`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "content-type": "application/json",
        }
      }
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err));

    await axios
    .post(
      `&{process.env.REPO_API_URL}/issues/${results.issue.number}/labels`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "content-type": "application/json",
        },
        body: ["review-end"]
      }
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err));


  return await axios
    .post(
      `${process.env.REPO_API_URL}/issues/${results.issue.number}/comments`,
      {
        body: reviewDetails[0] + message,
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

module.exports = endReview;
