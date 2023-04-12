export interface ConversationPrivateCreateResponseInterface {
  success: boolean;
  message: string;
  data: ConversationPrivateCreateResponse;
}

export interface ConversationPrivateCreateResponse {
  id: string;
  name: string;
  code: string;
  type: string;
  avatar?: string;
  last_msg?: string;
  last_sender?: string;
  created_at: Date;
  updated_at: Date;
}
