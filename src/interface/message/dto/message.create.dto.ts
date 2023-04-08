type TypeMessage = {
  TEXT: 'TEXT';
  IMAGE: 'IMAGE';
  VIDEO: 'VIDEO';
  AUDIO: 'AUDIO';
  FILE: 'FILE';
};

export interface MessageCreateDTO {
  group_id: string;
  message: string;
  from: string;
  type: keyof TypeMessage;
  is_new_chat: boolean;
}
