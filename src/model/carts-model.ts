import { prop, getModelForClass, modelOptions, Ref } from '@typegoose/typegoose';
import { Product } from './products-model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
class Cart {
  @prop({ ref: () => Product, default: [] })
  products?: Array<Ref<Product>>;
}

const CartModel = getModelForClass(Cart);

export default CartModel;
