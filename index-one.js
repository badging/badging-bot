const {getContent} = require('./src/welcome');
const checklist = require('./src/checklist')

const bot = results => {
    // welcome note
    if (results.action === "opened" && results.issue.title.includes("[Virtual Event]") || results.issue.title.includes("[In-Person Event]")) {
        getContent(results);


      }
    
      if (results.action === "assigned" && results.issue.title.includes("[Virtual Event]") || results.issue.title.includes("[In-Person Event]")) {
        checklist(results);


      }
}

module.exports = bot;