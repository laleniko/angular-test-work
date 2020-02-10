import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { ItemModel } from '../_models/item.type';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public getItems(): Observable<any> {
    return this.http.get('./assets/items.json');
  }
}
