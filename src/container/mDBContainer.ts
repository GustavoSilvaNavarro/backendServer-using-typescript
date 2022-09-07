import { AnyObject, isValidObjectId, ObjectId } from 'mongoose';

import ProductModel from '../model/products-model';
import CartModel from '../model/carts-model';
import { AppErrors } from '../utils/errors/allErrors';

//! BASIC CRUD
class CrudContainerMongo {
  //! CREATE NEW DATA
  async createNewData(collectionType: string, data?: AnyObject): Promise<ObjectId> {
    let newData;

    if (collectionType === 'product') {
      newData = new ProductModel(data);
    } else if (collectionType === 'cart') {
      newData = new CartModel(data);
    } else {
      const err = new AppErrors('Collection type only takes product or cart as values', 400);
      throw err;
    }

    await newData.save();
    return newData._id;
  }

  //! READ DATA
  async readAllData(collectionType: string, id?: string): Promise<AnyObject> {
    let anyDataRead;

    if (collectionType === 'product') {
      if (id !== undefined) {
        if (isValidObjectId(id)) {
          anyDataRead = await ProductModel.findById(id);
        } else {
          const err = new AppErrors('Please enter a valid ID for Product', 400);
          throw err;
        }
      } else {
        anyDataRead = await ProductModel.find({});
      }

      if (anyDataRead !== null) {
        return anyDataRead;
      } else {
        const err = new AppErrors('Product was not Found', 400);
        throw err;
      }
    } else if (collectionType === 'cart') {
      if (id !== undefined) {
        if (isValidObjectId(id)) {
          anyDataRead = await CartModel.findById(id);
        } else {
          const err = new AppErrors('Please enter a valid ID for Cart', 400);
          throw err;
        }
      } else {
        anyDataRead = await CartModel.find({});
      }

      if (anyDataRead !== null) {
        return anyDataRead;
      } else {
        const err = new AppErrors('Cart was not Found', 400);
        throw err;
      }
    } else {
      const err = new AppErrors('Collection type only can be product or cart as a string type', 400);
      throw err;
    }
  }

  //! Update data
  async updateData(id: string, data: AnyObject, collectionType: string): Promise<string> {
    if (id !== undefined) {
      if (isValidObjectId(id)) {
        if (collectionType === 'product') {
          const product = await ProductModel.findById(id);
          if (product !== null) {
            Object.assign(product, data);
            await product.save();

            return `Product with ID: ${id} was updated!`;
          }

          const err = new AppErrors('Product was not found!', 400);
          throw err;
        } else if (collectionType === 'cart') {
          // TODO: Create cart logic inside here
          const cart = await CartModel.findById(id);
          if (cart !== null) {
            Object.assign(cart, data);
            await cart.save();

            return `Cart with ID: ${id} was updated!`;
          }

          const err = new AppErrors('Cart was not found!', 400);
          throw err;
        }

        const err = new AppErrors('Collection type must be product or cart as a string type', 400);
        throw err;
      } else {
        const err = new AppErrors('The ID must be valid!', 400);
        throw err;
      }
    } else {
      const err = new AppErrors('Must have an ID to update the data', 400);
      throw err;
    }
  }

  //! Delete data
  async deleteData(id: string, collectionType: string): Promise<string> {
    if (id !== undefined) {
      if (isValidObjectId(id)) {
        if (collectionType === 'product') {
          const productDeleted = await ProductModel.findByIdAndDelete(id);

          if (productDeleted !== null) {
            return `Product with ID: ${id} was deleted!`;
          }

          const err = new AppErrors('Product not Found!', 400);
          throw err;
        } else if (collectionType === 'cart') {
          const cartDeleted = await CartModel.findByIdAndDelete(id);

          if (cartDeleted !== null) {
            return `Cart with ID: ${id} was deleted`;
          }

          const err = new AppErrors('Cart was not Found!', 400);
          throw err;
        }

        const err = new AppErrors('Collection type must be product or cart as strings types', 400);
        throw err;
      }

      const err = new AppErrors('The ID must be valid!', 400);
      throw err;
    } else {
      const err = new AppErrors('Need an ID to delete a product', 400);
      throw err;
    }
  }
}

export default CrudContainerMongo;
