import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iuser } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private _http: HttpClient) {}

  baseUrl = environment.BASE_URL;

  fetchData(): Observable<any> {
    return this._http.get(`${this.baseUrl}/posts.json`);
  }

  getUserById(id: string): Observable<Iuser> {
    return this._http.get<Iuser>(`${this.baseUrl}/posts/${id}.json`);
  }

  postUser(user: Iuser): Observable<any> {
    return this._http.post(`${this.baseUrl}/posts.json`, user);
  }

  updateUser(user: Iuser, userId: string): Observable<any> {
    return this._http.patch(`${this.baseUrl}/posts/${userId}.json`, user);
  }

  removeUser(id: string): Observable<any> {
    return this._http.delete(`${this.baseUrl}/posts/${id}.json`);
  }
}
