const {getContent} = require('./src/welcome');

const bot = results => {
    // welcome note
    if (results.action === "opened" && results.issue.title.includes("[Virtual Event]") || results.issue.title.includes("[In-Person Event]")) {
        getContent(results);
        
        /*************
         * we could also assign reviewers here
         */
      }

    
}

module.exports = bot;