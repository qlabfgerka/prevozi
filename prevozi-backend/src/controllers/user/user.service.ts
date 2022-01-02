import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from 'src/models/role/role.model';
import { User, UserDocument } from 'src/models/user/user.model';
import { DtoFunctionsService } from 'src/services/dto-functions/dto-functions.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
    private readonly dtoFunctions: DtoFunctionsService,
  ) {}

  public async getUser(id: string): Promise<User> {
    return await this.dtoFunctions.userToDTO(await this.userModel.findById(id));
  }

  public async updateRole(id: string, roleID: boolean): Promise<User> {
    let role: Role;
    if (!roleID) role = await this.roleModel.findOne({ value: 'OFFER' });
    else role = await this.roleModel.findOne({ value: 'USE' });
    const user = await this.userModel.findById(id);
    const index = user.roles.indexOf(
      user.roles.find((r: Role) => role.id === r.toString()),
    );

    if (index > -1) user.roles.splice(index, 1);
    else user.roles.push(role);

    await user.save();

    return await this.dtoFunctions.userToDTO(user);
  }
}
