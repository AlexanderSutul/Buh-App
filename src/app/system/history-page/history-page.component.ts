import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../shared/models/category.model';
import { AppEvent } from '../shared/models/event.model';
import { CategoryService } from '../shared/services/category.service';
import { EventService } from '../shared/services/event.service';
import { combineLatest, Subscription } from 'rxjs';

import * as moment from 'moment';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  chartData = [];
  sub1: Subscription;

  categories: Category[] = [];
  events: AppEvent[] = [];
  filteredEvents: AppEvent[] = [];

  isFilterVisible = false;

  constructor(private categoryService: CategoryService, private eventService: EventService) { }

  ngOnInit() {
    this.sub1 = combineLatest(
      this.categoryService.getCategories(),
      this.eventService.getEvents()
    ).subscribe((data: [Category[], AppEvent[]]) => {
      this.categories = data[0];
      this.events = data[1];
      this.isLoaded = true;

      this.setOriginalEvents();
      this.calculateChartData();
    });
  }

  private setOriginalEvents() {
    this.filteredEvents =  this.events.slice();
  }

  calculateChartData(): void {
    this.chartData = [];

    this.categories.forEach(cat => {
      const catEvent = this.filteredEvents.filter(e => +e.category === +cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvent.reduce((total, e) => total + e.amount, 0)
      });
    });
  }

  ngOnDestroy() {
    if (this.sub1) { this.sub1.unsubscribe(); }
  }

  private toggleFilterVisibility(direction: boolean): void {
    this.isFilterVisible = direction;
  }

  openFilter() {
    this.toggleFilterVisibility(true);
  }

  onModalClose() {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  onApplyButtonPushed(filterData) {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.filteredEvents = this.filteredEvents
      .filter(e => {
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      })
      .filter(e => {
        return filterData.types.includes(e.type);
      })
      .filter(e => {
        return filterData.categories.includes(e.category.toString());
      });

    this.calculateChartData();
  }
}
