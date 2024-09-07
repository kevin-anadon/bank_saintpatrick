CREATE DATABASE IF NOT EXISTS `saintpatrickdb`;

USE `saintpatrickdb`;

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
    cardNumber VARCHAR(100) NOT NULL UNIQUE,
    pin VARCHAR(100) NOT NULL UNIQUE,    
    balance DECIMAL(10, 2) DEFAULT 0,
    createdAt datetime NOT NULL,
	updatedAt datetime DEFAULT NULL,
	deletedAt datetime DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS transactions (
	id INT PRIMARY KEY AUTO_INCREMENT,
	sender_id INT NOT NULL,
    recipient_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    transaction_date DATETIME NOT NULL,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (recipient_id) REFERENCES users(id)
);