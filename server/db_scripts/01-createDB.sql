CREATE DATABASE IF NOT EXISTS saintpatrick_bank;

USE saintpatrick_bank;

CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime DEFAULT NULL,
  deletedAt datetime DEFAULT NULL
);

/* password(PIN) encrypted */
CREATE TABLE IF NOT EXISTS cards (
	id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    cardNumber BIGINT NOT NULL UNIQUE,
    pin VARCHAR(100) NOT NULL UNIQUE,    
    balance BIGINT DEFAULT 0,
    createdAt datetime NOT NULL,
	updatedAt datetime DEFAULT NULL,
	deletedAt datetime DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);