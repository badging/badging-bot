// async function checkModerator(context) {
//   let moderatorUsername = context.payload.issue.user.login;
//   let moderatorListDocument = await context.github.repos.getContents(
//     context.repo({ path: ".github/moderators.md" })
//   );

//   let moderatorList = Buffer.from(
//     moderatorListDocument.data.content,
//     "base64"
//   ).toString();
//   moderatorList = moderatorList.split("\n");

//   let list = moderatorList.filter(element => {
//     return element[0] == "-";
//   });

//   list = list.map(function(element) {
//     return element.substring(2);
//   });

//   return list.includes(moderatorUsername);
// }

// module.exports = checkModerator;

const {moderators} = require("../content.json")

const checkModerator= async(results) => {
  let moderatorUsername = results.issue.user.login;
  moderatorList = moderators.split("\n");

  let list = moderatorList.filter(element => {
    return element[0] == "-";
  });

  list = list.map(function(element) {
    return element.substring(2);
  });

  return list.includes(moderatorUsername);
}

module.exports = checkModerator;
