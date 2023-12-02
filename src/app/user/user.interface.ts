//type of full name
export type FullName = {
    firstName: string;
    lastName: string;
}
//type of address
export type Address = {
    street: string;
    city: string;
    country: string;
}
//type of orders
export type Orders = {
    productName: string;
    price: number;
    quantity: number;
}
//type of user
export type User = {
    userId: number;
    username: string;
    password: string;
    fullName:FullName;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address:Address;
    orders?:Orders[];
    isDeleted:boolean
  }
  