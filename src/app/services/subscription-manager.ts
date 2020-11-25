import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
  template: '',
})
export abstract class SubscriptionManager implements OnDestroy {
  subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  unsubscribeAll(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  set addSub(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }
}
