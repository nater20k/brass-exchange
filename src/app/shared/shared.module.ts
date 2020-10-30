import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments/comments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForSaleListingComponent } from '../marketplace/instruments/buy/for-sale-listing/for-sale-listing.component';
import { InputComponent } from './input/input.component';
import { ImageComponent } from './image/image.component';
import { LoadingComponent } from './loading/loading.component';
import { DragScrollModule } from 'ngx-drag-scroll';

@NgModule({
  declarations: [CommentsComponent, ForSaleListingComponent, InputComponent, ImageComponent, LoadingComponent],
  imports: [CommonModule, ReactiveFormsModule, DragScrollModule],
  exports: [CommentsComponent, ForSaleListingComponent, InputComponent, ImageComponent, LoadingComponent],
})
export class SharedModule {}
