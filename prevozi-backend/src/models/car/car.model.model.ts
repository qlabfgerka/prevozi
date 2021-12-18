import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CarModelDocument = CarModel & Document;

@Schema()
export class CarModel {
  id?: string | undefined | null = null;

  @Prop()
  value: string;
}

export const CarModelSchema = SchemaFactory.createForClass(CarModel);
