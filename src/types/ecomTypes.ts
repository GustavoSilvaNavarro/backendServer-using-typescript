import { ObjectId } from 'mongoose';
import { Ref } from '@typegoose/typegoose';

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
