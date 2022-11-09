const pingAdmin = async (octokit, payload, slackBot) => {
    const message = `Hey, <${payload.sender.html_url}|@${payload.sender.login}> just complicated their review of the <${payload.issue.html_url}|${payload.issue.title.replace(/\[(.*?)\] /gi, "")}> event. Please check it out for a final review and issue an \`/end\` command in the comment section if everything is okay. Thanks :smile:`

    // message Ruth
   await slackBot.client.chat.postMessage({
    channel: "D030XKUFR6E",
    type: "mrkdwn",
    blocks: [{
        type: "section",
        text: {
          type: "mrkdwn",
          text: message,
        }
    }],
    unfurl_links: false,
    unfurl_media: false,
   })

    // message Elizabeth
    await slackBot.client.chat.postMessage({
      channel: "D0327865EF5",
      type: "mrkdwn",
      blocks: [{
          type: "section",
          text: {
            type: "mrkdwn",
            text: message,
          }
      }],
      unfurl_links: false,
      unfurl_media: false,
     })

     // message me (for testing)
     await slackBot.client.chat.postMessage({
      channel: "U030JT05S3X",
      type: "mrkdwn",
      blocks: [{
          type: "section",
          text: {
            type: "mrkdwn",
            text: message,
          }
      }],
      unfurl_links: false,
      unfurl_media: false,
     })

}


module.exports = pingAdmin;
