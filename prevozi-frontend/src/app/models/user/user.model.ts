import { RoleDTO } from '../role/role.model';

export class UserDTO {
  id?: string | undefined | null = null;
  username: string | undefined | null = null;
  email: string | undefined | null = null;
  password?: string | undefined | null = null;
  rating: number | undefined | null = null;
  roles: Array<RoleDTO> | undefined | null = null;
}
