export interface UserResponseInterface {
  message: string;
  success: boolean;
  data: UserInterface;
}

export interface UserInterface {
  id: string;
  name: string;
  phone: string;
  password: string;
  avatar: null;
  status: string;
  created_at: Date;
  updated_at: Date;
}
