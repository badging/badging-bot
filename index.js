const { App } = require("octokit");
require("dotenv").config();
const githubBot = require("./githubBot");
const express = require("express");

const app = express();
app.use(express.json());

// instantiate Github App
const bot = new App({
  appId: process.env.appId,
  privateKey: process.env.privateKey,
  oauth: {
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
  },
  webhooks: { secret: process.env.webhookSecret },
});

app.post('/', async (req, res) => {
  const { headers: { 'x-github-event': name }, body: payload } = req;
  const octokit = await bot.getInstallationOctokit(payload.installation.id);
  githubBot(name, octokit, payload);
  res.send('ok');
});

app.listen(process.env.PORT, () =>
  console.info(`App listening on PORT:${process.env.PORT}`)
);

