CREATE DATABASE IF NOT EXISTS bank_loans;
USE bank_loans;

DROP TABLE IF EXISTS ReferenceRate;

CREATE TABLE ReferenceRate (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    creationDate DATETIME NOT NULL,
    referenceRate DOUBLE NOT NULL,
    PRIMARY KEY (id)
) AUTO_INCREMENT = 1;

DROP TABLE IF EXISTS Loan;

CREATE TABLE Loan (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    allInstallments DOUBLE NOT NULL,
    remainingInstallments DOUBLE NOT NULL,
    installmentAmount DOUBLE NOT NULL,
    financingAmount DOUBLE NOT NULL,
    interestRate DOUBLE NOT NULL,
    PRIMARY KEY (id)
) AUTO_INCREMENT = 1;
