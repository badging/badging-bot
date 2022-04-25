const { issueComment, addLabel } = require("./routes");
const {
  reviewerWelcome,
  checklistVirtual,
  checklist,
} = require("../content.json");

const assignChecklist = async (payload) => {
  const heading = `# Checklist for @${payload.assignee.login}`;
  let reviewerMessage;
  payload.issue.title.substring(0, 15) == "[Virtual Event]"
    ? (reviewerMessage =
        "@" + payload.assignee.login + " " + reviewerWelcome + checklistVirtual)
    : (reviewerMessage =
        "@" + payload.assignee.login + " " + reviewerWelcome + checklist);

  await issueComment(payload, heading + "\n" + reviewerMessage);

  if (payload.issue.assignees.length == 2) {
    await addLabel(payload, ["review-begin"]);
  }
};

module.exports = assignChecklist;
