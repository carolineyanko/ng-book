import { Component } from '@angular/core';
import { UsersService } from './user/users.service';
import { User } from './user/user.model';
import { ThreadsService } from './thread/threads.service';
import { MessagesService } from './message/messages.service';
import { ChatExampleData } from './data/chat-example-data';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public usersService: UsersService,
              public threadsService: ThreadsService,
              public messagesService: MessagesService) {
    ChatExampleData.init(messagesService, threadsService, usersService);
  }
}
