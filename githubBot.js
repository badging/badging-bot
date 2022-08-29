const {
  welcome,
  getResults,
  help,
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

    // when issue is assign, triger the assign algorithm
    if (name === "issues" && payload.action === "assigned") {
      assignAlgorithm(id, name, octokit, payload);
    }

    // when assignee picks an option

    //TODO: Implement to 24hours lapse
    //TODO: check whether editor is assignee
    if (
      name === "issue_comment" &&
      payload.action === "edited" &&
      payload.issue.assignee.login === payload.sender.login
    ) {
      if (payload.comment.body.match(/- \[x\] Yes/g)) {
        assignChecklist(octokit, payload); // assign checklist
      } else if (payload.comment.body.match(/- \[x\] No/g)) {
        console.log(payload.issue.assignee.login);
      }
    }
  }
};

module.exports = githubBot;
