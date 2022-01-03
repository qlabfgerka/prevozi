import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Patch,
  Param,
  Get,
} from '@nestjs/common';
import { Filter } from 'src/models/filter/filter.model';
import { Ride } from 'src/models/ride/ride.model';
import { JwtAuthGuard } from '../user/auth/guards/jwt-auth.guard';
import { RideService } from './ride.service';

@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @UseGuards(JwtAuthGuard)
  @Post('all')
  public async getRides(@Body('filter') filter: Filter): Promise<Array<Ride>> {
    return await this.rideService.getRides(filter);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async addRide(@Request() req: any, @Body() ride: Ride): Promise<Ride> {
    return await this.rideService.addRide(ride, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  public async bookSlot(
    @Request() req: any,
    @Param('id') id: string,
  ): Promise<Ride> {
    return await this.rideService.bookSlot(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getMyRides(@Request() req: any): Promise<Array<Ride>> {
    return await this.rideService.getMyRides(req.user.id);
  }
}
