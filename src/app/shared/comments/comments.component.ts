import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from '@nater20k/brass-exchange-instruments';
import { User } from '@nater20k/brass-exchange-users';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { UserApiService } from 'src/app/services/users/user-api.service';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment[];
  @Output() newComment = new EventEmitter<Comment>();
  @ViewChild('commentInput') commentInput: ElementRef;
  commentForm: FormGroup;
  showComments = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private userApiService: UserApiService) {}

  ngOnInit(): void {
    this.commentForm = this.buildForm();
  }

  addComment(): void {
    if (this.commentForm.get('content').value !== '') {
      this.authService.user$.pipe(take(1)).subscribe((user: User) => {
        this.newComment.emit(this.adaptFormToComment(user.displayName));
        this.commentForm = this.buildForm();
      });
    }
  }

  clickOnCommentHandler() {
    this.showComments = !this.showComments;
    setTimeout(() => {
      (this.commentInput?.nativeElement as any)?.focus();
    }, 100);
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      content: this.fb.control(''),
      username: this.fb.control(''), // TODO
      createdDate: this.fb.control(''), // TODO
      likes: this.fb.control(0),
    });
  }

  private adaptFormToComment(username: string): Comment {
    return {
      content: this.commentForm.get('content').value,
      username,
      createdDate: new Date(),
      likes: 0,
    };
  }
}
