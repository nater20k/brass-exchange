import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Thread } from '@nater20k/brass-exchange-users';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { MessageApiService } from 'src/app/services/message/message-api.service';

@Component({
  selector: 'app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.scss'],
})
export class ThreadDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('scroll', { static: true }) chatWindonw: ElementRef;
  thread$: Observable<Thread>;
  threadId: any;
  senderUsername: string;
  recipientUsername: string;

  constructor(private messageApi: MessageApiService, private router: ActivatedRoute, private auth: AuthService) {}

  ngOnInit(): void {
    this.initialize();
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  initialize(): void {
    if (window.location.href.split('/')[5]) {
      this.thread$ = this.auth.user$.pipe(
        tap((user) => (this.senderUsername = user.displayName)),
        switchMap(() =>
          this.router.url.pipe(
            map((res) => {
              this.threadId = res[1]?.path;
              return res[1]?.path;
            }),
            switchMap((threadId) => this.messageApi.getThreadById(threadId)),
            tap((thread) => {
              if (thread.owners[0] !== this.senderUsername) {
                this.recipientUsername = thread.owners[0];
              } else {
                this.recipientUsername = thread.owners[1];
              }
            }),
            tap(() => {
              setTimeout(
                () =>
                  this.chatWindonw.nativeElement.scrollTo({
                    top: this.chatWindonw.nativeElement.scrollHeight,
                    behavior: 'smooth',
                    left: 0,
                  }),
                200
              );
            })
          )
        )
      );
    }
  }

  scrollToBottom(): void {
    try {
      this.chatWindonw.nativeElement.scrollTo({
        top: this.chatWindonw.nativeElement.scrollHeight,
        behavior: 'smooth',
        left: 0,
      });
    } catch (error) {
      setTimeout(
        () =>
          this.chatWindonw.nativeElement.scrollTo({
            top: this.chatWindonw.nativeElement.scrollHeight,
            behavior: 'smooth',
            left: 0,
          }),
        100
      );
    }
    // if (this.chatWindonw?.nativeElement) {
    //   window.scrollTo({ top: this.chatWindonw.nativeElement.scrollHeight, behavior: 'smooth', left: 0 });
    // } else {
    //   setTimeout(() => window.scrollTo({ top: this.chatWindonw.nativeElement.scrollHeight, behavior: 'smooth', left: 0 }), 200)
    // }
  }
}
