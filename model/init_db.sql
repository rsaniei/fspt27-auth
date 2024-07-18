--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists items;
DROP TABLE IF EXISTS users;
SET foreign_key_checks = 1;

--
-- Create Tables
--

CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL
);

CREATE TABLE items(
    id INT NOT NULL AUTO_INCREMENT, 
    text VARCHAR(40) not null, 
    complete BOOLEAN, 
    -- user_id INT NOT NULL,
    -- FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY (id)
    );
