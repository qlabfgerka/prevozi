import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  id?: string | undefined | null = null;

  @Prop()
  value: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
