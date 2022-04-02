function postChecklist(context) {
  const heading = `# Checklist for @${context.payload.assignee.login}`;


  var fs = require('fs');


  var reviewerWelcome = fs.readFileSync("./.github/reviewer-welcome.md", "utf8")


  const title = context.payload.issue.title;


  var checklist = fs.readFileSync("./.github/checklist.md", "utf8")



  if (title.substring(0, 15) == "[Virtual Event]") {

    checklist = fs.readFileSync("./.github/checklist-virtual.md", "utf8")

  }

  // Final reviewer message
  var reviewerMessage = heading + "\n" + reviewerWelcome + checklist;

  context.github.issues.createComment(
    context.issue({ body: reviewerMessage })
  );

  if (context.payload.issue.assignees.length == 2) {
    context.github.issues.addLabels(
      context.issue({ labels: ["review-begin"] })
    );
  }
}

module.exports = postChecklist;