import { UserInterface } from './user.interface';

export interface UserUpdateProfileResponseInterface {
  message: string;
  success: boolean;
  data: UserInterface;
}
