export interface UserSearchByPhoneInterface {
  message: string;
  success: boolean;
  data: Data;
}

interface Data {
  id: string;
  name: string;
  phone: string;
  password: string;
  avatar: null;
  status: string;
  created_at: Date;
  updated_at: Date;
}
