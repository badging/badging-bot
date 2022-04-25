const {
  help,
  endReview,
  welcome,
  assignChecklist,
  getResults,
} = require("./src");

const bot = (payload) => {
  switch (payload.action) {
    case "opened":
      // welcome note
      if (
        payload.issue.title.includes("[Virtual Event]") ||
        payload.issue.title.includes("[In-Person Event]")
      ) {
        welcome(payload);
      }
      break;
    case "assigned":
      if (
        payload.issue.title.includes("[Virtual Event]") ||
        payload.issue.title.includes("[In-Person Event]")
      ) {
        assignChecklist(payload);
      }
      break;

    case "created":
      if (payload.comment.body.includes("/result")) {
        getResults(payload);
      }
      if (payload.comment.body.includes("/end")) {
        endReview(payload);
      }
      if (payload.comment.body.includes("/help")) {
        help(payload);
      }
      break;

    default:
      break;
  }
};

module.exports = bot;
