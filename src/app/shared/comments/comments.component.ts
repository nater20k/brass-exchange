import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from '@nater20k/brass-exchange-instruments';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment[];
  @Output() newComment = new EventEmitter<Partial<Comment>>();
  commentForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.commentForm = this.buildForm();
  }

  addComment(): void {
    this.newComment.emit(this.adaptFormToComment());
    this.commentForm = this.buildForm();
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      content: this.fb.control(''),
      username: this.fb.control(''), // TODO
      createdDate: this.fb.control(''), // TODO
      likes: this.fb.control(0),
    });
  }

  private adaptFormToComment(): Comment {
    return {
      content: this.commentForm.get('content').value,
      username: sessionStorage.getItem('displayName') || 'N/A',
      createdDate: new Date(),
      likes: 0,
    };
  }
}
