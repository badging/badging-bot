const postWelcome = require("./src/postWelcome");
const postChecklist = require("./src/postChecklist");
const commandResponse = require("./src/commandResponse");
const endReview = require("./src/endReview");
const commands = require("probot-commands");
const postHelp = require("./src/postHelp");
const assignReviewers = require("./src/assignReviewers");

module.exports = app => {
  //app.on("issues.opened", postWelcome);
  //app.on("issues.opened", assignReviewers);
  app.on("issues.opened", async (context) => {
    if (context.payload.issue.title.includes("[Virtual Event]") || context.payload.issue.title.includes("[In-Person Event]")) {
      postWelcome(context);
      //assignReviewers(context);
    }
  });
  app.on("issues.assigned", async (context) => {
    if (context.payload.issue.title.includes("[Virtual Event]") || context.payload.issue.title.includes("[In-Person Event]")) {
      postChecklist(context);
    }
  });
  //app.on("issues.assigned", postChecklist);
  commands(app, "result", commandResponse);
  commands(app, "end", endReview);
  commands(app, "help", postHelp);
};
