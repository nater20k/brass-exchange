import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ForSaleListing } from '@nater20k/brass-exchange-instruments';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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
  constructor(private storage: UploadService) {}

  ngOnInit(): void {
    this.imageUrls$ = this.fetchImageUrls({ id: this.instrumentId, sellerEmail: this.sellerEmail }).pipe(
      tap(() => (this.isLoaded = true))
    );
  }

  fetchImageUrls({ id, sellerEmail }: Partial<ForSaleListing>) {
    return this.storage.getImageUrls(`${sellerEmail}/instruments/${id}`);
  }
}
