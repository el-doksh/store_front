# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion

### Installation steps:

1- run "npm install" to install dependecies
2- make a copy of .env.example (located in root folder) then rename the new file to be (.env) and set your database configurations there 
port 5432 is default port for postgres 
3- add your database secret key on key "BCRYPT_PASSWORD" and salt number on "SALT_ROUNDS" for password hashing in ".env" file
4- add your token secret in key "TOKEN_SECRET" in ".env" file for jwt token
5- run "db-migrate up" to create all tables in the connected database 
6- run "npm run start" to build and run the server at port 3000
7- url server will be: http://localhost:3000
8- run "npm run test" to test all apis 
9- set env variable on .env file ('test' : for testing,'dev' : for deveoplment  )