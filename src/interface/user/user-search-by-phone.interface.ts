export interface UserSearchByPhoneInterface {
  message: string;
  success: boolean;
  data: UserSearcyByPhone;
  group?: Group;
}

export interface UserSearcyByPhone {
  id: string;
  name: string;
  phone: string;
  avatar: null;
}

interface Group {
  id: string;
  name: string;
  code: string;
  type: string;
  avatar: null;
  last_msg: null;
  last_sender: null;
  created_at: Date;
  updated_at: Date;
}
