# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## Database info

database schema should be "public" in port "5432"

## API Endpoints
#### Products
- Index 
endpoint: '/products' [GET]
description: get All products
return: (200) array of objects of products

- Show
endpoint: '/products/:id' [GET] 
description: Show product
query parameters:
    id (integer) => product id (required)   
return: (200) object of product
        (400) product not found

- Create [token required]
description: create Product
endpoint: '/products' [POST] (token required) 
body parameters:
    name (string) => product name (required)   
    price (float) =>  product price (required)
    category (string) =>  category name (required)
return: (200) object of created product
        (400) error


- Top 5 most popular products 
endpoint: '/most_popular_products' [GET] 
return: (200) array of objects of products
        (400) error

- Products by category
endpoint: '/products/category/:name' [GET] 
description: get products by category name:
query parameters:
    name (string) => category name that you want to filter with (required)
return: (200) array of objects of products


#### Users
- Index [token required]
endpoint: '/users' [GET] 
return: (200) array of objects for users

- Show [token required]
endpoint: '/users/:id' [GET]
query parameter: 
    :id (int) => id of user 
return: (200) object of user 
        (400) user not found

- Create
endpoint: '/users' [POST] 
body parameters:
    first_name (string) => user first name (required)   
    last_name (string) => user last name (required) 
    password (string) =>  user password (required and should be greater than or equal 8 characher)
return: (200) token
        (400) error

- Login
endpoint: '/users/login' [POST] 
body parameters:
    first_name (string) => user first name (required)   
    password (string) =>  user password (required)
return: (200) token
        (400) invalid first_name or password

#### Orders
- Index:
endpoint: '/orders' [GET] (token required)
return: (200) array of objects of orders related to logged in user

- Show: 
endpoint: '/orders/:id' [GET]  (token required)
query parameters:
    id (integer) => order id (required)   
return: (200) object of order of related logged in user
        (400) order not found

- completed orders:
endpoint: '/orders_completed' [GET] (token required)
return: (200) array of objects of completed orders related to logged in user

- create Order:
endpoint: '/orders' [POST] (token required) 
body parameters:
    status (string) => order status should be active/completed (required)
return: (200) object of created order
        (400) error

- add product to order:

endpoint: '/addProduct' [POST] (token required)
body parameters: 
    order_id (integer): order id (required),
    product_id (integer): product id (required),
    quantity (integer): quantity of product (required),
return: (200) object of created order product
        (400) error

## Data Shapes (Tables)
database schema : "public" 
database port "5432"

#### products
-  id [integer] (primary key auto increment)
- name [varchar(255)]
- price [double]
- category [varchar(255)]

#### users
- id [integer] (primary key auto increment)
- first_name [varchar(100)]
- last_name [varchar(100)]
- password  [varchar(255)]

#### orders table
- id [integer] (primary key auto increment)
- user_id [bigint] (foreign key for users table)
- status of order  [varchar(45)] (should beactive or completed)

### order_products
- id [integer] (primary key auto increment)
- order_id [bigint] (foreign key for orders table)
- product_id [bigint] (foreign key for products table)
- quantity [integer]