DROP DATABASE IF EXISTS ridemyway_test;
CREATE DATABASE ridemyway_test;

 CREATE TABLE users
 (
 	user_id serial PRIMARY KEY, 
    user_name text NOT NULL, 
    user_email text UNIQUE NOT NULL, 
    user_password text NOT NULL
    );