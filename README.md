# Loan Calculator

## Description

This is a Node.js application for calculating and updating loan status. The project provides an API endpoint to handle loan-related calculations, including updating installment amounts based on a reference rate and notifying users of invalid inputs. This project is dockerized and utilizes a MySQL database.

**Features:**

-   Calculate updated loan installment amounts and remaining loan balance based on the fetched reference rate.
-   Check for invalid inputs (e.g., zero or negative installment amount) and notify users via email.
-   Compare the user’s interest rate with a reference rate and provide feedback if the interest rate is higher.
-   Save calculation results and reference rate data to a MySQL database.
-   Dockerized setup for easy deployment.

## Table of Contents

-   [Description](#description)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation & Usage](#installation-&-usage)
-   [Environment Variables](#environment-variables)
-   [Testing the API](#testing-the-api)
    -   [Example API Request](#example-api-request)
-   [Mail Service](#mail-service)
-   [License](#license)

## Getting Started

To get this project up and running on your local machine, follow these steps:

### Prerequisites

Make sure you have the following software installed on your system:

-   Node.js (version 21.5.0 or later)
-   npm (Node Package Manager)
-   Docker Desktop
-   GNU make chocolatey (optional)
-   MySQL 8.0.40

### Installation & Usage

1. Clone the repository:

```
git clone https://github.com/adrian-prajsnar/loan-calculator.git
```

2. Navigate to the project folder:

```
cd loan-calculator
```

3. (Optional but recommended) To run the development environment and containerized application, use the following make command to install dependencies, build, and start the Docker container in one go:

```
make run
```

4. If you don't have GNU make chocolatey configured, run below commands:

```
npm install
```

```
docker compose build
```

```
docker compose up --watch
```

5. To shutdown the development environment and containerized application:

```
docker compose down
```

or when using GNU make chocolatey:

```
make down
```

6. To build the project:

```
npm run build
```

## Environment Variables

To configure environment variables, follow these steps:

1. Copy the example environment file:

    ```
    cp .env.example .env
    ```

2. Fill it the following fields:

-   `PORT`: The port on which the application will run (default is `3000`).
-   `DATABASE_HOST`: Hostname for the MySQL database (e.g., `bank-loans-mysqldb`).
-   `DATABASE_NAME`: Name of the MySQL database (e.g., `bank_loans`).
-   `DATABASE_USERNAME`: Username for connecting to the database (e.g., `admin`).
-   `DATABASE_PASSWORD`: Password for the database user (e.g., `admin`).
-   `EMAIL_USERNAME`: Actual username for the email service (mailtrap.io) (e.g., `0fa814f31e6ca1`).
-   `EMAIL_PASSWORD`: Actual password for the email service (mailtrap.io) (e.g., `8fea63bdb69d85`).
-   `EMAIL_HOST`: SMTP host for sending emails (e.g., `sandbox.smtp.mailtrap.io`).
-   `EMAIL_PORT`: SMTP port for the email service (e.g., `2525`).

## Testing the API

You can test the API endpoints using Postman. A collection is available for easy testing: [Count Loan - Postman API](https://www.postman.com/lively-capsule-860220/loan-api/request/gek3s3p/count-loan?action=share&creator=33666853&ctx=documentation).

You can also test it using simple frontend application where you can submit loan data by the form: [loan-calculator-front](https://github.com/adrian-prajsnar/loan-calculator-front).

### Example API Request

To test the loan calculation endpoint directly with Postman, use the following configuration:

-   **Method**: `POST`
-   **URL**: `http://localhost:3000/api/v1/loan`
-   **Headers**: Set `Content-Type` to `application/json`
-   **Body**: Use the JSON format and add the following sample data:

    ```json
    {
        "allInstallments": 100,
        "remainingInstallments": 90,
        "installmentAmount": 5000,
        "financingAmount": 500000,
        "interestRate": 5.5,
        "userEmail": "test@email.com"
    }
    ```

After setting this up in Postman, click **Send** to submit the request and test the response from the API.

## Mail service

In order to send email, you must use the email service: [mailtrap.io](https://mailtrap.io/). You need to register, create an inbox and fill the project environment variables with host, port, username, password.

## License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
