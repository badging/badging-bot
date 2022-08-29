const fs = require("fs");
const path = require("path");

const assignAlgorithm = async (id, name, octokit, payload) => {
  await octokit.rest.issues
    .createComment({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      issue_number: payload.issue.number,
      body:
        "### @" +
        payload.assignee.login +
        " " +
        fs.readFileSync(
          path.join(__dirname, "../../docs/reviewOptions.md"),
          "utf8"
        ),
    })
    .then((res) => console.info(res.status))
    .catch((err) => console.error(err));

  //     if (payload.comment.body.match(/- \[x\] Yes/g)){
  //         assignChecklist(octokit,payload)
  //     }
  //   console.log(payload.comment.body)
};

module.exports = assignAlgorithm;
