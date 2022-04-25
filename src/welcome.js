const { applicantWelcome } = require("../content.json");
const { issueComment } = require("./routes");

const welcome = async (payload) => {
  await issueComment(payload, applicantWelcome);
};

module.exports = welcome;
