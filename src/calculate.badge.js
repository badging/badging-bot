const axios = require("axios");

const { parsed: envs } = require("dotenv").config();
let initialCheckCount = 6;

const calculateBadge = async (results) => {
  const issueURL = results.issue.html_url;

  if (results.repository.name == "event-diversity-and-inclusion") {
    initialCheckCount = 4;
  }
  
  await axios
    .get(
      `&{process.env.REPO_API_URL}/issues/139/comments`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "content-type": "application/json",
        },
      }
    )
    .then((res) => {
      console.log(res.data)
      // let checklists = res.data.filter((comment) => {
      //   return (
      //     comment.user.type == "Bot" &&
      //     comment.body.substring(0, 15) == "# Checklist for"
      //   );
      // });

      // let totalCheckCount = checklists.map(function (element) {
      //   return (
      //     (element.body.match(/\[x\]/g) || []).length +
      //     (element.body.match(/\[ \]/g) || []).length
      //   );
      // });
      // console.log(totalCheckCount);
      // totalCheckCount = totalCheckCount.map(function (element) {
      //   return element - initialCheckCount;
      // });

      // let positiveCheckCount = checklists.map(function (element) {
      //   let checkCount =
      //     +(element.body.match(/\[x\]/g) || []).length - initialCheckCount;
      //   if (checkCount <= 0) return 0;
      //   else return checkCount;
      // });

      // let percentages = positiveCheckCount.map(function (element) {
      //   let p = Math.floor((element / totalCheckCount[0]) * 100);
      //   return p;
      // });

      // let reviewerCount = percentages.length;
      // let reviewResult = 0;
      // percentages.forEach((element) => {
      //   reviewResult += element;
      // });
      // reviewResult /= reviewerCount;
      // console.log(reviewResult);
      // const badgeAssigned =
      //   reviewResult < 40
      //     ? ["pending", "D%26I-Pending-red"]
      //     : reviewResult < 60
      //     ? ["passing", "D%26I-Passing-passing"]
      //     : reviewResult < 80
      //     ? ["silver", "D%26I-Silver-silver"]
      //     : reviewResult <= 100
      //     ? ["gold", "D%26I-Gold-yellow"]
      //     : ["pending", "D%26I-Pending-red"];

      // const url =
      //   "https://img.shields.io/badge/" +
      //   badgeAssigned[1] +
      //   "?style=flat-square&labelColor=583586&&link=" +
      //   issueURL +
      //   "/&logo=data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDI1MCAyNTAiPgo8cGF0aCBmaWxsPSIjMUM5QkQ2IiBkPSJNOTcuMSw0OS4zYzE4LTYuNywzNy44LTYuOCw1NS45LTAuMmwxNy41LTMwLjJjLTI5LTEyLjMtNjEuOC0xMi4yLTkwLjgsMC4zTDk3LjEsNDkuM3oiLz4KPHBhdGggZmlsbD0iIzZBQzdCOSIgZD0iTTE5NC42LDMyLjhMMTc3LjIsNjNjMTQuOCwxMi4zLDI0LjcsMjkuNSwyNy45LDQ4LjVoMzQuOUMyMzYuMiw4MC4yLDIxOS45LDUxLjcsMTk0LjYsMzIuOHoiLz4KPHBhdGggZmlsbD0iI0JGOUNDOSIgZD0iTTIwNC45LDEzOS40Yy03LjksNDMuOS00OS45LDczLTkzLjgsNjUuMWMtMTMuOC0yLjUtMjYuOC04LjYtMzcuNS0xNy42bC0yNi44LDIyLjQKCWM0Ni42LDQzLjQsMTE5LjUsNDAuOSwxNjIuOS01LjdjMTYuNS0xNy43LDI3LTQwLjIsMzAuMS02NC4ySDIwNC45eiIvPgo8cGF0aCBmaWxsPSIjRDYxRDVGIiBkPSJNNTUuNiwxNjUuNkMzNS45LDEzMS44LDQzLjMsODguOCw3My4xLDYzLjVMNTUuNywzMy4yQzcuNSw2OS44LTQuMiwxMzcuNCwyOC44LDE4OEw1NS42LDE2NS42eiIvPgo8L3N2Zz4K";

      // const markdownBadgeImage =
      //   "![Assigned badge: " + badgeAssigned[0] + "](" + url + ")";

      // const htmlBadgeImage =
      //   "<img src='" +
      //   url +
      //   "' alt='" +
      //   "D&I Badging badge state: " +
      //   badgeAssigned[0] +
      //   "'/>";
      // return [markdownBadgeImage, htmlBadgeImage, reviewResult, reviewerCount];

      // console.log(res.data);
    })
    .catch((err) => console.log(err));
};

module.exports = calculateBadge;
