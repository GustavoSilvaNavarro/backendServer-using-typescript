import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Product {
  @prop({ required: true, trim: true })
  name!: string;

  @prop({ required: true, trim: true })
  description!: string;

  @prop({ required: true, trim: true })
  code!: string;

  @prop({ required: true, trim: true })
  url!: string;

  @prop({ required: true, min: 0 })
  price!: number;

  @prop({ required: true, min: 0 })
  stock!: number;
}

const ProductModel = getModelForClass(Product);

export default ProductModel;
