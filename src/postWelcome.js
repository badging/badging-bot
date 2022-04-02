async function postWelcome(context) {

  var fs = require('fs');

  var applicantWelcome = fs.readFileSync("./.github/applicant-welcome.md", "utf8")


  context.github.issues.createComment(
    context.issue({ body: applicantWelcome })
  );
}

module.exports = postWelcome;
