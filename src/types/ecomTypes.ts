import { ObjectId } from 'mongoose';
import { Ref } from '@typegoose/typegoose';
import { TypeOf } from 'zod';

import { userSchema } from '../schemas/user-schema';

// ? Defining product object
export interface Product {
  _id?: ObjectId;
  name: string;
  description: string;
  code: string;
  url: string;
  price: number;
  stock: number;
}

// ? Defining cart object
export interface Cart {
  _id?: ObjectId;
  products?: Array<Ref<Product>>;
}

// ? Defining user object
// export interface User {
//   _id?: ObjectId;
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   address: string;
//   age: number;
//   cellphone: string;
// }

// ? Defining user object type
export type UserType = TypeOf<typeof userSchema>['body'];
