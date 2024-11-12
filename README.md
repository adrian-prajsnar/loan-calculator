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
-   [License](#license)

## Getting Started

To get this project up and running on your local machine, follow these steps:

### Prerequisites

Make sure you have the following software installed on your system:

-   Node.js (version 21.5.0 or later)
-   npm (Node Package Manager)
-   Docker Desktop
-   GNU make chocolatey
-   MySQL 8.0.40

### Installation & Usage

1. Clone the repository:

```
git clone https://github.com/adrian-prajsnar/loan-calculator.git
```

2. Navigate to the project folder:

```
cd your-project
```

3. To run the development environment and containerized application, use the following make command to install dependencies, build, and start the Docker container:

```
make run
```

4. To build the project:

```
npm run build
```

## Environment Variables

To configure environment variables, follow these steps:

1. Copy the example environment file:

    ```
    cp .env.example .env
    ```

2. Fill it with actual data.

## Environment Variables

You can test the API endpoints using Postman. A collection is available for easy testing:

[Count Loan - Postman API](https://www.postman.com/lively-capsule-860220/loan-api/request/gek3s3p/count-loan?action=share&creator=33666853&ctx=documentation)

## License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
