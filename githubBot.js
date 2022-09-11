const {
  welcome,
  getResults,
  // TODO: implement the help automation,
  endReview,
  assignAlgorithm,
  assignChecklist,
  updateReadme,
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

    /**
     * get list of assignees to check then against who has edited the options
     */
    const assignees = payload.issue.assignees
      .map((assignee) => assignee.login)
      .join(", ");

    if (
      name === "issue_comment" &&
      payload.action === "edited" &&
      assignees.includes(payload.sender.login) // check if editor is assignee
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

    // when issue is closed, update the readme with the event
    if (name === "issues" && payload.action === "closed") {
      updateReadme(octokit, payload);
    }
  } else if (
    name === "installation" &&
    payload.action === "new_permissions_accepted"
  ) {
    console.info("Event added to the event table");
  } else {
    console.info(
      `Webhook: ${name}.${payload.action} not yet automated or needed`
    );
  }
};

module.exports = githubBot;
