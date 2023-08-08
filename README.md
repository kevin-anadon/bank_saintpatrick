<div style="display: flex; align-items: center;">
  <h1>Saint Patrick Bank - Home Banking (Ficticional Project)</h1>
  <img src="https://github.com/kevin-anadon/bank_saintpatrick/blob/main/client/src/assets/resources/images/logo.png" alt="Saint Patrick Logo" style="height: 100px; width: 80px; margin-left: auto;" />
</div>

**Note: This is a fictional project created for educational and demonstration purposes. The data and information presented here are not real.**

Welcome to Saint Patrick Bank Home Banking! This project aims to provide a secure and user-friendly platform for performing transactions with pre-defined user cards. Below, you will find all the necessary information to set up and use the application.

## Project Idea

The idea behind this project is to create a Home Banking platform that allows users to securely access their accounts, check their balances, and perform transactions to other cards.

## Objective

The main objective of Saint Patrick Bank is to enable users to transfer money between accounts safely and efficiently. By utilizing pre-defined user cards, we can ensure secure transactions and prevent any financial losses.

## Front-end Stack

- React (JavaScript library for building user interfaces)
- Bootstrap (UI framework for responsive web design)
- ViteJS (Fast build tool and development server)

## Back-end Stack

- NodeJS (Server-side JavaScript runtime) with TypeScript
- ExpressJS (Web application framework for NodeJS)
- MySQL (Relational database management system)

## Deployment

The front-end of the application will be hosted on Netlify, while the back-end and database will be deployed on Railway.

## Pages

1. **Login**
   - Users can log in using their card number and PIN.
   - After successful login, users will be redirected to the "View Balance" page.

2. **View Balance**
   - Users can view their current account balance.
   - Users can access the "Transaction History" page from here.

3. **Transaction History**
   - Displays a list of the user's latest transactions for the current month.
   - Contains a button to initiate a "New Transaction".

4. **New Transaction**
   - Users can perform a new transaction by entering the recipient's card number and the transaction amount.
   - Upon submission, users will be redirected to the "Confirm Transaction" page.

5. **Confirm Transaction**
   - Shows a summary of the transaction details for users to review before finalizing.
   - Users can confirm the transaction, which will deduct the amount from their account and credit it to the recipient's account.

6. **Session Closed**
   - This page appears when the user logs out or when the session times out due to inactivity.

## Instructions for Running the Project Locally

1. Clone the repository.

```
git clone https://github.com/your-username/bank-saint-patrick.git
```

2. Navigate to the project folder.

```
cd bank-saint-patrick
```

3. Install dependencies for the front-end.

```
cd client
npm install
cd ..
```

4. Install dependencies for the back-end.

```
cd server
npm install
```

5. Set up your MySQL database and update the database configuration in the back-end.
```
cd server/db_scripts
```
You will find 2 scripts: 01-createDB, 02-testValues and the Entity Relational Diagram

6. Run the front-end development server.

```
cd client
npm run dev
```

7. Run the back-end server.

```
cd server
npm run dev
```

You should now be able to access the application locally at `http://localhost:5173`.
The backend at `http://localhost:3001`

## Documentation

Documentation for backend: [doc](https://documenter.getpostman.com/view/16602212/2s9XxyQtPN)

## Deployment

To deploy the front-end on Netlify and the back-end on Render, Database(MySQL) on freesqldatabase.com, follow the respective deployment instructions for each platform.

## Test it

Note: There is a [text](https://github.com/kevin-anadon/bank_saintpatrick/blob/main/client/lists%20of%20cards(Fictional).txt) with a list of cards to use for testing, also you can check in the database scripts for more details

**Link to the application: [app](https://saintpatrickbank.netlify.app), if you are interested in the backend [server](https://saint-patrick-bank-api.onrender.com)**

## Thanks

Feel free to contribute to the project or report any issues [here](https://github.com/kevin-anadon/bank_saintpatrick/issues).

Enjoy using Saint Patrick Bank Home Banking! 🏦💳
