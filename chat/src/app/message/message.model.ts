import { Thread } from '../thread/thread.model';
import { User } from '../user/user.model';
import { uuid } from '../util/uuid';

export class Message {
  id: string;
  sentAt: string;
  isRead: boolean;
  text: string;
  author: User;
  thread: Thread;

  constructor(obj?: any) {
    this.id = obj && obj.id || uuid();
    this.sentAt = obj && obj.sentAt || new Date();
    this.isRead = obj && obj.isRead || false;
    this.text = obj && obj.text || null;
    this.author = obj && obj.author || null;
    this.thread = obj && obj.thread || null;
  }
}
