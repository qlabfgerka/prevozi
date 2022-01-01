import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ride, RideDocument } from 'src/models/ride/ride.model';
import { User, UserDocument } from 'src/models/user/user.model';
import { DtoFunctionsService } from 'src/services/dto-functions/dto-functions.service';

@Injectable()
export class RideService {
  constructor(
    @InjectModel(Ride.name) private rideModel: Model<RideDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly dtoFunctions: DtoFunctionsService,
  ) {}

  public async getRides(): Promise<Array<Ride>> {
    return await this.dtoFunctions.ridesToDTO(
      (
        await this.rideModel.find()
      ).filter((ride: Ride) => new Date(ride.arrivalTime) > new Date()),
    );
  }

  public async addRide(ride: Ride, id: string): Promise<Ride> {
    ride.owner = await this.userModel.findById(id);
    const newRide = new this.rideModel(ride);
    await newRide.save();
    return await this.dtoFunctions.rideToDTO(newRide);
  }
}
