import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { City } from 'src/models/city/city.model';
import { JwtAuthGuard } from '../user/auth/guards/jwt-auth.guard';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getCities(): Promise<Array<City>> {
    return await this.cityService.getCities();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async addCities(@Body() cities: Array<any>): Promise<Array<City>> {
    return await this.cityService.addCities(cities);
  }
}
