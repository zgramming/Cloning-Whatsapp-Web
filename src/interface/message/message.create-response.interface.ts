export interface MessageCreateResponseInterface {
  success: boolean;
  message: string;
  data: MessageCreateResponse;
}

export interface MessageCreateResponse {
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
