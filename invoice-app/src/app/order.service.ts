import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(    private _http: HttpClient) { }

  createRequest(data) {
    return this._http.post('http://localhost:3000/menucombomeal', data);
  }

  getCustomerDetails(): Observable<any> {
    return this._http.get('http://localhost:3000/menucombomeal');
  }

  getcomboList(): Observable<any> {
    return this._http.get('http://localhost:3000/menucombomeal'); 
  }

  deletecombomeal(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/menucombomeal/${id}`);
  }

  updatecombomeal(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/menucombomeal/${id}`, data);
  }

  addcombomeal(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/menucombomeal', data);
  }


}
