/* Swagger configuration */
const options = {
  openapi: "OpenAPI 3", // Enable/Disable OpenAPI. By default is null
  language: "en-US", // Change response language. By default is 'en-US'
  disableLogs: false, // Enable/Disable logs. By default is false
  autoHeaders: false, // Enable/Disable automatic headers capture. By default is true
  autoQuery: false, // Enable/Disable automatic query capture. By default is true
  autoBody: false, // Enable/Disable automatic body capture. By default is true
};

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
  host: config.host,
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
