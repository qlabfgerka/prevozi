import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { DtoFunctionsModule } from 'src/services/dto-functions/dto-functions.module';
import { CarBrand, CarBrandSchema } from 'src/models/car/car.brand.model';
import { MongooseModule } from '@nestjs/mongoose';
import { CarColor, CarColorSchema } from 'src/models/car/car.color.model';

@Module({
  providers: [CarService],
  controllers: [CarController],
  imports: [
    DtoFunctionsModule,
    MongooseModule.forFeature([
      { name: CarBrand.name, schema: CarBrandSchema },
      { name: CarColor.name, schema: CarColorSchema },
    ]),
  ],
})
export class CarModule {}
