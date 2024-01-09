import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, Subject, takeUntil } from 'rxjs';

interface Weather {
  day: string;
  temperature: number;
}

@Component({
  selector: 'first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css'],
})
export class FirstPageComponent implements OnInit, OnDestroy {
  displayWeather: Weather[] = [];
  weatherSubject$ = new Subject<Weather>();
  destroySubject$ = new Subject<void>();

  private weatherData = [
    {
      day: 'Monday',
      temperature: 61,
    },
    {
      day: 'Tuesday',
      temperature: 72,
    },
    {
      day: 'Wednesday',
      temperature: 76,
    },
    {
      day: 'Thursday',
      temperature: 49,
    },
    {
      day: 'Friday',
      temperature: 53,
    },
    {
      day: 'Saturday',
      temperature: 62,
    },
    {
      day: 'Sunday',
      temperature: 77,
    },
  ];

  ngOnInit() {
    this.weatherSubject$.pipe(
      takeUntil(this.destroySubject$),
      filter((weather) => weather.temperature >= 70)
    ).subscribe((weather) => {
      this.displayWeather.push(weather);
    });

    for (const weather of this.weatherData) {
      this.weatherSubject$.next(weather);
    }
  }

  ngOnDestroy() {
    this.destroySubject$.next();
    this.destroySubject$.complete();
    console.log('Component destroyed');
  }
}
