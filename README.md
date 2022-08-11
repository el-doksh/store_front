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

### 1. Installation steps:

1- run "npm install" to install dependecies
2- run "npm run start" to build and run the server at port 3000
3- url server will be: http://localhost:3000
4- make a copy of .env.example (located in root folder) then rename the new file to be (.env) and set your database configurations there
5- add your database secret key on key  "BCRYPT_PASSWORD" and salt number on "SALT_ROUNDS" for password hashing in ".env" file
6- add your token secret in key "TOKEN_SECRET" in ".env" file for jwt token
7- run "db-migrate up" to create all tables in the connected database 
8- run "npm run test" to test all apis 

### 2. APIs end points:

use the following apis to get and store data from database:

**Note** : each endpoint requires (token) you have to send it as a Bearer token in header request of the api

1- get All users:
endpoint: '/users' [GET] (token required)
return: (200) array of objects for users

2- show user:
endpoint: '/users/:id' [GET] (token required)
query parameter: 
    :id (int) => id of user 
return: (200) object of user 
        (400) user not found

3- create user:
endpoint: '/users' [POST] 
body parameters:
    first_name (string) => user first name (required)   
    last_name (string) => user last name (required) 
    password (string) =>  user password (required and should be greater than or equal 8 characher)
return: (200) token
        (400) error

4- login:
endpoint: '/users/login' [POST] 
body parameters:
    first_name (string) => user first name (required)   
    password (string) =>  user password (required)
return: (200) token
        (400) invalid first_name or password

5- get All products:
endpoint: '/products' [GET]
return: (200) array of objects of products

6- Show product:
endpoint: '/products/:id' [GET] 
query parameters:
    id (integer) => product id (required)   
return: (200) object of product
        (400) product not found

7- get products by category name:
endpoint: '/products/category/:name' [GET] 
query parameters:
    name (string) => category name that you want to filter with (required)
return: (200) array of objects of products

8- create Product:
endpoint: '/products' [POST] (token required) 
body parameters:
    name (string) => product name (required)   
    price (float) =>  product price (required)
    category (string) =>  category name (required)
return: (200) object of created product
        (400) error

9- Most popular products:

endpoint: '/most_popular_products' [GET] 
return: (200) array of objects of products
        (400) error


10- get All orders:
endpoint: '/orders' [GET] (token required)
return: (200) array of objects of orders related to logged in user

11- Show order:
endpoint: '/orders/:id' [GET]  (token required)
query parameters:
    id (integer) => order id (required)   
return: (200) object of order of related logged in user
        (400) order not found

12- completed orders:
endpoint: '/orders_completed' [GET] (token required)
return: (200) array of objects of completed orders related to logged in user

13- create Order:
endpoint: '/orders' [POST] (token required) 
body parameters:
    status (string) => order status should be active/completed (required)
return: (200) object of created order
        (400) error

14- add product to order:

endpoint: '/addProduct' [POST] (token required)
body parameters: 
    order_id (integer): order id (required),
    product_id (integer): product id (required),
    quantity (integer): quantity of product (required),
return: (200) object of created order product
        (400) error

