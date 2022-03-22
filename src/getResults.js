const calculateBadge = require("./calculate.badge");
const getResults = async results => {
  const message = await calculateBadge(results).then(res=>{
    "\nReview percentage: " +
    res[2] +
    "\n" +
    "\nNumber of reviewers: " +
    res[3] +
    "\n";
  })
    

  return await axios
    .post(
      `${process.env.REPO_API_URL}/issues/${results.issue.number}/comments`,
      {
        body: reviewDetails[0]+message,
      },
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "content-type": "application/json",
        },
      }
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

module.exports = getResults;
