import { prop, modelOptions, getModelForClass, pre, DocumentType } from '@typegoose/typegoose';
import argon2 from 'argon2';

import logger from '../config/loggers/logger';
import { AppErrors } from '../utils/errors/allErrors';

@pre<User>('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const hash = await argon2.hash(this.password);
  this.password = hash;
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
class User {
  @prop({ type: String, required: true, trim: true })
  firstName: string;

  @prop({ type: String, required: true, trim: true })
  lastName: string;

  @prop({ type: String, required: true, unique: true, trim: true, lowercase: true })
  email: string;

  @prop({ type: String, required: true, trim: true })
  password: string;

  @prop({ type: String, required: true, trim: true })
  address: string;

  @prop({ type: Number, required: true, min: 0 })
  age: number;

  @prop({ type: String, required: true, trim: true })
  cellphone: string;

  async validatePassword(this: DocumentType<User>, userPassword: string): Promise<boolean | any> {
    try {
      const isVerified = await argon2.verify(this.password, userPassword);
      if (isVerified) {
        return isVerified;
      }

      const err = new AppErrors('Password does not match', 400);
      throw err;
    } catch (err) {
      logger.error('Could not validate Password');
      console.log(err);
    }
  }
}

const UserModel = getModelForClass(User);

export default UserModel;
