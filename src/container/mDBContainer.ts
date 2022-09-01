import { AnyObject, Types } from 'mongoose';
import ProductModel from '../model/products-model';
import { AppErrors } from '../utils/errors/allErrors';

// ? BASIC CRUD
class CrudContainerMongo {
  async createNewData(data: AnyObject, tipo: string): Promise<Types.ObjectId> {
    try {
      if (tipo === 'product') {
        const newData = new ProductModel(data);
        await newData.save();
        return newData._id;
      }

      // if (tipo === 'cart') {
      //   const newData = new ProductModel(data);
      //   await newData.save();
      //   return newData._id;
      // }

      const err = new AppErrors('Tipo only takes product or cart strings', 400);
      throw err;
    } catch (err) {
      if (err instanceof AppErrors) {
        throw err;
      } else {
        throw err;
      }
    }
  }

  // readData(): void {}

  // updateData(): void {}

  // deleteData(): void {}
}

export default CrudContainerMongo;
