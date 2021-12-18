import { UserDTO } from '../user/user.model';

export class ReservationDTO {
  id?: string | undefined | null = null;
  user: UserDTO | undefined | null = null;
  confirmed: boolean | undefined | null = null;
  pickedUp: boolean | undefined | null = null;
}
