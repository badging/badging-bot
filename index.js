const { App, createNodeMiddleware } = require("octokit");
require("dotenv").config();
const githubBot = require("./githubBot");
const SmeeClient = require("smee-client");

// instantiate Github App
const app = new App({
  appId: process.env.appId,
  privateKey: process.env.privateKey,
  oauth: {
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
  },
  webhooks: { secret: process.env.webhookSecret },
});

// trigger bot on receipt on any hook
app.webhooks.onAny(async ({ id, name, payload }) => {
  const octokit = await app.getInstallationOctokit(payload.installation.id);
  githubBot(id, name, octokit, payload);
});

// create local server to receive webhooks
require("http")
  .createServer(createNodeMiddleware(app))
  .listen(process.env.PORT, () =>
    console.info(`App listening on PORT:${process.env.PORT}`)
  );
module.exports = app;

//connect local server to network client in development
const smee = new SmeeClient({
  source: process.env.webhookURL,
  target: `http://localhost:${process.env.PORT}/api/github/webhooks`,
  logger: console,
});
smee.start();
