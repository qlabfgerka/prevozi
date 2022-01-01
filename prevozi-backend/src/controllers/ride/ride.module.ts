import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideController } from './ride.controller';
import { DtoFunctionsModule } from 'src/services/dto-functions/dto-functions.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Ride, RideSchema } from 'src/models/ride/ride.model';
import { User, UserSchema } from 'src/models/user/user.model';

@Module({
  providers: [RideService],
  controllers: [RideController],
  imports: [
    DtoFunctionsModule,
    MongooseModule.forFeature([
      { name: Ride.name, schema: RideSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
})
export class RideModule {}
