import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Comment } from '@nater20k/brass-exchange-instruments';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment[];
  constructor() {}

  ngOnInit(): void {
    console.log({ comments: this.comments });
  }
}
