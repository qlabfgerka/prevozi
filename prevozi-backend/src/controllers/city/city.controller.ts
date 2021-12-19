import { Body, Controller, Get, Post } from '@nestjs/common';
import { City } from 'src/models/city/city.model';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  public async getCities(): Promise<Array<City>> {
    return await this.cityService.getCities();
  }

  @Post()
  public async addCities(@Body() cities: Array<any>): Promise<Array<City>> {
    return await this.cityService.addCities(cities);
  }
}
