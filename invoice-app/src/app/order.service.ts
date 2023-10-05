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
  getOrderList(): Observable<any> {
    return this._http.get('http://localhost:3000/orderDetails'); 
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

  deleteOrder(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/orderDetails/${id}`);
  }

  editOrder(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/orderDetails/${id}`, data);
  }

  addOrder(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/orderDetails', data);
  }


}
