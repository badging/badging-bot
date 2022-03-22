const {getResults,help,endReview,welcome} = require("./src")

const bot = (results) => {
  // welcome note
  if (
    (results.action === "opened" &&
      results.issue.title.includes("[Virtual Event]")) ||
    results.issue.title.includes("[In-Person Event]")
  ) {
    welcome(results);
  }

  if (
    (results.action === "assigned" &&
      results.issue.title.includes("[Virtual Event]")) ||
    results.issue.title.includes("[In-Person Event]")
  ) {
    checklist(results);
  }

  if (results.action === "created") {
    if (results.comment.body.includes("/result")) {
      getResults(results);
    }
    if (results.comment.body.includes("/end")) {
      endReview(results);
    }
    if (results.comment.body.includes("/help")) {
      help(results);
    }
  }
};

module.exports = bot;
