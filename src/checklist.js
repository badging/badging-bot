const axios = require("axios");
const {reviewerWelcome,checklistVirtual} = require("../content.json")

const checklist = async(results) => {
    const reviewerMessage = '@'+results.assignee.login +' ' + reviewerWelcome + checklistVirtual

    await axios
    .post(
      `${process.env.REPO_API_URL}/issues/${results.issue.number}/comments`,
      {
        body: reviewerMessage,
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

module.exports = checklist;