async function postWelcome(context) {

  var fs1 = require('fs');

  var applicantWelcome = fs1.readFileSync("./.github/applicant-welcome.md", "utf8")


  context.github.issues.createComment(
    context.issue({ body: applicantWelcome })
  );
}

module.exports = postWelcome;
