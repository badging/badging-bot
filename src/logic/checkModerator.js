const { moderators } = require("../content.json");

const checkModerator = async (payload) => {
  let moderatorUsername = payload.issue.user.login;
  let moderatorList = moderators.split("\n");

  let list = moderatorList.filter((element) => {
    return element[0] == "-";
  });

  list = list.map(function (element) {
    return element.substring(2);
  });

  return list.includes(moderatorUsername);
};

checkModerator();
