import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { City, CityDocument } from 'src/models/city/city.model';
import { DtoFunctionsService } from 'src/services/dto-functions/dto-functions.service';

@Injectable()
export class CityService {
  constructor(
    @InjectModel(City.name) private cityModel: Model<CityDocument>,
    private readonly dtoFunctions: DtoFunctionsService,
  ) {}

  public async getCities(): Promise<Array<City>> {
    return this.dtoFunctions.citiesToDTO(await this.cityModel.find());
  }

  public async addCities(cities: Array<any>): Promise<Array<City>> {
    for (const c of cities) {
      const city = new this.cityModel({
        value: c.city,
      });
      await city.save();
    }

    return this.dtoFunctions.citiesToDTO(await this.cityModel.find());
  }
}
