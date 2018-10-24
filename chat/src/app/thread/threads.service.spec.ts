import { TestBed } from '@angular/core/testing';

import { Thread } from './thread.model';
import { Message } from '../message/message.model';
import { User } from '../user/user.model';

import { ThreadsService } from './threads.service';
import { MessagesService} from '../message/messages.service';

describe('ThreadsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThreadsService = TestBed.get(ThreadsService);
    expect(service).toBeTruthy();
  });

  it('should collect the Threads from Messages', () => {
    const nick: User = new User('Nick', '');
    const mike: User = new User('Mike', '');

    const t1: Thread = new Thread('t1', 'Thread 1', '');
    const t2: Thread = new Thread('t2', 'Thread 2', '');

    const m1: Message = new Message({
      author: nick,
      message: 'Hi',
      thread: t1
    });

    const m2: Message = new Message({
      author: mike,
      message: 'Oops',
      thread: t1
    });

    const m3: Message = new Message({
      author: nick,
      message: 'Bazzinga',
      thread: t2
    });

    const messagesService: MessagesService = new MessagesService();
    const threadService: ThreadsService = new ThreadsService(messagesService);

    threadService.threads
      .subscribe((threadIdx: {[key: string]: Thread}) => {
        const threads: Thread[] = Object.values(threadIdx);
        const threadNames: string = threads.map((t: Thread): string => t.name).join(', ');
        console.log(`=> threads (${threads.length}): ${threadNames}`);
      });

    messagesService.addMessage(m1);
    messagesService.addMessage(m2);
    messagesService.addMessage(m3);
  });
});
