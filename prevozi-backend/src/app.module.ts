import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './controllers/user/auth/auth.module';
import { DtoFunctionsModule } from './services/dto-functions/dto-functions.module';
import { CityModule } from './controllers/city/city.module';
import { CarModule } from './controllers/car/car.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    DtoFunctionsModule,
    CityModule,
    CarModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
