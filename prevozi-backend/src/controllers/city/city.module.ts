import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { City, CitySchema } from 'src/models/city/city.model';
import { DtoFunctionsModule } from 'src/services/dto-functions/dto-functions.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [CityService],
  controllers: [CityController],
  imports: [
    DtoFunctionsModule,
    MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
  ],
})
export class CityModule {}
