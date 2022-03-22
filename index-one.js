const {getContent} = require('./src/welcome');
const help = require('./src/help');
const checklist = require('./src/checklist')

const bot = results => {
    // welcome note
    if (results.action === "opened" && results.issue.title.includes("[Virtual Event]") || results.issue.title.includes("[In-Person Event]")) {
        getContent(results);


      }
    
      if (results.action === "assigned" && results.issue.title.includes("[Virtual Event]") || results.issue.title.includes("[In-Person Event]")) {
        checklist(results);


      }

    if(results.action === 'created') {
        if(results.comment.body.includes('/result')) {
            getResults(results);
        }
        if(results.comment.body.includes('/end')) {
          endReview(results);
      }
      if(results.comment.body.includes('/help')) {
        help(results);
    }
    }
}

module.exports = bot;