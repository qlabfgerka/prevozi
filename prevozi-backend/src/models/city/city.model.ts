import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CityDocument = City & Document;

@Schema()
export class City {
  id?: string | undefined | null = null;

  @Prop()
  value: string;
}

export const CitySchema = SchemaFactory.createForClass(City);
