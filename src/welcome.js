const axios = require("axios");
const { parsed: envs } = require("dotenv").config();
const {applicantWelcome} = require('../content.json')


const welcome = async (results) => {
  await axios
    .post(
      `${process.env.REPO_API_URL}/issues/${results.issue.number}/comments`,
      {
        body: applicantWelcome,
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

module.exports = welcome
