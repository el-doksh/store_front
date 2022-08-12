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

## create Database with psql commands:

1- Download and install a PostgreSQL server from www.postgresql.org
2- open terminal and run "psql postgres"
3- create database with name store:
    run "CRAETE DATABASE store"
4- Create username and password for postgres server:
    run "CREATE USER postgres WITH PASSWORD 123456"
5- Grant all privilges on database store to user postgres:

    run "GRANT ALL PRIVILEGES ON DATABASE store TO postgres"
6- database should be running on its default port "5432"
7- database schema should be "public"

### project Installation & database steps:

1- run "npm install" to install dependecies
2- make a copy of .env.example (located in root folder) then rename the new file to be (.env) and set your database configurations there for example:
DB_HOST=localhost
DB_NAME=store
DB_TEST_NAME=test_store
DB_USER="postgres"
DB_PASSWORD="123456"
DB_PORT=5432

3- add your database secret key on key "BCRYPT_PASSWORD" and salt number on "SALT_ROUNDS" for password hashing in ".env" file
4- add your token secret in key "TOKEN_SECRET" in ".env" file for jwt token
5- run "db-migrate up" to create all tables in the connected database 
6- run "npm run start" to build and run the server at port 3000
7- url server will be: http://localhost:3000
8- run "npm run test" to test all apis 
9- set env variable on .env file ('test' : for testing,'dev' : for deveoplment  )