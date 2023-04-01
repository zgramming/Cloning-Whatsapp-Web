export interface MessageInterface {
  id: number | string;
  type: 'text' | 'image' | 'file';
  text: string;
  sender_name: string;
  from: number | string;
  to: number | string;
  date: Date;
}
