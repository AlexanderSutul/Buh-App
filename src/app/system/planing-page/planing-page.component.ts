import {Component, OnInit, OnDestroy} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {CategoryService} from '../shared/services/category.service';
import {EventService} from '../shared/services/event.service';
import {combineLatest, Subscription} from 'rxjs';
import {Bill} from '../shared/models/bill.model';
import {Category} from '../shared/models/category.model';
import {AppEvent} from '../shared/models/event.model';

@Component({
    selector: 'app-planing-page',
    templateUrl: './planing-page.component.html',
    styleUrls: ['./planing-page.component.scss']
})
export class PlaningPageComponent implements OnInit, OnDestroy {

    sub: Subscription;
    isLoaded = false;
    bill: Bill;
    categories: Category[] = [];
    events: AppEvent[] = [];

    constructor(
        private billService: BillService,
        private categoryService: CategoryService,
        private eventService: EventService
    ) {
    }

    ngOnInit() {
        this.sub = combineLatest(
            this.billService.getBill(),
            this.categoryService.getCategories(),
            this.eventService.getEvents()
        )
            .subscribe((data: [Bill, Category[], AppEvent[]]) => {
                this.bill = data[0];
                this.categories = data[1];
                this.events = data[2];
                this.isLoaded = true;
            });
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    getCategoryCost(category: Category): number {
        const categoryEvents = this.events.filter(e => +e.category === category.id && e.type === 'outcome');
        return categoryEvents.reduce((total, el) => total + el.amount, 0);
    }

    private getPercent(category: Category): number {
        const persent = (100 * this.getCategoryCost(category) / category.capacity);
        return persent > 100 ? 100 : persent;
    }

    getCategoryPersent(category: Category): string {
        return this.getPercent(category) + '%';
    }

    getCategoryColorClass(category: Category): string {
        const persent = this.getPercent(category);
        return persent < 60 ? 'success' : persent >= 100 ? 'danger' : 'warning';
    }
}
