import { Injectable } from '@nestjs/common';
import { Role } from 'src/models/role/role.model';
import { User } from 'src/models/user/user.model';

@Injectable()
export class DtoFunctionsService {
  public userToDTO(user: User): User {
    if (!user) return undefined;
    const userDTO: User = {
      id: user.id,
      email: user.email,
      username: user.username,
      rating: user.rating,
      roles: this.rolesToDTO(user.roles),
    };

    return userDTO;
  }

  public roleToDTO(role: Role): Role {
    const roleDTO: Role = {
      id: role.id,
      value: role.value,
    };

    return roleDTO;
  }

  public rolesToDTO(roles: Array<Role>): Array<Role> {
    const rolesDTO = new Array<Role>();

    roles.forEach((role: Role) => {
      rolesDTO.push(this.roleToDTO(role));
    });

    return rolesDTO;
  }
}