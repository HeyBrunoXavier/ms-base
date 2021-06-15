const express = require("express");
const useragent = require("express-useragent");
const cors = require("cors");
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");
const apiSchema = require("./api.doc.json");

require("./database/connection");

module.exports = new class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.setRoutes();
    this.apiDoc();
  }
  middlewares() {
    this.app.use(useragent.express());
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }
  setRoutes() {
    const routeDirectory = "./routes";
    try {
        const files = fs.readdirSync(routeDirectory, { encoding: "utf8" });
        files.forEach(file => {
          this.app.use("/", require(`${routeDirectory}/${file}`));
        });
    } catch (error) {
      console.log(error);
    }
  }
  apiDoc() {
    this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(apiSchema));
  }
}
