import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { City } from '../city/city.model';
import { CarBrand } from '../car/car.brand.model';
import { CarModel } from '../car/car.model.model';
import { CarColor } from '../car/car.color.model';
import { Reservation } from '../reservation/reservation.model';
import * as mongoose from 'mongoose';

export type RideDocument = Ride & Document;

@Schema()
export class Ride {
  id?: string | undefined | null = null;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'City' })
  departure: City;

  @Prop()
  departureTime: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'City' }] })
  stops: City[];

  @Prop()
  arrivalTime: number;

  @Prop()
  price: number;

  @Prop()
  spots: number;

  @Prop()
  luggage: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CarBrand' })
  carBrand: CarBrand;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CarModel' })
  carModel: CarModel;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CarColor' })
  carColor: CarColor;

  @Prop()
  carRegistration: string;

  @Prop()
  reservations: Reservation[];
}

export const RideSchema = SchemaFactory.createForClass(Ride);
