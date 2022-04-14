const axios = require("axios");
const fs = require("fs");
const { parsed: envs } = require("dotenv").config();
const url = `${process.env.REPO_API_URL}/contents/.github/`;

const content = async () => {
  const contentFile = {};
  // eslint-disable-next-line no-unused-vars
  let counter = 0;
  await axios
    .get(url, {
      headers: {
        Authorization: `token ${envs.BOT_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "content-type": "application/json",
      },
    })
    .then((res) => {
      res.data.forEach(async (item) => {
        counter++;
        await axios
          .get(url + item.name, {
            headers: {
              Authorization: `token ${envs.BOT_TOKEN}`,
              Accept: "application/vnd.github.v3+json",
              "content-type": "application/json",
            },
          })
          .then((res) => {
            let fileName = item.name.replace(".md", "");
            contentFile[fileName] = Buffer.from(
              res.data.content,
              "base64"
            ).toString();
          });
        fs.writeFileSync("content.json", JSON.stringify(contentFile));
      });
    });
};

content();
