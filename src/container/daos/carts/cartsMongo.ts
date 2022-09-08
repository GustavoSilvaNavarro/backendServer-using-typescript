import { ObjectId, isValidObjectId, AnyObject, Types } from 'mongoose';

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

  //! LIST ALL PRODUCTS FROM AN SPECIFIC CART
  async listAllProductsFromCart(idCart: string): Promise<AnyObject | string> {
    if (idCart !== undefined) {
      if (isValidObjectId(idCart)) {
        const cartExist = await CartModel.find({ _id: idCart }, { _id: 1 });

        if (cartExist.length > 0) {
          const cartHasProducts = await CartModel.aggregate([
            { $match: { _id: new Types.ObjectId(idCart) } },
            { $project: { count: { $size: '$products' } } },
          ]);

          if (cartHasProducts[0].count > 0) {
            // TODO -> GET PRODUCT LIST
            const allProducts = await CartModel.findById(idCart, { products: 1, _id: 0 }).populate(
              'products',
              '-createdAt -updatedAt -__v -_id'
            );

            if (allProducts !== null) {
              return allProducts;
            } else {
              const err = new AppErrors('Error rendering the list of products inside cart', 500);
              throw err;
            }
          } else {
            // TODO -> Sent the array is empty
            return `Cart with ID: ${idCart} is empty`;
          }
        } else {
          const err = new AppErrors('The ID provided must be valid', 400);
          throw err;
        }
      } else {
        const err = new AppErrors('Cart was not found!', 400);
        throw err;
      }
    } else {
      const err = new AppErrors('Must provide an ID of a Cart to show all products', 400);
      throw err;
    }
  }

  //! MODIFY CART TO ADD A NEW PRODUCT INTO LIST OF PRODUCTS INSIDE THE CART
  async addSingleProductToCart(idCart: string, idProduct: string): Promise<string> {
    if (env.cartTipo !== undefined && env.productTipo !== undefined) {
      const productToAdd = await this.readAllData(env.productTipo, idProduct);
      const selectedCart = await this.readAllData(env.cartTipo, idCart);

      if (productToAdd !== null && selectedCart !== null) {
        // TODO -> Check that product is not in the list already
        const productIsOnList = await CartModel.where('_id').equals(idCart).where('products').equals(idProduct).count();

        if (productIsOnList <= 0) {
          // TODO -> Add product since is not in the list
          await CartModel.findByIdAndUpdate(idCart, { $push: { products: idProduct } }, { new: true });
          return `Product with ID: ${idProduct} was added to the Cart with ID: ${idCart}`;
        } else {
          const err = new AppErrors(
            `Product with ID: ${idProduct} already in the list, Update the amount instead of add same product to the Cart with ID: ${idCart}!`,
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

  //! DELETE SINGLE PRODUCT BY SPECIFIC ID FROM AN SPECIFIC CART ID
  async deleteOneProductFromCart(idCart: string, idProduct: string): Promise<string> {
    if (env.cartTipo !== undefined && env.productTipo !== undefined) {
      const productToDelete = await this.readAllData(env.productTipo, idProduct);
      const selectedCart = await this.readAllData(env.cartTipo, idCart);

      if (productToDelete !== null && selectedCart !== null) {
        // TODO - Verify that the product is in that list
        const productExists = await CartModel.where('_id').equals(idCart).where('products').equals(idProduct).count();

        if (productExists > 0) {
          await CartModel.findByIdAndUpdate(idCart, { $pull: { products: { $in: [idProduct] } } }, { new: true });
          return `Product with ID: ${idProduct}, was deleted from the cart with ID: ${idCart}`;
        } else {
          const err = new AppErrors(
            `Product with ID: ${idProduct} can not be deleted because is not in the Cart with ID: ${idCart}`,
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
