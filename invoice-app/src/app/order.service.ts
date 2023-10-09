import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(    private _http: HttpClient) { }


  getCustomerDetails(): Observable<any> {
    return this._http.get('http://localhost:3000/menuItems');
  }

  getItemList(): Observable<any> {
    return this._http.get('http://localhost:3000/menuItems'); 
  }
  getOrderList(): Observable<any> {
    return this._http.get('http://localhost:3000/orderDetails'); 
  }


  deleteList(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/menuItems/${id}`);
  }

  updateGoodsExstock(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/menuItems/${id}`, data);
  }

  addGoodsExstock(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/menuItems', data);
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
