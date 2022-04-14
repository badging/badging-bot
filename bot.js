const {
  getResults,
  help,
  endReview,
  welcome,
  assignChecklist,
} = require("./src");

const bot = (results) => {
  switch (results.action) {
    case "opened":
      // welcome note
      if (
        results.issue.title.includes("[Virtual Event]") ||
        results.issue.title.includes("[In-Person Event]")
      ) {
        welcome(results);
      }
      break;
    case "assigned":
      if (
        results.issue.title.includes("[Virtual Event]") ||
        results.issue.title.includes("[In-Person Event]")
      ) {
        assignChecklist(results);
      }
      break;

    case "created":
      if (results.comment.body.includes("/result")) {
        getResults(results);
      }
      if (results.comment.body.includes("/end")) {
        endReview(results);
      }
      if (results.comment.body.includes("/help")) {
        help(results);
      }
      break;

    default:
      break;
  }
};

module.exports = bot;
