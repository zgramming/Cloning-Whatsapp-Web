export interface MyGroupInterface {
  status: boolean;
  message: string;
  data: MyGroup[];
}

export interface MyGroup {
  id: string;
  name: string;
  code: string;
  type: 'PRIVATE' | 'PUBLIC' | 'GROUP';
  avatar?: string;
  last_msg: string;
  last_sender?: string;
  created_at: Date;
  updated_at: Date;
  sender?: Sender;
  group_member: GroupMember[];
}

export interface GroupMember {
  user_id: string;
  join_at: Date;
  leave_at?: string;
  user: Sender;
}

export interface Sender {
  id: string;
  name: string;
  avatar?: string;
}
