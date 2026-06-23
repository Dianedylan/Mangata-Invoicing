import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { db } from './firebase-config';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  private toArray(data: any): any[] {
    if (!data) return [];

    return Object.keys(data).map(key => ({
      firebaseKey: key,
      ...data[key]
    }));
  }

  private findFirebaseKey(path: string, id: number): Promise<string> {
    return db.ref(path).once('value').then(snapshot => {
      const data = snapshot.val();

      if (!data) {
        throw new Error('No data found');
      }

      const foundKey = Object.keys(data).find(key => Number(data[key].id) === Number(id));

      if (!foundKey) {
        throw new Error('Record not found');
      }

      return foundKey;
    });
  }

  getCustomerDetails(): Observable<any> {
    return from(
      db.ref('customers').once('value')
    ).pipe(
      map(snapshot => this.toArray(snapshot.val()))
    );
  }

  getItemList(): Observable<any> {
    return from(
      db.ref('menuItems').once('value')
    ).pipe(
      map(snapshot => this.toArray(snapshot.val()))
    );
  }

  getOrderList(): Observable<any> {
    return from(
      db.ref('orderDetails').once('value')
    ).pipe(
      map(snapshot => this.toArray(snapshot.val()))
    );
  }

  deleteList(id: number): Observable<any> {
    return from(this.findFirebaseKey('menuItems', id)).pipe(
      switchMap(key => from(db.ref(`menuItems/${key}`).remove()))
    );
  }

  updateGoodsExstock(id: number, data: any): Observable<any> {
    return from(this.findFirebaseKey('menuItems', id)).pipe(
      switchMap(key => from(db.ref(`menuItems/${key}`).update(data)))
    );
  }

 addGoodsExstock(data: any): Observable<any> {
  return from(
    db.ref('menuItems').once('value').then(snapshot => {
      const items = snapshot.val() || {};

      const numericKeys = Object.keys(items)
        .map(key => Number(key))
        .filter(key => !isNaN(key));

      const nextKey = numericKeys.length ? Math.max(...numericKeys) + 1 : 0;

      const ids = Object.keys(items)
        .map(key => Number(items[key].id))
        .filter(id => !isNaN(id));

      const nextId = ids.length ? Math.max(...ids) + 1 : 1;

      const newItem = {
        ...data,
        id: nextId
      };

      return db.ref(`menuItems/${nextKey}`).set(newItem);
    })
  );
}

  deleteOrder(id: number): Observable<any> {
    return from(this.findFirebaseKey('orderDetails', id)).pipe(
      switchMap(key => from(db.ref(`orderDetails/${key}`).remove()))
    );
  }

  editOrder(id: number, data: any): Observable<any> {
    return from(this.findFirebaseKey('orderDetails', id)).pipe(
      switchMap(key => from(db.ref(`orderDetails/${key}`).update(data)))
    );
  }

addOrder(data: any): Observable<any> {
  return from(
    db.ref('orderDetails').once('value').then(snapshot => {

      const orders = snapshot.val() || {};

      const numericKeys = Object.keys(orders)
        .map(key => Number(key))
        .filter(key => !isNaN(key));

      const nextKey =
        numericKeys.length > 0
          ? Math.max(...numericKeys) + 1
          : 0;

      const ids = Object.keys(orders)
        .map(key => Number(orders[key].id))
        .filter(id => !isNaN(id));

      const nextId =
        ids.length > 0
          ? Math.max(...ids) + 1
          : 1;

      const newOrder = {
        ...data,
        id: nextId
      };

      return db.ref(`orderDetails/${nextKey}`).set(newOrder);
    })
  );
}
}