import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/user/user.model';
import { DtoFunctionsModule } from 'src/services/dto-functions/dto-functions.module';
import { Role, RoleSchema } from 'src/models/role/role.model';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    DtoFunctionsModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
})
export class UserModule {}
