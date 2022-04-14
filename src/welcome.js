const { applicantWelcome } = require("../content.json");
const { issueComment } = require("./routes");

const welcome = async (results) => {
  await issueComment(results, applicantWelcome);
};

module.exports = welcome;
