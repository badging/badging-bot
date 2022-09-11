/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

require("dotenv").config();
const app = require("../index");
const chai = require("chai");
const { expect, request } = require("chai");
const { describe } = require("mocha");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("Check authentication", () => {
  let payload;

  before(async () => {
    payload = await app.octokit.request("/app");
  });

  beforeEach(async () => {
    await payload;
  });

  describe("check for App authentication", () => {
    it("App receives requests", async () => {
      expect(payload.status).to.equal(200);
    });
    it("App installed on repo is connected to local server", async () => {
      expect(payload.data.id).to.equal(parseInt(process.env.appId));
    });
  });
});
