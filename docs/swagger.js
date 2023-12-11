const config = require("./../.env");
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    version: "1.0.0",
    title: "Kanika Dawar - High Level",
    description: "High Level - Backend Engineer",
    contact: {
      name: "API Support",
      email: "kanikadawar5@gmail.com",
    },
  },
  host: config.HOST,
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Wallet CRUD",
      description: "Wallet related apis",
    },
  ],
};

const outputFile = "./docs/swagger.json";
const endpointsFiles = ["./app.js", "./controllers/*.js"];
swaggerAutogen(outputFile, endpointsFiles, doc);
