const { App, createNodeMiddleware } = require("octokit");
require("dotenv").config();
const githubBot = require("./githubBot");

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
  await payload;
  const octokit = await app.getInstallationOctokit(payload.installation.id);
  githubBot(name, octokit, payload);
});

// create local server to receive webhooks
require("http")
  .createServer(createNodeMiddleware(app))
  .listen(process.env.PORT, () =>
    console.info(`App listening on PORT:${process.env.PORT}`)
  );

