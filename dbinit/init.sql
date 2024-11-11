CREATE DATABASE IF NOT EXISTS bank_loans;
USE bank_loans;

CREATE TABLE IF NOT EXISTS ReferenceRate (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    creationDate DATETIME NOT NULL,
    referenceRate DOUBLE NOT NULL,
    PRIMARY KEY (id)
) AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS Loan (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    allInstallments DOUBLE NOT NULL,
    remainingInstallments DOUBLE NOT NULL,
    installmentAmount DOUBLE NOT NULL,
    financingAmount DOUBLE NOT NULL,
    interestRate DOUBLE NOT NULL,
    remainingLoanToPay DOUBLE NOT NULL,
    PRIMARY KEY (id)
) AUTO_INCREMENT = 1;
