import { AnyObject, ObjectId } from 'mongoose';

import ProductModel from '../model/products-model';
import { AppErrors } from '../utils/errors/allErrors';
import { Product } from '../types/ecomTypes';

// ? BASIC CRUD
class CrudContainerMongo {
  //! CREATE NEW DATA
  async createNewData(data: AnyObject, collectionType: string): Promise<ObjectId> {
    if (collectionType === 'product') {
      const newData = new ProductModel(data);
      await newData.save();
      return newData._id;
    }

    // if (collectionType === 'cart') {
    //   const newData = new ProductModel(data);
    //   await newData.save();
    //   return newData._id;
    // }

    const err = new AppErrors('Collection type only takes product or cart as values', 400);
    throw err;
  }

  //! READ DATA
  async readAllData(collectionType: string): Promise<Product[]> {
    let anyDataRead;

    if (collectionType === 'product') {
      anyDataRead = await ProductModel.find({});
    }

    if (anyDataRead !== null && anyDataRead !== undefined) {
      return anyDataRead;
    }

    const err = new AppErrors('Collection type only can be product or cart as a string type', 400);
    throw err;
  }

  // updateData(): void {}

  // deleteData(): void {}
}

export default CrudContainerMongo;
