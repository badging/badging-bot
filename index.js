const { App, createNodeMiddleware } = require("octokit");
require("dotenv").config();
const githubBot = require("./githubBot");
// const initDB = require("./src/database/initDB");
const SmeeClient = require("smee-client");
// const test = require("./test");

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

/**
 * Trigger the bot commands and the database initialization
 * this works for routing too -> for the webhooks POST requests
 */
app.webhooks.onAny(async ({ id, name, payload }) => {
  const octokit = await app.getInstallationOctokit(payload.installation.id);
  githubBot(id, name, octokit, payload);
  // initDB(id, name, octokit, payload);
  // test(id, name, octokit, payload);
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
