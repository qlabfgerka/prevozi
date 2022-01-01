import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { City } from '../city/city.model';
import { CarBrand } from '../car/car.brand.model';
import { CarColor } from '../car/car.color.model';
import { Reservation } from '../reservation/reservation.model';
import * as mongoose from 'mongoose';
import { User } from '../user/user.model';

export type RideDocument = Ride & Document;

@Schema()
export class Ride {
  id?: string | undefined | null = null;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'City' })
  departure: City;

  @Prop()
  departureTime: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'City' }] })
  stops: City[];

  @Prop()
  arrivalTime: Date;

  @Prop()
  price: number;

  @Prop()
  spots: number;

  @Prop()
  luggage: number;

  @Prop()
  carBrand: CarBrand;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CarColor' })
  carColor: CarColor;

  @Prop()
  carRegistration: string;

  @Prop()
  reservations: Reservation[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;
}

export const RideSchema = SchemaFactory.createForClass(Ride);
