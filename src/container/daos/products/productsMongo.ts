import { ObjectId } from 'mongoose';

import CrudContainerMongo from '../../mDBContainer';
import { AppErrors } from '../../../utils/errors/allErrors';
import env from '../../../utils/env/variables-env';
import { Product } from '../../../types/ecomTypes';

class ProductsMongo extends CrudContainerMongo {
  //! Get all products
  async getAllProducts(id?: string): Promise<Product[] | Product> {
    if (env.productTipo !== undefined) {
      if (id !== undefined) {
        //! Get only one product from list
        return await this.readAllData(env.productTipo, id);
      } else {
        return await this.readAllData(env.productTipo);
      }
    }

    const err = new AppErrors('Collection type must be a string', 400);
    throw err;
  }

  //! Insert new data product
  async addProduct(dataProduct: Product): Promise<ObjectId> {
    if (env.productTipo !== undefined) {
      return await this.createNewData(dataProduct, env.productTipo);
    }

    const err = new AppErrors('Collection type must be an string', 400);
    throw err;
  }

  //! Update an alredy existing product by ID
  async updateProduct(id: string, data: Product): Promise<string> {
    if (env.productTipo !== undefined) {
      if (Object.entries(data).length > 0) {
        return await this.updateData(id, data, env.productTipo);
      } else {
        const err = new AppErrors('You need to provide product data to updated the collection', 400);
        throw err;
      }
    }

    const err = new AppErrors('Collection type must be an string', 400);
    throw err;
  }
}

export default new ProductsMongo();
