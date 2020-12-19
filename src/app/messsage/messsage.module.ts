import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateMessageComponent } from './create-message/create-message.component';
import { ListThreadsComponent } from './list-threads/list-threads.component';
import { MesssageRoutingModule } from './messsage-routing.module';
import { MesssageComponent } from './messsage.component';
import { ThreadDetailComponent } from './thread-detail/thread-detail.component';

@NgModule({
  declarations: [MesssageComponent, CreateMessageComponent, ListThreadsComponent, ThreadDetailComponent],
  imports: [CommonModule, MesssageRoutingModule, ReactiveFormsModule],
})
export class MesssageModule {}
