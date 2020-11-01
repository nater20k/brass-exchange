import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ForSaleListing } from '@nater20k/brass-exchange-instruments';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { UploadService } from 'src/app/services/upload/upload.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  @Input() sellerEmail: string;
  @Input() instrumentId: string;
  @Input() isHeroImage = false;
  imageUrls$: Observable<string[]>;
  isLoaded = false;
  imagesLoaded = false;
  images: HTMLCollectionOf<HTMLImageElement>;

  constructor(private storage: UploadService) {}

  ngOnInit(): void {
    this.images = document.getElementsByTagName<'img'>('img');
    this.imageUrls$ = this.fetchImageUrls({ id: this.instrumentId, sellerEmail: this.sellerEmail }).pipe(
      tap(console.log),
      finalize(() => (this.isLoaded = true))
    );
  }

  fetchImageUrls({ id, sellerEmail }: Partial<ForSaleListing>) {
    return this.storage.getImageUrls(`${sellerEmail}/instruments/${id}`);
  }

  toggleImagesLoaded() {
    this.setImagesToBlock();
    this.imagesLoaded = true;
  }

  private setImagesToBlock() {
    for (let i = 0; i < this.images.length; i++) { this.images[i].style.display = 'inline-block'; }
  }

  get isAllPageLoaded() {
    return this.isLoaded && this.imagesLoaded;
  }
}
