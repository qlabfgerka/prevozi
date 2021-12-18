import { Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../user/user.model';

export class Reservation {
  id?: string | undefined | null = null;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  confirmed: boolean;

  @Prop()
  pickedUp: boolean;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
