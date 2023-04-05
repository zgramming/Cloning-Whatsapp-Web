export interface MessageCreateResponseInterface {
  success: boolean;
  message: string;
  data: MessageCreateResponse;
}

export interface MessageCreateResponse {
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
