import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserAdapterService } from '@nater20k/brass-exchange-users';
import { environment } from 'src/environments/environment';
import { UserApiService } from '../services/users/user-api.service';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AngularFireAuth, AngularFirestore, UserAdapterService, UserApiService],
      imports: [AngularFireModule.initializeApp(environment.firebase)],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
