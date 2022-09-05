import { AnyObject, isValidObjectId, ObjectId } from 'mongoose';

import ProductModel from '../model/products-model';
import { AppErrors } from '../utils/errors/allErrors';
import { Product } from '../types/ecomTypes';

//! BASIC CRUD
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
  async readAllData(collectionType: string, id?: string): Promise<Product[] | Product> {
    let anyDataRead;

    if (collectionType === 'product') {
      if (id !== undefined) {
        if (isValidObjectId(id)) {
          anyDataRead = await ProductModel.findById(id);
        } else {
          const err = new AppErrors('Please enter a valid ID', 400);
          throw err;
        }
      } else {
        anyDataRead = await ProductModel.find({});
      }

      if (anyDataRead !== null) {
        return anyDataRead;
      }
    }

    const err = new AppErrors('Collection type only can be product or cart as a string type', 400);
    throw err;
  }

  //! Update data
  async updateData(id: string, data: AnyObject, collectionType: string): Promise<string> {
    if (collectionType === 'product') {
      if (id !== undefined) {
        if (isValidObjectId(id)) {
          const product = await ProductModel.findById(id);
          if (product !== null) {
            Object.assign(product, data);
            await product.save();

            return `Product with ID: ${id} was updated!`;
          } else {
            const err = new AppErrors('Product was not found!', 400);
            throw err;
          }
        } else {
          const err = new AppErrors('The ID must be valid!', 400);
          throw err;
        }
      } else {
        const err = new AppErrors('Must have an ID to update the data', 400);
        throw err;
      }
    } else if (collectionType === 'cart') {
      // TODO: Create cart logic inside here
      console.log(collectionType);
    }

    const err = new AppErrors('Collection type must be product or cart as a string type', 400);
    throw err;
  }

  // deleteData(): void {}
}

export default CrudContainerMongo;
