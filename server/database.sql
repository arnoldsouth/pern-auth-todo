-- Create database named: authtodolist
CREATE DATABASE authtodolist;

-- To use uuid_generate_v4:
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE users(
  user_id UUID DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id)
);

-- Create todos table
CREATE TABLE todos(
  todo_id SERIAL,
  user_id UUID,
  description VARCHAR(255) NOT NULL,
  PRIMARY KEY (todo_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);



-- Insert example user data
INSERT INTO users (user_name, user_email, user_password) VALUES ('aj', 'aj@gmail.com', 'qweasdzxc');

-- Insert example todos data
INSERT INTO todos (user_id, description) VALUES ('52fa861f-c467-4791-a11b-8ff17cd56f9c', 'Feed touka');