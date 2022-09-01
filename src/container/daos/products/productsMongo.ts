import { Types } from 'mongoose';
import CrudContainerMongo from '../../mDBContainer';
import { AppErrors } from '../../../utils/errors/allErrors';
import env from '../../../utils/env/variables-env';
import { Product } from '../../../types/ecomTypes';

class ProductsMongo extends CrudContainerMongo {
  // * Insert new data product
  async addProduct(dataProduct: Product): Promise<Types.ObjectId> {
    try {
      if (env.productTipo !== undefined) {
        return await this.createNewData(dataProduct, env.productTipo);
      }

      const err = new AppErrors('Tipo must be an string', 400);
      throw err;
    } catch (err) {
      if (err instanceof AppErrors) {
        throw err;
      } else {
        throw err;
      }
    }
  }
}

export default new ProductsMongo();
