import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Comment } from './comment';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment[];
  constructor() {}

  ngOnInit(): void {}
}
