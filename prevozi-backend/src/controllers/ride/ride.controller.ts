import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Ride } from 'src/models/ride/ride.model';
import { JwtAuthGuard } from '../user/auth/guards/jwt-auth.guard';
import { RideService } from './ride.service';

@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getRides(): Promise<Array<Ride>> {
    return await this.rideService.getRides();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async addRide(@Request() req: any, @Body() ride: Ride): Promise<Ride> {
    return await this.rideService.addRide(ride, req.user.id);
  }
}
