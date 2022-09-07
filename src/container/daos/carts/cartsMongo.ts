import { ObjectId } from 'mongoose';

import CrudContainerMongo from '../../mDBContainer';
import env from '../../../utils/env/variables-env';
import { AppErrors } from '../../../utils/errors/allErrors';
import CartModel from '../../../model/carts-model';

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

  //! MODIFY CART TO ADD A NEW PRODUCT INTO LIST OF PRODUCTS INSIDE THE CART
  async addSingleProductToCart(idCart: string, idProduct: string): Promise<string> {
    if (env.cartTipo !== undefined && env.productTipo !== undefined) {
      const productToAdd = await this.readAllData(env.productTipo, idProduct);
      const selectedCart = await this.readAllData(env.cartTipo, idCart);

      if (productToAdd !== null && selectedCart !== null) {
        const productAlreadyOnList = await CartModel.find({
          $and: [{ _id: idCart }, { products: { $eq: idProduct } }],
        });
        // const productAlreadyOnList = await CartModel.find({ products: { $eq: idProduct } });

        if (productAlreadyOnList.length <= 0) {
          console.log(selectedCart);
          return 'All great!';
          // return await this.updateData(idCart, { products: [idProduct, '6310cdfb91f80552b85ed806'] }, env.cartTipo);
        } else {
          const err = new AppErrors(
            `Item with ID: ${idProduct} already in the list, Update the amount instead of add same product to the cart with ID: ${idCart}!`,
            400
          );
          throw err;
        }
      } else {
        const err = new AppErrors('Product or Cart was not Found!', 400);
        throw err;
      }
    }

    const err = new AppErrors('Collection type must be a string', 400);
    throw err;
  }
}

export default new CartMongo();
