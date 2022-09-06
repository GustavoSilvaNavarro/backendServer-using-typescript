import { ObjectId } from 'mongoose';

import CrudContainerMongo from '../../mDBContainer';
import env from '../../../utils/env/variables-env';
import { AppErrors } from '../../../utils/errors/allErrors';

class CartMongo extends CrudContainerMongo {
  //! INSERT NEW EMPTY CART OF PRODUCTS
  async addNewCart(): Promise<ObjectId> {
    if (env.cartTipo !== undefined) {
      return await this.createNewData(env.cartTipo);
    }

    const err = new AppErrors('Collection type must be a string', 400);
    throw err;
  }

  //! DELETE AN EXISTING SINGLE CART
  async deleteCart(id: string): Promise<string> {
    if (env.cartTipo !== undefined) {
      return await this.deleteData(id, env.cartTipo);
    }

    const err = new AppErrors('Collection type must be a string', 400);
    throw err;
  }
}

export default new CartMongo();
