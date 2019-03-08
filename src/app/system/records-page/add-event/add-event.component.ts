import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { NgForm } from '@angular/forms';
import { AppEvent } from '../../shared/models/event.model';

import * as moment from 'moment';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  @Input() categories: Category[] = [];
  types = [
    {
      type: 'income',
      label: 'Доход'
    }, {
      type: 'outcome',
      label: 'Расход'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log('form', form.value);
    let {
      amount,
      description,
      category,
      type
    } = form.value;

    if (amount < 1) { amount *= -1; }

    const dateFormat = 'DD.MM.YYYY HH:mm:ss';
    const date  = moment().format(dateFormat);

    const customEvent = new AppEvent(type, amount, category, date, description);
    console.log('event', customEvent);
  }
}
