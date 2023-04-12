export interface ContactMeInterface {
  status: boolean;
  message: string;
  data: ContactMe[];
}

export interface ContactMe {
  id: string;
  owner_id: string;
  user_id: string;
  conversation_id: string;
  created_at: Date;
  updated_at: Date;
  user: User;
}

interface User {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
}
