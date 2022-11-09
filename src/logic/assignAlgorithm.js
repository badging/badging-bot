const fs = require("fs");
const path = require("path");

const assignAlgorithm = async (id, name, octokit, payload,slackBot) => {

  // post to github comment section
  await octokit.rest.issues
    .createComment({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      issue_number: payload.issue.number,
      body: "### @" +
      payload.assignee.login +
      " " +
      fs.readFileSync(
        path.join(__dirname, "../../docs/reviewOptions.md"),
        "utf8"
      ),
    })
    .then((res) => console.info(res.status))
    .catch((err) => console.error(err));

    // post to assignee's slack DM
    // await slackBot.client.chat.postMessage({
    //   channel: "U030JT05S3X",
    // type: "mrkdwn",
    // blocks: [
    //   {
    //     type: "section",
    //     text: {
    //       type: "mrkdwn",
    //       text: `hello ${payload.assignee.login}, you have been assigned an event, <${payload.issue.html_url}|${payload.issue.title.replace(/\[(.*?)\] /gi, "")}>, for DEI Badging. will you be available for this review (Please reply in less than 24 hours otherwise the review will be unassigned)`
    //     },
    //     accessory: {
    //       type: "radio_buttons",
    //       options: [
    //         {
    //           text: {
    //             type: "plain_text",
    //             text: "Yes",
    //             emoji: true
    //           },
    //           value: "value-1"
    //         },
    //         {
    //           text: {
    //             type: "plain_text",
    //             text: "No",
    //             emoji: true
    //           },
    //           value: "value-0"
    //         }
    //       ],
    //       action_id: "radio_buttons-action"
    //     }
    //   }
    // ],
    // unfurl_links: false,
    // unfurl_media: false,
    // })
};

module.exports = assignAlgorithm;
