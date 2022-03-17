const bodyParser = require("body-parser");
const { parsed: envs } = require("dotenv").config();
const express = require("express");
const SmeeClient = require("smee-client");
const bot = require("./index-one");

// create instances
const app = express();
var router = express.Router();

// middlewares
app.use(bodyParser.json());
app.use(router);

// receive webhook responses from repo
router.post("/", async (req, res) => {
  const data = await req.body;
  bot(data)
  console.log(data);
});

// setup local server
app.listen(process.env.PORT, () => {
  console.log(`Server Running on Port ${process.env.PORT}`);
});

//connect local server to network client
const smee = new SmeeClient({
  source: "https://smee.io/badging",
  target: `http://localhost:${process.env.PORT}/`,
  logger: console,
});
smee.start();
