import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CarColorDocument = CarColor & Document;

@Schema()
export class CarColor {
  id?: string | undefined | null = null;

  @Prop()
  value: string;
}

export const CarColorSchema = SchemaFactory.createForClass(CarColor);
