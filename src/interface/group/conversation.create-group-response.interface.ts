export interface ConversationGroupCreateResponseInterface {
  success: boolean;
  message: string;
  data: ConversationGroupCreateResponse;
}

export interface ConversationGroupCreateResponse {
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
