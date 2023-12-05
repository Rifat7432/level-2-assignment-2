
## About This Project

This project is a typescript and mongoos server.Which is used to create, update, delete and get a user.It  can get all users and add user's order.We can also get all orders and get total price of all orders of a user.





## Demo Of Data Types

### Data Type Of User


```
{
    "userId": "number",
    "username": "string",
    "password": "string",
    "fullName": {
        "firstName": "string",
        "lastName": "string"
    },
    "age": "number",
    "email": "string",
    "isActive": "boolean",
    "hobbies": [
        "string",
        "string"
    ],
    "address": {
        "street": "string",
        "city": "string",
        "country": "string"
    }
}
```
## Data Example For Creating User
```
{
    "user": {
        "userId": 4444,
        "username": "john_hoe",
        "password": "hashedpassword123",
        "fullName": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "age": 30,
        "email": "john@example.com",
        "isActive": true,
        "hobbies": [
            "reading",
            "cooking"
        ],
        "address": {
            "street": "123 Main St",
            "city": "Anytown",
            "country": "CountryName"
        }
        
    }
}
```

### Type Of Order

``` 
{
    "productName": "string",
    "price": "number",
    "quantity": "number"
}
```
## 🔗 Server is running on
[https://level-2-assignment-2-five.vercel.app](https://level-2-assignment-2-five.vercel.app)



## API Reference

#### Create a user

```http
Endpoint:  POST /api/users
```
#### Get all users
```http
Endpoint:  GET /api/users
```
#### Get a specific user
```http
Endpoint:  GET /api/users/:userId
```
| Parameter | Type     | 
| :-------- | :------- | 
| `userId` | `string` |  

#### Update user information

```http
Endpoint:  PUT /api/users/:userId
```

| Parameter | Type     |                      
| :-------- | :------- |  
| `userId`      | `string` | 

#### Delete a user

```http
Endpoint:  DELETE /api/users/:userId
```

| Parameter | Type     |                      
| :-------- | :------- |  
| `userId`      | `string` | 


#### Add New Product in Order

```http
Endpoint:  PUT /api/users/:userId/orders
```

| Parameter | Type     |                      
| :-------- | :------- |  
| `userId`      | `string` | 

#### Get all orders for a specific user

```http
Endpoint:  GET /api/users/:userId/orders
```

| Parameter | Type     |                      
| :-------- | :------- |  
| `userId`      | `string` | 

#### Get Total Price of all Orders of a user

```http
Endpoint:  GET /api/users/:userId/orders/total-price
```

| Parameter | Type     |                      
| :-------- | :------- |  
| `userId`      | `string` | 

## Features

- Create a user(Data structure should be same as user data tpe) 
- Get all users
- Get a specific user
- Update user information(Data structure should be same as user data tpe)
- Delete a user
- Add New Product in Order(Data structure should be same as order data tpe)
- Get all orders for a specific user
- Get Total Price of all Orders of a user

## MY Package
- Express.js : Express.js is a minimal and flexible Node.js web application framework. This package is used to interact with web applications and APIs.
- Mongoose : Used with MongoDB databases, to facilitate interaction with MongoDB and to work with MongoDB documents. Used for work:
- Object Data Modeling (ODM)
- Schema definition
- Validation of Zod
- Middleware support
- Query building
- TypeScript : TypeScript is a superset of JavaScript that provides static typing in the language.  TypeScript is used to define the type of JavaScript it - uses primarily:
- Static typing
- Code maintainability
- Object-Oriented Programming (OOP)
- Compliant with ECMAScript
- Cors: Used for Cross-Origin Resource Sharing (CORS).
- Zod : Zod is a TypeScript-first schema declaration and validation library. It is commonly used for data validation in TypeScript projects
- dotenv : This package is used  to protect environment variables.
- bcrypt : This package is used to hash passwords in this project
##  About Me
Hi,I am Md Rifat.I'm a full stack developer.
