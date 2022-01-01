import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CarBrand } from 'src/models/car/car.brand.model';
import { CarColor, CarColorDocument } from 'src/models/car/car.color.model';
import { CarDTO } from 'src/models/car/car.model';
import { City, CityDocument } from 'src/models/city/city.model';
import { Reservation } from 'src/models/reservation/reservation.model';
import { Ride } from 'src/models/ride/ride.model';
import { Role } from 'src/models/role/role.model';
import { User, UserDocument } from 'src/models/user/user.model';

@Injectable()
export class DtoFunctionsService {
  constructor(
    @InjectModel(City.name) private cityModel: Model<CityDocument>,
    @InjectModel(CarColor.name) private carColorModel: Model<CarColorDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  public userToDTO(user: User): User {
    if (!user) return undefined;
    const userDTO: User = {
      id: user.id,
      email: user.email,
      username: user.username,
      rating: user.rating,
      roles: this.rolesToDTO(user.roles),
    };

    return userDTO;
  }

  public roleToDTO(role: Role): Role {
    const roleDTO: Role = {
      id: role.id,
      value: role.value,
    };

    return roleDTO;
  }

  public rolesToDTO(roles: Array<Role>): Array<Role> {
    const rolesDTO = new Array<Role>();

    roles.forEach((role: Role) => {
      rolesDTO.push(this.roleToDTO(role));
    });

    return rolesDTO;
  }

  public cityToDTO(city: City): City {
    const cityDTO: City = {
      id: city.id,
      value: city.value,
    };

    return cityDTO;
  }

  public citiesToDTO(cities: Array<City>): Array<City> {
    const citiesDTO = new Array<City>();

    cities.forEach((city: City) => {
      citiesDTO.push(this.cityToDTO(city));
    });

    return citiesDTO;
  }

  public carBrandToDTO(brand: CarBrand): CarBrand {
    const carBrandDTO: CarBrand = {
      id: brand.id,
      value: brand.value,
      models: brand.models,
    };
    return carBrandDTO;
  }

  public carBrandsToDTO(brands: Array<CarBrand>): Array<CarBrand> {
    const carBrandsDTO = new Array<CarBrand>();

    brands.forEach((brand: CarBrand) => {
      carBrandsDTO.push(this.carBrandToDTO(brand));
    });

    return carBrandsDTO;
  }

  public carColorToDTO(color: CarColor): CarColor {
    const carColorDTO: CarColor = {
      id: color.id,
      value: color.value,
    };
    return carColorDTO;
  }

  public carColorsToDTO(colors: Array<CarColor>): Array<CarColor> {
    const carColorsDTO = new Array<CarColor>();

    colors.forEach((color: CarColor) => {
      carColorsDTO.push(this.carColorToDTO(color));
    });

    return carColorsDTO;
  }

  public carsToDTO(
    carBrands: Array<CarBrand>,
    carColors: Array<CarColor>,
  ): CarDTO {
    const carDTO: CarDTO = {
      brands: this.carBrandsToDTO(carBrands),
      colors: this.carColorsToDTO(carColors),
    };

    return carDTO;
  }

  public async rideToDTO(ride: Ride): Promise<Ride> {
    const rideDTO: Ride = {
      id: ride.id,
      departure: this.cityToDTO(await this.getCity(ride.departure)),
      departureTime: ride.departureTime,
      stops: this.citiesToDTO(await this.getCities(ride.stops)),
      arrivalTime: ride.arrivalTime,
      price: ride.price,
      spots: ride.spots,
      luggage: ride.luggage,
      carBrand: ride.carBrand,
      carColor: this.carColorToDTO(await this.getCarColor(ride.carColor)),
      carRegistration: ride.carRegistration,
      reservations: await this.reservationsToDTO(ride.reservations),
      owner: this.userToDTO(await this.getUser(ride.owner)),
    };

    return rideDTO;
  }

  public async ridesToDTO(rides: Array<Ride>): Promise<Array<Ride>> {
    const ridesDTO = new Array<Ride>();

    for (const ride of rides) {
      ridesDTO.push(await this.rideToDTO(ride));
    }

    return ridesDTO;
  }

  public async reservationToDTO(
    reservation: Reservation,
  ): Promise<Reservation> {
    const reservationDTO: Reservation = {
      id: reservation.id,
      confirmed: reservation.confirmed,
      pickedUp: reservation.pickedUp,
      user: this.userToDTO(await this.getUser(reservation.user)),
    };

    return reservationDTO;
  }

  public async reservationsToDTO(
    reservations: Array<Reservation>,
  ): Promise<Array<Reservation>> {
    const reservationsDTO = new Array<Reservation>();

    for (const reservation of reservations) {
      reservationsDTO.push(await this.reservationToDTO(reservation));
    }

    return reservationsDTO;
  }

  private async getCity(city: City): Promise<City> {
    if (!city) return undefined;
    if (city.value) return await this.cityModel.findById(city.id);
    return await this.cityModel.findById(city.toString());
  }

  private async getCities(cities: Array<City>): Promise<Array<City>> {
    const citiesDTO = new Array<City>();

    for (const city of cities) {
      citiesDTO.push(await this.getCity(city));
    }

    return citiesDTO;
  }

  private async getCarColor(color: CarColor): Promise<CarColor> {
    if (!color) return undefined;
    if (color.value) return await this.carColorModel.findById(color.id);
    return await this.carColorModel.findById(color.toString());
  }

  private async getUser(user: User): Promise<User> {
    if (!user) return undefined;
    if (user.username) return await this.userModel.findById(user.id);
    return await this.userModel.findById(user.toString());
  }
}
