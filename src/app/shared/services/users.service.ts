import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { BaseApi } from '../core/base-api';

@Injectable()
export class UsersService extends BaseApi {

  constructor(public http: Http) {
    super(http);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.get(`users?email=${email}`);
  }

  createNewUser(user: User): Observable<User> {
    return this.post('users', user);
  }
}
