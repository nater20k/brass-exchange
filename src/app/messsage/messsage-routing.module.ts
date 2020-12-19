import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesssageComponent } from './messsage.component';
import { ThreadDetailComponent } from './thread-detail/thread-detail.component';

const routes: Routes = [
  { path: '', component: MesssageComponent },
  { path: 'thread', component: ThreadDetailComponent },
  { path: 'thread/:id', component: ThreadDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesssageRoutingModule {}
