import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from '../order.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { SweetAlertService } from '../sweet-alert.service';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

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
     phone: new FormControl("", [Validators.required, Validators.pattern("^((\\+254-?)|0)?[0-9]{10}$")]),
     email: new FormControl("", [Validators.required, Validators.email]),
     itemName: new FormControl("", Validators.required),
     qty: new FormControl("", [Validators.required,  Validators.min(1)]),
     itemValue: new FormControl(""),
     code: new FormControl("", Validators.required),
     invoice_date: new FormControl(""),
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
        const payload = {
          invoice_number : this.generateUniqueInvNumber(),
          ...this.orderForm.value,
          payment_due: this.createPaymentDueDate(),
        }
        this._orderService.addOrder(payload).subscribe( res => {
        
            console.log('valuesss',[res]);
            this._sweetAlerts.showSuccessAlert("Item details sent successfully!");
            this._dialogRef.close(true);
          },
          
          err => {
            console.error(err);
          },
        );
      }
    }
  }

 generateUniqueInvNumber() {
  const prefix = "INV";

  // const timestamp = Date.now();
  const random = Math.floor(Math.random() * 9000) + 1000;

  const orderNumber = `${prefix}${random}`;
  console.log('odrdd', orderNumber);

  return orderNumber;
}

createPaymentDueDate(): string {
    // Addded logic to generate the payment due date as needed by getting the current date and add 30 days
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 30);
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
