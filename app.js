const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");
const connectDB = require("./config/mongodb");
const walletController = require("./controllers/walletController.js");
const validationMiddleware = require("./middlewares/walletMiddleware.js");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(bodyParser.json());
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API 1: Setup Wallet
app.post("/setup", validationMiddleware.validateSetupWalletRequest, walletController.setupWallet);

// API 2: Credit/Debit amount
app.post("/transact/:walletId", walletController.transactAmount);

// API 3: Fetch transactions
app.get("/transactions", walletController.getTransactions);

// API 4: Get wallet details
app.get("/wallet/:id", walletController.getWalletDetails);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/api`);
});
