import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {

  @Output() onFilterClose = new EventEmitter<any>();
  @Output() onFilterApply = new EventEmitter<any>();
  @Input() categories: Category[] = [];

  selectedPeriod = 'd';
  selectedCategories = [];
  selectedTypes = [];

  timePeriods = [
    {
      type: 'd',
      label: 'День'
    },
    {
      type: 'w',
      label: 'Неделя'
    },
    {
      type: 'M',
      label: 'Месяц'
    }
  ];

  types = [
    {
      type: 'income',
      label: 'Доход'
    },
    {
      type: 'outcome',
      label: 'Расход'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

  onClose() {
    this.onFilterClose.emit(false);
    console.log('HistoryFilterComponent');
  }

  onApply() {
    this.onFilterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    });
  }

  private calculateInputParams(field: string, checked: boolean, value: string) {
    if (checked) {
      if (!this[field].includes(value)) { this[field].push(value); }
    } else {
      this[field] = this[field].filter(item => item !== value);
    }
  }

  handleChangeType({ checked, value }) {
    this.calculateInputParams('selectedTypes', checked, value);
  }

  handleCategoryChange({ checked, value }) {
    this.calculateInputParams('selectedCategories', checked, value);
  }
}
