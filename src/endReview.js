const calculateBadge = require('./calculate.badge')
const endReview = async (octokit, payload) => {
  let resultsObj = await calculateBadge(octokit, payload);
  let message =
    "\n**Markdown Badge Link:**\n```\n" +
    resultsObj.markdownBadgeImage +
    "\n```" +
    "\n**HTML Badge Link:**\n```\n" +
    resultsObj.htmlBadgeImage +
    "\n```";

  /**********
   * add logic for bot closing issue if moderator is  in the list
   *
   * removed it because it was redundant
   */

  await octokit.rest.issues.removeLabel({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    issue_number: payload.issue.number,
    name: "review-begin"
  })

  await octokit.rest.issues.addLabels({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      issue_number: payload.issue.number,
      labels: ["review-end"]
    })

  await octokit.rest.issues.createComment({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    issue_number: payload.issue.number,
    body: resultsObj.markdownBadgeImage + message
  }).then((res) => console.log(res.status)).catch(err => console.error(err))

};

module.exports = endReview;
