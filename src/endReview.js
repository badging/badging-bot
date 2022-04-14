const calculateBadge = require("./calculate.badge");
// const checkModerator = require("./checkModerator");
const { addLabel, issueComment, removeLabel } = require("./routes");

const endReview = async (results) => {
  let resultsObj = await calculateBadge(results);
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

  await removeLabel(results, "review-begin");
  await addLabel(results, ["review-end"]);
  await issueComment(results, resultsObj.markdownBadgeImage + message);
};

module.exports = endReview;
