const {
  welcome,
  getResults,
  // help,
  endReview,
  assignAlgorithm,
  assignChecklist,
} = require("./src/logic/index");

const githubBot = async (id, name, octokit, payload) => {
  // perform actions on application issues only
  if (
    payload.issue.title.includes("[Virtual Event]") ||
    payload.issue.title.includes("[In-Person Event]")
  ) {
    // when applicant issue is open, welcome the applicant
    if (name === "issues" && payload.action === "opened") {
      welcome(octokit, payload);
    }

    // when issue is assigned, triger the assign algorithm
    if (name === "issues" && payload.action === "assigned") {
      assignAlgorithm(id, name, octokit, payload);
    }

    // when assignee picks an option

    //TODO: Implement to 24hours lapse
    //TODO: check whether editor is assignee
    //TODO: Implement the toggle button for Yes and No to avoid double checks
    if (
      name === "issue_comment" &&
      payload.action === "edited" &&
      payload.issue.assignee.login === payload.sender.login
    ) {
      if (payload.comment.body.match(/- \[x\] Yes/g)) {
        assignChecklist(octokit, payload); // assign checklist
      } else if (payload.comment.body.match(/- \[x\] No/g)) {
        await octokit.rest.issues
          .removeAssignees({
            owner: payload.repository.owner.login,
            repo: payload.repository.name,
            issue_number: payload.issue.number,
            assignees: [payload.issue.assignee.login],
          })
          .then((res) => console.info(res.status))
          .catch((err) => console.error(err));
      }
    }

    // comment commands
    if (name === "issue_comment" && payload.action === "created") {
      // get results
      if (payload.comment.body.match("/result")) {
        getResults(octokit, payload);
      }

      // end review
      if (payload.comment.body.match("/end")) {
        endReview(octokit, payload);
      }
    }
  }
};

module.exports = githubBot;
