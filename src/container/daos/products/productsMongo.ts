import { ObjectId } from 'mongoose';

import CrudContainerMongo from '../../mDBContainer';
import { AppErrors } from '../../../utils/errors/allErrors';
import env from '../../../utils/env/variables-env';
import { Product } from '../../../types/ecomTypes';

class ProductsMongo extends CrudContainerMongo {
  //! Get all products
  async getAllProducts(): Promise<Product[]> {
    if (env.productTipo !== undefined) {
      return await this.readAllData(env.productTipo);
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
}

export default new ProductsMongo();
