import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  currentDate!: Date;
  date$!: Subscription;
  isClockWork = false;

  timer: any = 0;
  prevent = false;
  delay = 300;

  constructor(private toast: MatSnackBar) {}

  ngOnInit(): void {
    this.currentDate = new Date();
    this.date$ = timer(0, 1000).subscribe(
      () => { this.currentDate = new Date() }
    );
    this.isClockWork = true;
  }

  ngOnDestroy(): void {
    this.date$.unsubscribe();
    this.isClockWork = false;
  }

  startClock() {
    clearTimeout(this.timer);
    this.prevent = true;
    this.date$ = timer(0, 1000).subscribe(
      () => (this.currentDate = new Date())
    );
    this.isClockWork = true;
  }

  stopClock() {
    clearTimeout(this.timer);
    this.prevent = true;
    this.date$.unsubscribe();
    this.isClockWork = false;
  }

  errorToast() {
    this.timer = setTimeout(() => {
      if (!this.prevent) {
        this.toast.open('Use double Click', '!!!', { duration: 1000 });
      }

      this.prevent = false;
    }, this.delay);
  }
}
