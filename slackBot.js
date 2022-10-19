const SmeeClient = require("smee-client")
require("dotenv").config();
const { App } = require('@slack/bolt');

const app = new App({
    signingSecret: process.env.slackSigningSecret,
    token: process.env.slackOAuthToken,
    socketMode: true,
    appToken: process.env.slackBoltToken,
    port: process.env.SLACK_PORT
});

(async () => {
    // Start the app
    await app.start(process.env.SLACK_PORT);
    console.log(`⚡️ Slack Bot is running on ${process.env.SLACK_PORT}!`);
})();

module.exports = app;