import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseApi } from 'src/app/shared/core/base-api';
import { AppEvent } from '../models/event.model';
import { Observable } from 'rxjs';

@Injectable()
export class EventService extends BaseApi {

    constructor(public http: Http) {
        super(http);
    }

    addEvent(event: AppEvent): Observable<AppEvent> {
        return this.post('events', event);
    }

    getEvents(): Observable<AppEvent[]> {
        return this.get('events');
    }

    getEventById(id: string): Observable<AppEvent> {
        return this.get(`events/${id}`);
    }
}
