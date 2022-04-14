const { issueComment, addLabel } = require("./routes");
const {
  reviewerWelcome,
  checklistVirtual,
  checklist,
} = require("../content.json");

const assignChecklist = async (results) => {
  const heading = `# Checklist for @${results.assignee.login}`;
  let reviewerMessage;
  results.issue.title.substring(0, 15) == "[Virtual Event]"
    ? (reviewerMessage =
        "@" + results.assignee.login + " " + reviewerWelcome + checklistVirtual)
    : (reviewerMessage =
        "@" + results.assignee.login + " " + reviewerWelcome + checklist);

  await issueComment(results, heading + "\n" + reviewerMessage);

  if (results.issue.assignees.length == 2) {
    await addLabel(results, ["review-begin"]);
  }
};

module.exports = assignChecklist;
