import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { EventService } from '../../shared/services/event.service';

import { combineLatest } from 'rxjs';
import { Category } from '../../shared/models/category.model';
import { AppEvent } from '../../shared/models/event.model';

@Component({
  selector: 'app-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent implements OnInit {

  view: any[] = [545, 355];

  @Input() data = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    }
  ];

  constructor() {}

  ngOnInit() {}
}
