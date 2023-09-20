const { App } = require("octokit");
require("dotenv").config();
const githubBot = require("./githubBot");
const express = require("express");
const logger = require("./utils/logger");
const path = require("path");
const fs = require("fs");

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

// Middleware function to log response details
app.use((req, res, next) => {
  const oldSend = res.send;
  res.send = function (data) {
    logger.info(`Response for ${req.method} ${req.url}:`);
    logger.info(data);
    oldSend.apply(res, arguments);
  };
  next();
});

app.post("/", async (req, res) => {
  const {
    headers: { "x-github-event": name },
    body: payload,
  } = req;
  const octokit = await bot.getInstallationOctokit(payload.installation.id);
  githubBot(name, octokit, payload);
  logger.info(`Received ${name} event from Github`);
  res.send("ok");
});

app.get("/logs", (req, res) => {
  const logsDir = path.join(__dirname, "logs");
  fs.readdir(logsDir, (err, files) => {
    if (err) {
      logger.error(err);
      return res.status(500).send("Error reading logs directory");
    }
    const logFiles = files.filter((file) => file.startsWith("app.log"));
    if (logFiles.length === 0) {
      return res.status(404).send("No log files found");
    }
    const logFile = path.join(logsDir, logFiles[0]);
    fs.readFile(logFile, "utf8", (err, data) => {
      if (err) {
        logger.error(err);
        return res.status(500).send("Error reading log file");
      }
      res.send(`<pre>${data}</pre>`);
    });
  });
});

app.listen(process.env.PORT, () =>
  logger.info(`App listening on PORT:${process.env.PORT}`)
);

const SmeeClient = require("smee-client");

const smee = new SmeeClient({
  source: process.env.source,
  target: `http://localhost:${process.env.PORT}`,
  logger: console,
});

smee.start();
