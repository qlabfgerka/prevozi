import {
  Controller,
  Get,
  UseGuards,
  Request,
  Patch,
  Body,
  Param,
} from '@nestjs/common';
import { User } from 'src/models/user/user.model';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getUser(@Request() req: any) {
    return await this.userService.getUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  public async updateRole(
    @Request() req: any,
    @Body('role') role: boolean,
  ): Promise<User> {
    return await this.userService.updateRole(req.user.id, role);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  public async updateRating(
    @Param('id') id: string,
    @Body('ratings') ratings: Array<number>,
  ): Promise<void> {
    await this.userService.updateRating(id, ratings);
  }
}
