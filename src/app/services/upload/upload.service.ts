import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  uploadProgress: Observable<number>;

  constructor(private storage: AngularFireStorage) {}

  uploadAll({
    files,
    instrumentOwnerId: userId,
    filePath = '/images/',
  }: Partial<UploadFiles>): AngularFireUploadTask[] {
    const tasks: AngularFireUploadTask[] = [];

    for (const file of files) {
      if (this.isQualifiedType(file.type)) {
        tasks.push(this.uploadSingle(file, userId, filePath));
      }
    }
    return tasks;
  }

  uploadSingle(file: File, userId: string, filePath: string): AngularFireUploadTask {
    const randomId = Math.random().toString(36).substring(2);
    const ref: AngularFireStorageReference = this.storage.ref(`${userId}${filePath}/${randomId}`);
    return ref.put(file);
  }

  getImageUrls(location: string): Observable<string[]> {
    const urls: string[] = [];
    return this.storage
      .ref(location)
      .listAll()
      .pipe(
        take(1),
        map((result) => {
          result.items.forEach((item) =>
            item.getDownloadURL().then((url) => {
              urls.push(url);
            })
          );
          return urls;
        })
      );
  }

  private isQualifiedType(type: string): boolean {
    return type === 'image/jpeg' || type === 'image/png';
  }
}

export interface UploadFiles {
  files: FileList;
  instrumentOwnerId: string;
  instrumentId: string;
  filePath: string;
}
