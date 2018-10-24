import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChatNavBarComponent } from './chat-nav-bar/chat-nav-bar.component';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';

import { UserServiceInjectables } from './user/users.service';
import { MessagesServiceInjectables } from './message/messages.service';
import { ThreadsServiceInjectables } from './thread/threads.service';
import { ChatPageComponent } from './chat-page/chat-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatNavBarComponent,
    ChatThreadsComponent,
    ChatWindowComponent,
    ChatPageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    UserServiceInjectables,
    MessagesServiceInjectables,
    ThreadsServiceInjectables
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
