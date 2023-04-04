export interface MessageInterface {
  success: boolean;
  message: string;
  data: Message[];
}

export interface Message {
  id: string;
  group_id: string;
  from: string;
  message: string;
  type: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  deleted_by?: Date;
}
