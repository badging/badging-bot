const calculateBadge = require("./calculate.badge.js");

const updateReadme = async (octokit, payload) => {
  let resultsObj = await calculateBadge(octokit, payload); // get badge name

  // get date when issue was closed/when badge was assigned
  const getDate = () => {
    let date = new Date(payload.issue.closed_at);

    let day = date.getDate();
    day < 10 ? (day = "0" + day) : day;
    date.setMonth(date.getMonth()); //January is 0!
    let month = date.toLocaleString("en-US", { month: "short" });
    let year = date.getFullYear();

    return `${month}-${day}-${year}`;
  };

  // get event
  const eventName = payload.issue.title.replace(/\[(.*?)\] /gi, "");
  const eventLink = payload.issue.body
    .slice(
      payload.issue.body.indexOf("- Link to the Event Website: "),
      payload.issue.body.indexOf("- Are you an organizer ") - 2
    )
    .replace("- Link to the Event Website: ", "");
  const event = `[${eventName}](${eventLink})`;

  // get badge name
  const badge = `![${resultsObj.assignedBadge}]`;

  // get array of assignees
  const reviewers = payload.issue.assignees.map((assignee) => {
    return assignee.login;
  });

  const issueLink = payload.issue.html_url; // link to issue

  // string to help locate where to add event in README file
  const string =
    "Date        | Event name                                       | Badge              |Reviewers  |Application Issue link                                            |\n------------|-------------------------------------------------------------|---------|---------|-------------------------------------------------------------------|";

  const newEvent = `${getDate()} | ${event} | ${badge} | ${reviewers.map(
    (reviewer) => {
      return `@${reviewer}`;
    }
  )} | ${issueLink} |`; // event string

  // get README file content and sha value
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
