import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DragScrollModule } from 'ngx-drag-scroll';
import { ForSaleListingComponent } from '../marketplace/instruments/buy/for-sale-listing/for-sale-listing.component';
import { CommentsComponent } from './comments/comments.component';
import { ContactSellerComponent } from './contact-seller/contact-seller.component';
import { ImageComponent } from './image/image.component';
import { InfoBarComponent } from './info-bar/info-bar.component';
import { InputComponent } from './input/input.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    CommentsComponent,
    ForSaleListingComponent,
    InputComponent,
    ImageComponent,
    LoadingComponent,
    InfoBarComponent,
    ContactSellerComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, DragScrollModule],
  exports: [
    CommentsComponent,
    ForSaleListingComponent,
    InputComponent,
    ImageComponent,
    LoadingComponent,
    InfoBarComponent,
    ContactSellerComponent,
  ],
})
export class SharedModule {}
