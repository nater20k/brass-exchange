import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments/comments.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CommentsComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CommentsComponent],
})
export class SharedModule {}
