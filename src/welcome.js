const axios = require("axios");
const { parsed: envs } = require("dotenv").config();
const url =
  `${process.env.REPO_API_URL}/contents/.github/applicant-welcome.md` ;

// get the content in the welcome.md file 
const getContent = async (results) => {
  await axios
    .get(url, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "content-type": "application/json",
      },
    })
    .then((res) => {
      const content = Buffer.from(
        res.data.content,
        "base64"
      ).toString();
      createComment(content, results.issue.number);
    })
    .catch((err) => console.log(err));
};

// create comment in the issue with welcome message 
const createComment = async (content, issueNumber) => {
  await axios
    .post(
      `${process.env.REPO_API_URL}/issues/${issueNumber}/comments`,
      {
        body: content,
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

module.exports = {getContent}