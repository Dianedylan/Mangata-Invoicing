import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from '../order.service';
import { SweetAlertService } from '../sweet-alert.service';

@Component({
  selector: 'app-order-goods-dialog',
  templateUrl: './order-goods-dialog.component.html',
  styleUrls: ['./order-goods-dialog.component.scss']
})
export class OrderGoodsDialogComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _orderService: OrderService,
    private _sweetAlerts: SweetAlertService,
    private _dialogRef: MatDialogRef<OrderGoodsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

 
  ngOnInit(): void {
    this.orderForm.patchValue(this.data);
  }
      
  orderForm = new FormGroup({
     firstlastname: new FormControl("", Validators.required),
     address: new FormControl(""),
     phone: new FormControl("", Validators.required),
     email: new FormControl("", Validators.required),
     itemName: new FormControl("", Validators.required),
     qty: new FormControl("", Validators.required),
     itemValue: new FormControl(""),
     code: new FormControl("", Validators.required),
   });

   onFormSubmit() {
    if (this.orderForm.valid) {
      if (this.data) {
        this._orderService.editOrder(this.data.id, this.orderForm.value).subscribe({
            next: (val: any) => {
              this._sweetAlerts.showSuccessAlert("Item details updated successfully!");
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._orderService.addOrder(this.orderForm.value).subscribe( res => {
        
            // console.log('valuesss', value.details[0].Items);
            this._sweetAlerts.showSuccessAlert("Item details added successfully!");
            this._dialogRef.close(true);
          },
          
          err => {
            console.error(err);
          },
        );
      }
    }
  }


}
