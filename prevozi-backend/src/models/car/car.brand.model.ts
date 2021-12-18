import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CarBrandDocument = CarBrand & Document;

@Schema()
export class CarBrand {
  id?: string | undefined | null = null;

  @Prop()
  value: string;
}

export const CarBrandSchema = SchemaFactory.createForClass(CarBrand);
