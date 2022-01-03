import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { City } from 'src/models/city/city.model';
import { Filter } from 'src/models/filter/filter.model';
import { Reservation } from 'src/models/reservation/reservation.model';
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

  public async getRides(filter: Filter): Promise<Array<Ride>> {
    let rides = await this.dtoFunctions.ridesToDTO(
      (
        await this.rideModel.find()
      ).filter((ride: Ride) => new Date(ride.arrivalTime) > new Date()),
    );
    let temp = rides;

    if (filter.endTime)
      rides = rides.filter(
        (ride: Ride) => ride.arrivalTime < new Date(filter.endTime),
      );

    if (filter.startTime)
      rides = rides.filter(
        (ride: Ride) => ride.departureTime > new Date(filter.startTime),
      );

    if (filter.start) {
      temp = rides;
      rides = temp.filter(
        (ride: Ride) => ride.departure.id === filter.start.toString(),
      );

      rides = rides.concat(
        temp.filter((ride: Ride) =>
          ride.stops.some((city: City) => city.id === filter.start.toString()),
        ),
      );
    }

    if (filter.end) rides = this.containsCity(rides, filter.end, filter.start);

    if (filter.price)
      rides = rides.filter((ride: Ride) => ride.price < filter.price);

    return rides;
  }

  public async addRide(ride: Ride, id: string): Promise<Ride> {
    ride.owner = await this.userModel.findById(id);
    const newRide = new this.rideModel(ride);
    await newRide.save();
    return await this.dtoFunctions.rideToDTO(newRide);
  }

  public async bookSlot(rideId: string, userId: string): Promise<Ride> {
    const ride = await this.rideModel.findById(rideId);
    const user = await this.userModel.findById(userId);

    if (
      ride.spots - ride.reservations.length <= 0 ||
      ride.reservations.find(
        (reservation: Reservation) => reservation.user.toString() === user.id,
      )
    )
      return ride;

    const reservation: Reservation = {
      user: user._id,
      confirmed: false,
      pickedUp: false,
    };
    ride.reservations.push(reservation);

    await ride.save();

    return await this.dtoFunctions.rideToDTO(ride);
  }

  public async getMyRides(id: string): Promise<Array<Ride>> {
    const rides = await this.rideModel.find();

    return await (
      await this.dtoFunctions.ridesToDTO(rides)
    ).filter(
      (ride: Ride) =>
        ride.reservations.find(
          (reservation: Reservation) => reservation.user.id === id,
        ) || ride.owner.id === id,
    );
  }

  private containsCity(
    rides: Array<Ride>,
    city: City,
    start?: City,
  ): Array<Ride> {
    const newRides = new Array<Ride>();
    let foundStart: boolean;
    let foundEnd: boolean;

    for (const ride of rides) {
      foundStart = false;
      foundEnd = false;
      for (const stop of ride.stops) {
        if (stop.id === city.toString()) foundEnd = true;
        if (foundEnd && start && stop.id === start.toString())
          foundStart = true;
      }
      if (foundEnd && !foundStart) newRides.push(ride);
    }

    return newRides;
  }
}
