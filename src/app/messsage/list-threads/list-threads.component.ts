import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Thread, ThreadOwner } from '@nater20k/brass-exchange-users';
import { Observable } from 'rxjs';
import { delay, finalize, map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { MessageApiService } from 'src/app/services/message/message-api.service';

@Component({
  selector: 'app-list-threads',
  templateUrl: './list-threads.component.html',
  styleUrls: ['./list-threads.component.scss'],
})
export class ListThreadsComponent implements OnInit {
  threads$: Observable<Thread[]>;
  constructor(private messageApi: MessageApiService, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.threads$ = this.fetchThreads();
  }

  fetchThreads(): Observable<Thread[]> {
    return this.auth.user$.pipe(
      take(1),
      switchMap((user) =>
        this.messageApi
          .getThreads(user)
          .pipe(
            map((threads) =>
              threads.map(
                (thread) => (thread = { id: thread.id, owners: [this.fetchOtherOwner(thread, user.displayName)] })
              )
            )
          )
      )
    );
  }

  fetchOtherOwner(thread: Thread, username: string): ThreadOwner {
    return username === thread.owners[0].username ? thread.owners[1] : thread.owners[0];
  }

  navigateToDetail(threadId: string): void {
    this.router.navigate([`messages/thread/${threadId}`]);
  }
}
