import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { NgForm } from '@angular/forms';
import { AppEvent } from '../../shared/models/event.model';

import { mergeMap } from 'rxjs/operators';

import * as moment from 'moment';
import { EventService } from '../../shared/services/event.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';
import { Message } from 'src/app/shared/models/message.model';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  @Input() categories: Category[] = [];
  message: Message;
  types = [
    {
      type: 'income',
      label: 'Доход'
    }, {
      type: 'outcome',
      label: 'Расход'
    }
  ];

  constructor(private eventService: EventService, private billService: BillService) { }

  ngOnInit() {
    this.message = new Message('danger', '');
  }

  private showMessage(text: string) {
    this.message.text = text;
    setTimeout(() => {
      this.message.text = '';
    }, 2000);
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
    const date = moment().format(dateFormat);

    const customEvent = new AppEvent(type, amount, category, date, description);
    console.log('event', customEvent);

    this.billService.getBill()
      .subscribe((bill: Bill) => {
        let value = 0;
        if (type === 'outcome') {
          if (amount > bill.value) {
            // ошибка
            const diff = amount - bill.value;
            this.showMessage(`На счету недостаточно средств. Вам не хватает ${diff} р.`);
            return;
          } else {
            value = bill.value - amount;
          }
        } else {
          value = bill.value + amount;
        }

        this.billService.updateBill({
          value,
          currency: bill.currency
        })
          .pipe(
            mergeMap(() => this.eventService.addEvent(customEvent))
          )
          .subscribe(() => {
            form.setValue({
              amount: 0,
              description: ' ',
              category: 1,
              type: 'outcome'
            });
          });
      });
    // this.eventService.addEvent(customEvent)
    //   .subscribe((event: AppEvent) => {
    //     // this.c
    //   });
  }
}
