const assignChecklist = async (octokit, payload) => {
  let content;
  payload.issue.title.substring(0, 15) == "[Virtual Event]" ?
    { data: { content } } = await octokit.rest.repos.getContent({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      path: ".github/checklistVirtual.md"
    })
    :
    { data: { content } } = await octokit.rest.repos.getContent({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      path: ".github/checklist.md"
    })

    const reviewerGuide = await octokit.rest.repos.getContent({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      path: ".github/reviewer-welcome.md"
    })

    const reviewerWelcome = Buffer.from(reviewerGuide.data.content,"base64").toString()


  const heading = `# Checklist for @${payload.assignee.login}`;

  let reviewerMessage =
    "@" + payload.assignee.login + " " + reviewerWelcome + Buffer.from(content, "base64").toString()


  await octokit.rest.issues.createComment({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    issue_number: payload.issue.number,
    body: heading + "\n" + reviewerMessage
  }).then((res) => console.log(res.status)).catch(err => console.error(err))

  if (payload.issue.assignees.length == 2) {
    await octokit.rest.issues.addLabels({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      issue_number: payload.issue.number,
      labels: ["review-begin"]
    }).then((res) => console.log(res.status)).catch(err => console.error(err))
  }

}

module.exports = assignChecklist;
