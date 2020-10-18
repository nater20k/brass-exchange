import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, AngularFireModule.initializeApp(environment.firebase)],
      declarations: [AppComponent],
      providers: [AuthService],
    }).compileComponents();
  });
  const fixture = TestBed.createComponent(AppComponent);
  const app = fixture.componentInstance;

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'brass-exchange'`, () => {
    expect(app.title).toEqual('brass-exchange');
  });
});
