const axios = require("axios");
const fs = require("fs")
const { parsed: envs } = require("dotenv").config();
const url = `${process.env.REPO_API_URL}/contents/.github/`;

const content = async() => {
    const contentFile = {};
    counter = 0;
    await axios.get(url, {
        headers: {
            Authorization: `token ${process.env.BOT_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
            "content-type": "application/json",
          },
    })
    .then(res => {
        res.data.forEach(async(item)=>{
            counter++;
                await axios.get(url+item.name,{
                    headers: {
                    Authorization: `token ${process.env.BOT_TOKEN}`,
                    Accept: "application/vnd.github.v3+json",
                    "content-type": "application/json",
                },
            })
            .then(res=>{
                fileName = item.name.replace(".md","")
                contentFile[fileName] = Buffer.from(res.data.content, "base64").toString();
            })
            fs.writeFileSync("content.json",JSON.stringify(contentFile))
        })
    })
};

content();