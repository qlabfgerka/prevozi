import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CarBrand, CarBrandDocument } from 'src/models/car/car.brand.model';
import { CarColor, CarColorDocument } from 'src/models/car/car.color.model';
import { CarDTO } from 'src/models/car/car.model';
import { DtoFunctionsService } from 'src/services/dto-functions/dto-functions.service';

@Injectable()
export class CarService {
  constructor(
    @InjectModel(CarBrand.name) private carBrandModel: Model<CarBrandDocument>,
    @InjectModel(CarColor.name) private carColorModel: Model<CarColorDocument>,
    private readonly dtoFunctions: DtoFunctionsService,
  ) {}

  public async getCars(): Promise<CarDTO> {
    return this.dtoFunctions.carsToDTO(
      await this.carBrandModel.find(),
      await this.carColorModel.find(),
    );
  }

  public async addCars(cars: Array<any>): Promise<CarDTO> {
    const colors: Array<string> = [
      'White',
      'Black',
      'Gray',
      'Silver',
      'Red',
      'Blue',
      'Brown',
      'Green',
      'Beige',
      'Orange',
      'Gold',
      'Yellow',
      'Purple',
    ];

    for (const color of colors) {
      const carColor = new this.carColorModel({
        value: color,
      });
      await carColor.save();
    }

    for (const brand of cars) {
      const carBrand = new this.carBrandModel({
        value: brand.brand,
      });

      for (const model of brand.models) {
        carBrand.models.push(model);
      }

      await carBrand.save();
    }

    return this.dtoFunctions.carsToDTO(
      await this.carBrandModel.find(),
      await this.carColorModel.find(),
    );
  }
}
