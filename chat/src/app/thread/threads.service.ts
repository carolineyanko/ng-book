import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { Thread } from './thread.model';
import { MessagesService } from '../message/messages.service';
import { map } from 'rxjs/operators';
import { Message } from '../message/message.model';

@Injectable({
  providedIn: 'root'
})
export class ThreadsService {
  threads: Observable<{[key: string]: Thread}>;
  orderedThreads: Observable<Thread[]>;
  currentThread: Subject<Thread> = new BehaviorSubject<Thread>(new Thread());
  currentThreadMessages: Observable<Message[]>;

  constructor(private messagesService: MessagesService) {
    this.threads = this.messagesService.messages
      .pipe(
        map((messages: Message[]) => {
          const threads: {[key: string]: Thread } = {};
          messages.map((message: Message) => {
            threads[message.thread.id] = threads[message.thread.id] || message.thread;

            const messagesThread = threads[message.thread.id];
            if (!messagesThread.lastMessage
              || messagesThread.lastMessage.sentAt < message.sentAt) {
              messagesThread.lastMessage = message;
            }
          });
          return threads;
        })
      );

    this.orderedThreads = this.threads
      .pipe(
        map((threadGroups: {[key: string]: Thread}) => {
          const threads: Thread[] = Object.values(threadGroups);
          return threads.sort((threadA: Thread, threadB: Thread) => {
            return threadA.lastMessage.sentAt > threadB.lastMessage.sentAt ? 1 : -1;
          }).reverse();
        })
      );

    this.currentThread
      .subscribe(this.messagesService.markThreadAsRead);

    this.currentThreadMessages = combineLatest(
      this.currentThread,
      this.messagesService.messages)
      .pipe(
        map(([currentThread, messages]) => {
          if (currentThread && messages.length) {
            return messages
              .filter((message: Message) => {
                return message.thread.id === currentThread.id;
              })
              .map((message: Message) => {
                message.isRead = true;
                return message;
              });
          }
          return [];
        })
      );
  }

  setCurrentThread(newThread: Thread): void {
    this.currentThread.next(newThread);
  }
}

export const ThreadsServiceInjectables: any[] = [
  ThreadsService
];
