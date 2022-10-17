const SmeeClient = require("smee-client")
require("dotenv").config();
const { App } = require('@slack/bolt');

const app = new App({
    signingSecret: process.env.slackSigningSecret,
    token: process.env.slackOAuthToken,
});

/* Add functionality here */

(async () => {
    // Start the app
    await app.start(process.env.SLACK_PORT);

    console.log('⚡️ Bolt app is running!');
})();

const slackproxy = new SmeeClient({
    source: process.env.slackWebhookURL,
    target: `http://localhost:${process.env.SLACK_PORT}`,
    logger: console,
});
slackproxy.start();


