const calculateBadge = require("./calculateBadge");
async function commandResponse(context) {
  let reviewDetails = await calculateBadge(context);

  const message =
    "\nReview percentage: " +
    reviewDetails[2] +
    "\n" +
    "\nNumber of reviewers: " +
    reviewDetails[3] +
    "\n";

  return context.github.issues.createComment(
    context.issue({ body: reviewDetails[0] + message })
  );
}

module.exports = commandResponse;
