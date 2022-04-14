const axios = require("axios");
const { parsed: envs } = require("dotenv").config();

const headers = {
  Authorization: `token ${envs.BOT_TOKEN}`,
  Accept: "application/vnd.github.v3+json",
  "content-type": "application/json",
};

const routes = {
  //comment on issue
  issueComment: (results, body) => {
    axios
      .post(
        `https://api.github.com/repos/${results.repository.full_name}/issues/${results.issue.number}/comments`,
        {
          body: body,
        },
        {
          headers: headers,
        }
      )
      .then(() => console.info("comment added"))
      .catch((err) => console.error(err));
  },

  // add label to issue
  addLabel: (results, labels) => {
    axios
      .post(
        `https://api.github.com/repos/${results.repository.full_name}/issues/${results.issue.number}/labels`,
        {
          headers: headers,
          body: labels,
        }
      )
      .then(() => console.info("label(s) added"))
      .catch((err) => console.error(err));
  },

  // remove label from issue
  removeLabel: (results, label) => {
    axios
      .delete(
        `https://api.github.com/repos/${results.repository.full_name}/issues/${results.issue.number}/labels/${label}`,
        {
          headers: headers,
        }
      )
      .then(() => console.info("label(s) removed"))
      .catch((err) => console.error(err));
  },
};

module.exports = routes;
