export interface ContactCreateResponseInterface {
  status: boolean;
  message: string;
  data: ContactCreateResponse;
}

export interface ContactCreateResponse {
  id: string;
  owner_id: string;
  user_id: string;
  conversation_id: string;
  created_at: Date;
  updated_at: Date;
}
