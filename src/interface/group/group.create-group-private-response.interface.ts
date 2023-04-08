export interface GroupPrivateCreateResponseInterface {
  success: boolean;
  message: string;
  data: GroupPrivateCreateResponse;
}

export interface GroupPrivateCreateResponse {
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
