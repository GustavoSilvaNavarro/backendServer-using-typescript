import { ObjectId } from 'mongoose';
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
