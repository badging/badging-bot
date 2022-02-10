var output
var fs = require('fs')

function writeList(output) {
  console.log(output);
  fs.writeFileSync('/app/src/reviewers.json', output);
  console.log("***************************FINISHED");
}

async function assignReviewers(context) {

  /*
  const reviewerListDocument = await context.github.repos.getContents(
    context.repo({ path: ".github/reviewers.json" })
  );

  let reviewerList = JSON.parse(Buffer.from(
    reviewerListDocument.data.content,
    "base64"
  ));
  */

 var reviewerList
 fs.readFile('/app/src/reviewers.json', 'utf8', function (err, data) {
  if (err) throw err;
  console.log("DATA");
  console.log(data)
  reviewerList = JSON.parse(data);

  console.log("----------------" + JSON.stringify(reviewerList))
  //reviewerList = reviewerList.reviewers;
  //console.log("----------------" + JSON.stringify(reviewerList))
  //reviewerList = reviewerList.split("\n");

  /*
  let filteredList = reviewerList.filter(function(element) {
    return element[0] == "-";
  });

  length = filteredList.length;
  let usernameIndex = getRandomIndexes(0, length - 1);

  let list = filteredList.map(function(element) {
    return element.substring(2);
  });

  console.log(list);
  let assigneeList = [list[usernameIndex[0]], list[usernameIndex[1]]];
  */
  // Thanks to https://medium.com/@asadise/sorting-a-json-array-according-one-property-in-javascript-18b1d22cd9e9
  function sortByProperty(property){
   return function(a,b){
      if(a[property] > b[property])
         return 1;
      else if(a[property] < b[property])
         return -1;
      return 0;
    }
  }

  reviewerList.sort(sortByProperty("count"))

  console.log("----------------" + JSON.stringify(reviewerList))

  let assigneeList = [reviewerList[0].name, reviewerList[1].name]

  console.log("-----------------------------" + assigneeList)

  reviewerList[0].count++;
  reviewerList[1].count++;

  output = JSON.stringify(reviewerList)

  writeList(output);
  /*
  output = beautify(reviewerList)

  fs.writeFileSync('reviewers.json', output);

  fs.writeFile('reviewers.JSON', output, (err) => {
    if (err) throw err;
    console.log('Reviewer List Rewritten');
  });
  */

  console.log("----------------" + JSON.stringify(reviewerList))

  const commentContent = context.issue({ assignees: assigneeList });
  return context.github.issues.addAssignees(commentContent);
 });
}

function getRandomIndexes(min, max) {
  let indexOne = Math.floor(Math.random() * (max - min + 1)) + min;
  let indexTwo = Math.floor(Math.random() * (max - min + 1)) + min;

  while (indexOne == indexTwo) {
    indexTwo = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return [indexOne, indexTwo];

}


module.exports = assignReviewers;
