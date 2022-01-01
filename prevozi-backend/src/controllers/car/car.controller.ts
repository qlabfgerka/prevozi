import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CarDTO } from 'src/models/car/car.model';
import { JwtAuthGuard } from '../user/auth/guards/jwt-auth.guard';
import { CarService } from './car.service';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getCars(): Promise<CarDTO> {
    return await this.carService.getCars();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async addCars(@Body() cars: Array<any>): Promise<CarDTO> {
    return await this.carService.addCars(cars);
  }
}
