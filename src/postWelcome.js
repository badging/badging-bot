async function postWelcome(context) {

  var fs = require('fs');

  // Welcome message for the applicants
  var applicantWelcome = fs.readFileSync("./.github/applicant-welcome.md", "utf8")


  context.github.issues.createComment(
    context.issue({ body: applicantWelcome })
  );
}

module.exports = postWelcome;
