import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventService } from '../../shared/services/event.service';
import { CategoryService } from '../../shared/services/category.service';
import { Subscription, Observable } from 'rxjs';
import { mergeMap, combineLatest } from 'rxjs/operators';
import { AppEvent } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  sub1: Subscription;

  event: AppEvent;
  category: Category;

  isLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.sub1 = this.route.params
    .pipe(
      mergeMap((params: Params) => this.eventService.getEventById(params.id)),
      mergeMap((event: AppEvent) => {
        this.event = event;
        return this.categoryService.getCategoryById(event.category);
      })
    ).subscribe((category: Category) => {
      this.category = category;
      this.isLoaded = true;
    });
  }

  ngOnDestroy() {
    if (this.sub1) { this.sub1.unsubscribe(); }
  }
}
