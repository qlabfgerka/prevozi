import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../role/role.model';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  id?: string | undefined | null = null;

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  rating: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
  roles: Role[];

  @Prop()
  password?: string;

  @Prop()
  refreshToken?: string;

  @Prop()
  refreshTokenExpiry?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
