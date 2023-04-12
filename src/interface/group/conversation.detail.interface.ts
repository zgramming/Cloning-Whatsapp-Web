export interface ConversationDetailInterface {
  status: boolean;
  message: string;
  data: ConversationDetail;
}

export interface ConversationDetail {
  id: string;
  name: string;
  code: string;
  type: 'PRIVATE' | 'PUBLIC' | 'GROUP';
  avatar?: string;
  last_msg: string;
  last_sender: string;
  created_at: Date;
  updated_at: Date;
  participants: ConversationDetailInterlocutors[];
  messages: ConversationDetailMessage[];
  interlocutors: ConversationDetailInterlocutors;
}

export interface ConversationDetailInterlocutors {
  user_id: string;
  user: User;
}

interface User {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
}

export interface ConversationDetailMessage {
  id: string;
  message_replied_id?: string;
  conversation_id: string;
  from: string;
  message: string;
  type: 'TEXT' | 'IMAGE' | 'VIDEO' | 'FILE' | 'AUDIO';
  status: 'PENDING' | 'DELIVERED' | 'READ';
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  deleted_by?: Date;
}
