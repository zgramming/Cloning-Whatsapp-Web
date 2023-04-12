export interface MyConversationInterface {
  status: boolean;
  message: string;
  data: MyConversation[];
}

export interface MyConversation {
  id: string;
  name: string;
  code: string;
  type: 'PRIVATE' | 'PUBLIC' | 'GROUP';
  avatar?: string;
  last_msg: string;
  last_sender: string;
  created_at: Date;
  updated_at: Date;
  participants: Participant[];
  _count: Count;
  interlocutors?: Interlocutors;
}

interface Count {
  contact: number;
}

interface Participant {
  user_id: string;
  user: Interlocutors;
}

interface Interlocutors {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  already_on_contact: boolean;
}
