const welcome = async (octokit, payload, slackBot) => {
  const {
    data: { content },
  } = await octokit.rest.repos.getContent({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    path: ".github/applicant-welcome.md",
  });

  await octokit.rest.issues
    .createComment({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      issue_number: payload.issue.number,
      body: Buffer.from(content, "base64").toString(),
    })
    .then((res) => console.info(res.status))
    .catch((err) => console.error(err));

    const message = `Hey, <${payload.sender.html_url}|@${payload.sender.login}> just submitted an event, <${payload.issue.html_url}|${payload.issue.title.replace(/\[(.*?)\] /gi, "")}>, for review. Please make sure you assign it appropriately and as soon as possible.`

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

};

module.exports = welcome;
