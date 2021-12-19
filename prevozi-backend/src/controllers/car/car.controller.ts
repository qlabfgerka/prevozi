import { Body, Controller, Get, Post } from '@nestjs/common';
import { CarDTO } from 'src/models/car/car.model';
import { CarService } from './car.service';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  public async getCars(): Promise<CarDTO> {
    return await this.carService.getCars();
  }

  @Post()
  public async addCars(@Body() cars: Array<any>): Promise<CarDTO> {
    return await this.carService.addCars(cars);
  }
}
