import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../shared/models/category.model';
import { AppEvent } from '../shared/models/event.model';
import { CategoryService } from '../shared/services/category.service';
import { EventService } from '../shared/services/event.service';
import { combineLatest, Subscription } from 'rxjs';

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

  constructor(private categoryService: CategoryService, private eventService: EventService) { }

  ngOnInit() {
    this.sub1 = combineLatest(
      this.categoryService.getCategories(),
      this.eventService.getEvents()
    ).subscribe((data: [Category[], AppEvent[]]) => {
      this.categories = data[0];
      this.events = data[1];
      this.isLoaded = true;

      this.calculateChartData();
    });
  }

  calculateChartData(): void {
    this.chartData = [];

    this.categories.forEach(cat => {
      const catEvent = this.events.filter(e => +e.category === +cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvent.reduce((total, e) => total + e.amount, 0)
      });
    });
  }

  ngOnDestroy() {
    if (this.sub1) { this.sub1.unsubscribe(); }
  }
}
