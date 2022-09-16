const mongoose = require("mongoose");
const { reviewerSchema } = require("./schema/index");
require("dotenv").config();

const initDB = async (id, name, octokit, payload) => {
  // connect to the database
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.info(`Connected to the database`);
    })
    .catch((err) => console.error(err));

  /**
   * request for reviewers
   * reviewers are the users who can be assigned an issue on the repo.
   * This includes anyone who has commented on the issue or pull request,
   * anyone with write permissions to the repository,
   * and organization members with read permissions to the repository.
   */
  const { data } = await octokit.rest.issues.listAssignees({
    owner: "badging",
    repo: payload.repository.name,
  });

  // add reviewers and details to the database

  data.map(async (assignee) => {
    await reviewerSchema
      .create({
        id: assignee.id,
        githubUsername: assignee.login,
      })
      .then(() => {
        console.info(`Added ${assignee.login} to the database`);
      })
      .catch((err) => console.error(err));
  });
};
module.exports = initDB;
