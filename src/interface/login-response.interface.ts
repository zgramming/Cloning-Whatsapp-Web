export interface LoginResponseInterface {
  success: boolean;
  message: string;
  data: Data;
  token: string;
}

interface Data {
  id: string;
  name: string;
  phone: string;
  password: string;
  avatar?: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}
