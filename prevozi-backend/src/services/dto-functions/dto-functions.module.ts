import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarColor, CarColorSchema } from 'src/models/car/car.color.model';
import { City, CitySchema } from 'src/models/city/city.model';
import { Role, RoleSchema } from 'src/models/role/role.model';
import { User, UserSchema } from 'src/models/user/user.model';
import { DtoFunctionsService } from './dto-functions.service';

@Module({
  providers: [DtoFunctionsService],
  exports: [DtoFunctionsService],
  imports: [
    MongooseModule.forFeature([
      { name: City.name, schema: CitySchema },
      { name: CarColor.name, schema: CarColorSchema },
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
})
export class DtoFunctionsModule {}
