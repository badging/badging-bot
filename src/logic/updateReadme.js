const calculateBadge = require("./calculate.badge.js");

const updateReadme = async (octokit, payload) => {
  let resultsObj = await calculateBadge(octokit, payload);
  const getDate = () => {
    let date = new Date(payload.issue.closed_at);
    date.setMonth(date.getMonth()); //January is 0!
    let day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }

    date =
      date.toLocaleString("en-US", { month: "short" }) +
      "-" +
      day +
      "-" +
      date.getFullYear();
    return date;
  };
  const eventName = payload.issue.title.replace(/\[(.*?)\] /gi, "");
  const eventLink =
    "[" +
    eventName +
    "](" +
    payload.issue.body
      .slice(
        payload.issue.body.indexOf("- Link to the Event Website: "),
        payload.issue.body.indexOf("- Are you an organizer ") - 2
      )
      .replace("- Link to the Event Website: ", "") +
    ")";
  const badge = "![" + resultsObj.assignedBadge + "]";
  const reviewers = payload.issue.assignees.map((assignee) => {
    return assignee.login;
  });
  const issueLink = payload.issue.html_url;

  // string to help locate where to add event in README file
  const string =
    "Date        | Event name                                       | Badge              |Reviewers  |Application Issue link                                            |\n------------|-------------------------------------------------------------|---------|---------|-------------------------------------------------------------------|";

  const newEvent =
    getDate() +
    "|" +
    eventLink +
    "|" +
    badge +
    "|" +
    reviewers.map((reviewer) => {
      return "@" + reviewer + " ";
    }) +
    "|" +
    issueLink;

  const {
    data: { sha, content },
  } = await octokit.rest.repos.getContent({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    path: "README.md",
  });

  const readme = Buffer.from(content, "base64").toString(); // convert README content to string

  // add new event to README
  const newReadme =
    readme.slice(0, readme.indexOf(string) + string.length) +
    "\n" +
    newEvent +
    readme.slice(readme.indexOf(string) + string.length - 1);

  await octokit.rest.repos
    .createOrUpdateFileContents({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      path: "README.md",
      sha: sha,
      message: `Added ${eventName} to README.md file`,
      content: Buffer.from(newReadme, "utf8").toString("base64"),
    })
    .then((res) => console.info(res.status))
    .catch((err) => console.error(err));
};

module.exports = updateReadme;
