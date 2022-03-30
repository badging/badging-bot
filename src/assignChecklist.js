const axios = require("axios");
const {
  reviewerWelcome,
  checklistVirtual,
  checklist,
} = require("../content.json");

const assignChecklist = async (results) => {
  let reviewMessage;
  results.issue.title.substring(0, 15) == "[Virtual Event]"
    ? (reviewerMessage =
        "@" + results.assignee.login + " " + reviewerWelcome + checklistVirtual)
    : (reviewerMessage =
        "@" + results.assignee.login + " " + reviewerWelcome + checklist);

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

    if (results.issue.assignees.length == 2) {
      await axios
    .post(`&{process.env.REPO_API_URL}/issues/${results.issue.number}/labels`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "content-type": "application/json",
      },
      body: ["review-begin"],
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err));
    }
};

module.exports = assignChecklist;
