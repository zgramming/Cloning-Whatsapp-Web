export interface GroupDetailInterface {
  status: boolean;
  message: string;
  data: GroupDetail;
}

export interface GroupDetail {
  id: string;
  name: string;
  code: string;
  type: 'PRIVATE' | 'PUBLIC' | 'GROUP';
  avatar?: string;
  last_msg: string;
  last_sender: string;
  created_at: Date;
  updated_at: Date;
  group_member: GroupDetailInterlocutors[];
  messages: GroupDetailMessage[];
  interlocutors: GroupDetailInterlocutors;
}

export interface GroupDetailInterlocutors {
  user_id: string;
  user: User;
}

interface User {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
}

export interface GroupDetailMessage {
  id: string;
  group_id: string;
  from: string;
  message: string;
  type: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  deleted_by?: string;
}
