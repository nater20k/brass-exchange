import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments/comments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForSaleListingComponent } from '../marketplace/instruments/buy/for-sale-listing/for-sale-listing.component';
import { InputComponent } from './input/input.component';
import { ImageComponent } from './image/image.component';

@NgModule({
  declarations: [CommentsComponent, ForSaleListingComponent, InputComponent, ImageComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CommentsComponent, ForSaleListingComponent, InputComponent, ImageComponent],
})
export class SharedModule {}
