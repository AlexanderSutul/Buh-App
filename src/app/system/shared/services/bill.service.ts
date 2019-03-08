import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill.model';
import { map } from 'rxjs/operators';
import { BaseApi } from 'src/app/shared/core/base-api';

@Injectable()
export class BillService extends BaseApi {

    constructor(public http: Http) {
        super(http);
    }

    getBill(): Observable<Bill> {
        return this.get('bill');
    }

    updateBill(bill: Bill): Observable<Bill> {
        return this.put('bill', bill);
    }

    getCurrency(): Observable<any> {
        const alternativeUrlAPI = 'https://www.cbr-xml-daily.ru/daily_json.js';
        const API_KEY = '88d79f68f936e1ca9632c6092761fc7c';
        const url = `http://data.fixer.io/api/latest?access_key=${API_KEY}`;
        return this.http.get(alternativeUrlAPI)
            .pipe(
                map((response: Response) => response.json())
            );
    }
}
