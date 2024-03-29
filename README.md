````markdown
# Wallet System

## Overview

This project implements a simple wallet system backend using Node.js and MongoDB. It includes APIs for setting up wallets, performing credit/debit transactions, fetching transactions, and retrieving wallet details.

## Project Structure

- `app.js`: Main entry point for the application.
- `config/`: Configuration files, including MongoDB connection setup.
- `controllers/`: Logic for handling HTTP requests and interacting with the database.
- `middlewares/`: Request validation middleware using Joi.
- `models/`: Mongoose models for Wallet and Transaction.
- `docs/`: Swagger API documentation.
## Deployed at
   http://34.100.252.15:3000/api
   Deployed at GCP VM instance
   Mongodb is a managed service via atlas
## Demo
   Open http://34.100.252.15:3000/api url and try out the endpoints
## Demo Recording
   https://drive.google.com/file/d/1Tl93rym51BFvhl_82ceXhd4WVgQqsYIe/view?usp=sharing
## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kanikadawar5/wallet-service.git
   cd wallet-service
   ```
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   node app.js
   ```

## API Endpoints

- **Setup Wallet:**

  - Endpoint: `POST /setup`
  - Request Body:
    ```json
    { "balance": 10, "name": "Wallet A" }
    ```

- **Credit/Debit Transaction:**

  - Endpoint: `POST /transact/:walletId`
  - Request Body:
    ```json
    { "amount": 5, "description": "Purchase" }
    ```

- **Fetch Transactions:**

  - Endpoint: `GET /transactions?walletId={walletId}&skip={skip}&limit={limit}`

- **Get Wallet Details:**
  - Endpoint: `GET /wallet/:id`

## Dependencies

- Express.js
- Mongoose
- Body-parser
- Swagger-ui-express
- Joi

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
