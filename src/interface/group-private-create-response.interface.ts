export interface GroupPrivateCreateResponseInterface {
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  id: string;
  name: string;
  code: string;
  type: string;
  avatar: null;
  last_msg: null;
  created_at: Date;
  updated_at: Date;
}
