const getResults = require("./getResults");
const endReview = require("./endReview");
const help = require("./help");
const welcome = require("./welcome");
const assignAlgorithm = require("./assignAlgorithm");
const assignChecklist = require("./assignChecklist");
const updateReadme = require("./updateReadme");
const pingAdmin = require("./pingAdmin");

module.exports = {
  welcome,
  help,
  getResults,
  endReview,
  assignAlgorithm,
  assignChecklist,
  updateReadme,
  pingAdmin,
};
