import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments/comments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForSaleListingComponent } from '../marketplace/instruments/buy/for-sale-listing/for-sale-listing.component';
import { InputComponent } from './input/input.component';

@NgModule({
  declarations: [CommentsComponent, ForSaleListingComponent, InputComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CommentsComponent, ForSaleListingComponent, InputComponent],
})
export class SharedModule {}
