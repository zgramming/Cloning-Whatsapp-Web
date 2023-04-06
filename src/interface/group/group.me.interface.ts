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
  last_sender: string;
  created_at: Date;
  updated_at: Date;
  group_member: GroupMember[];
  _count: Count;
  interlocutors?: Interlocutors;
  already_on_contact: boolean;
}

interface Count {
  contact: number;
}

interface GroupMember {
  user_id: string;
  user: Interlocutors;
}

interface Interlocutors {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
}
