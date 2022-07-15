const { App, createNodeMiddleware } = require('octokit')
const { parsed: envs } = require("dotenv").config();
const SmeeClient = require("smee-client");
const { welcome, assignChecklist, getResults, help,endReview } = require("./src/index");

// instantiate Github App
const app = new App({
  appId: envs.appId,
  privateKey: envs.privateKey,
  oauth: {
    clientId: envs.clientId,
    clientSecret: envs.clientSecret,
  },
  webhooks: { secret: envs.webhookSecret },
});

// bot algorithm
app.webhooks.on("issues.opened", async ({ octokit, payload }) => {
  welcome(octokit, payload);
})

app.webhooks.on("issues.assigned", async ({ octokit, payload }) => {
  assignChecklist(octokit, payload)
})

app.webhooks.on("issue_comment.created", async ({ octokit, payload }) => {
  console.log(payload)
  if (payload.comment.body.includes("/result")) {
    getResults(octokit, payload);
  }

  if (payload.comment.body.includes("/end")) {
    endReview(octokit, payload);
  }

  if (payload.comment.body.includes("/help")) {
    help(octokit, payload);
  }
})

// create local server to receive webhooks
require("http").createServer(createNodeMiddleware(app)).listen(envs.PORT);


//connect local server to network client in development
if (process.env.NODE_ENV !== "production") {
  const smee = new SmeeClient({
    source: "https://smee.io/badging",
    target: `http://localhost:${process.env.PORT}/api/github/webhooks`,
    logger: console,
  });
  smee.start();
}