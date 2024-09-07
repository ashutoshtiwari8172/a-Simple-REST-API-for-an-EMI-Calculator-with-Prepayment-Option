
# REST API for EMI Calculator with Prepayment Option

This project is a REST API for calculating EMI (Equated Monthly Installment) with an option for prepayments. It uses Node.js with Express and Sequelize ORM for PostgreSQL database interaction.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)


## Prerequisites

Before running the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [PostgreSQL](https://www.postgresql.org/) (or another supported database)

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/your-repository.git
   cd your-repository
   ```

2. **Install Dependencies**

   Run the following command to install all required Node.js dependencies:

   ```bash
   npm install
   ```

3. **Set Up the Database**

   - **Create a PostgreSQL Database**: Use your PostgreSQL client (e.g., `psql`) to create a database. For example:

     ```sql
     CREATE DATABASE your_database_name;
     CREATE USER your_database_user WITH PASSWORD 'your_database_password'
     GRANT ALL PRIVILEGES ON DATABASE your_database_name TO your_database_user ;
     
     ```

   - **Create a `.env` File**: In the root directory of your project, create a file named `.env` and add the following environment variables:

     ```env
     DB_NAME=your_database_name
     DB_USER=your_database_user
     DB_PASS=your_database_password
     DB_HOST=localhost
     DB_PORT=5432
     ```

     Replace `your_database_name`, `your_database_user`, and `your_database_password` with your actual PostgreSQL database credentials.

4. **Migrate Database**

   Sequelize will automatically synchronize the models with the database when the application starts. Ensure that the database and environment variables are correctly set up before running the application.

## Running the Application

1. **Start the Server**

   Run the following command to start the Express server:

   ```bash
   npm start
   ```

   The server will start on port `3000` by default. You can change this by setting the `PORT` environment variable in the `.env` file.

2. **Access the API**

   The API will be available at `http://localhost:3000/api`. You can test the endpoints using [Postman](https://www.postman.com/) or any other API client.

## API Endpoints

1. **Calculate EMI**
   - **Method**: POST
   - **Endpoint**: `/api/calculate-emi`
   - **Request Body**:
     ```json
     {
       "loan_amount": 100000,
       "interest_rate": 7.5,
       "loan_tenure_months": 12,
       "prepayment_amount": 5000
     }
     ```
   - **Response**: JSON object with EMI calculation details.

2. **Get All EMIs**
   - **Method**: GET
   - **Endpoint**: `/api/emis`
   - **Response**: JSON array of all loans.

3. **Get EMI by ID**
   - **Method**: GET
   - **Endpoint**: `/api/emi/{id}`
   - **Response**: JSON object of the specified loan.

