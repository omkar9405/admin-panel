import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PreloaderService {
  private selector = 'globalLoader';
 public isLoading : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() {}

  private getElement() {
    return document.getElementById(this.selector);
  }

  hide() {
    const el = this.getElement();
    if (el) {
      el.addEventListener('transitionend', () => {
        el.className = 'global-loader-hidden';
      });

      if (!el.className.includes('global-loader-hidden')) {
        el.className += ' global-loader-fade-in';
      }
    }
  }
}
