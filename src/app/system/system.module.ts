import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlaningPageComponent } from './planing-page/planing-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';
import { SystemComponent } from './system.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { CurrencyCardComponent } from './bill-page/currency-card/currency-card.component';
import { BillCardComponent } from './bill-page/bill-card/bill-card.component';
import { BillService } from './shared/services/bill.service';
import { CustomDatePipe } from './shared/pipes/date.pipe';
import { AddCategoryComponent } from './records-page/add-category/add-category.component';
import { EditCategoryComponent } from './records-page/edit-category/edit-category.component';
import { AddEventComponent } from './records-page/add-event/add-event.component';
import { CategoryService } from './shared/services/category.service';
import { EventService } from './shared/services/event.service';
import { HistoryChartComponent } from './history-page/history-chart/history-chart.component';
import { HistoryEventsComponent } from './history-page/history-events/history-events.component';
import { HistoryDetailComponent } from './history-page/history-detail/history-detail.component';
import { HistoryFilterComponent } from './history-page/history-filter/history-filter.component';
import { FilterPipe } from './shared/pipes/filter.pipe';

@NgModule({
    imports: [CommonModule, SharedModule, SystemRoutingModule],
    declarations: [
        BillPageComponent,
        HistoryPageComponent,
        PlaningPageComponent,
        RecordsPageComponent,
        SystemComponent,
        SidebarComponent,
        HeaderComponent,
        DropdownDirective,
        CurrencyCardComponent,
        BillCardComponent,
        CustomDatePipe,
        AddCategoryComponent,
        EditCategoryComponent,
        AddEventComponent,
        HistoryChartComponent,
        HistoryEventsComponent,
        HistoryDetailComponent,
        HistoryFilterComponent,
        FilterPipe
    ],
    providers: [BillService, CategoryService, EventService]
})
export class SystemModule { }
