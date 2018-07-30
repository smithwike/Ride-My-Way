DROP DATABASE IF EXISTS testing;
CREATE DATABASE testing;

 CREATE TABLE users
 (
 	user_id serial PRIMARY KEY, 
    user_name text NOT NULL, 
    user_email text UNIQUE NOT NULL, 
    user_password text NOT NULL
    );