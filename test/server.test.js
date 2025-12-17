require("dotenv").config();
const request = require("supertest");
const app = require("../server");
const tableContentJSON = require(`./${process.env.DB_RANDOM_TABLE_NAME_JSON_FILE}`);
const alltables = require("./alltables");
const apiresult = require("./apiresult");

describe("api", () => {
  it("should return tables", (done) => {
    request(app)
      .get("/_api")
      .expect("Content-Type", /json/)
      .expect(200, alltables)
      .end((err, _res) => {
        if (err) throw err;
        done();
      });
  });

  it(`should return the ${process.env.DB_RANDOM_TABLE_NAME_JSON_FILE}`, (done) => {
    request(app)
      .post("/_api")
      .send({ table: `${process.env.DB_RANDOM_TABLE_NAME}` })
      .expect("Content-Type", /json/)
      .expect(200, tableContentJSON)
      .end((err, _res) => {
        if (err) throw err;
        done();
      });
  });
});

describe("nasa_api", () => {
  it("should return empty array from NASA API", (done) => {
    request(app)
      .post("/nasa_api")
      .send({ sol: 3496, camera: "FHAZ" })
      .expect("Content-Type", /json/)
      .expect(200)
      .expect(res => res.data = [])
      .end((err, _res) => {
        if (err) throw err;
        done();
      });
  });

  it("should return the data from NASA API", (done) => {
    request(app)
      .post("/nasa_api")
      .send({ sol: 4074, camera: "FHAZ" })
      .expect("Content-Type", /json/)
      .expect(200)
      .expect(res => res.data = apiresult.data)
      .end((err, _res) => {
        if (err) throw err;
        done();
      });
  });
});
