import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { map, switchMap, take, takeUntil, takeWhile, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  uploadProgress: Observable<number>;

  constructor(private storage: AngularFireStorage) {}

  upload = (files: FileList, userId: string, filePath: string = '/images/'): void => {
    for (let i = 0; i < files.length; i++) {
      if (this.isQualifiedType(files[i].type)) {
        let ref: AngularFireStorageReference;
        const randomId = Math.random().toString(36).substring(2);
        ref = this.storage.ref(`${userId}${filePath}/${randomId}`);
        ref.put(files[i]);
      }
    }
  };

  getImageUrls = (location: string): Observable<string[]> => {
    const urls: string[] = [];
    return this.storage
      .ref(location)
      .listAll()
      .pipe(
        map((result) => {
          result.items.forEach((item) =>
            item.getDownloadURL().then((url) => {
              urls.push(url);
            })
          );
          return urls;
        })
      );
  };

  private isQualifiedType = (type: string) => {
    return type === 'image/jpeg' || type === 'image/png';
  };
}
