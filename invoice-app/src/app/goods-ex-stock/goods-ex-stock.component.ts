import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from '../order.service';
import { SweetAlertService } from '../sweet-alert.service';

@Component({
  selector: 'app-goods-ex-stock',
  templateUrl: './goods-ex-stock.component.html',
  styleUrls: ['./goods-ex-stock.component.scss']
})
export class GoodsExStockComponent implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private _GONService: OrderService,
    private _sweetAlerts: SweetAlertService,
    private _dialogRef: MatDialogRef<GoodsExStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.goodsExstockForm.patchValue(this.data);
  }

    
  goodsExstockForm = new FormGroup({
    id: new FormControl(""),
     code: new FormControl("", Validators.required),
     itemName: new FormControl("", Validators.required),
     itemValue: new FormControl("", Validators.required),
     dateAdded: new FormControl(""),
     action: new FormControl("", Validators.required)
   });

    
   onFormSubmit() {
    if (this.goodsExstockForm.valid) {
      if (this.data) {
        this._GONService.updateGoodsExstock(this.data.id, this.goodsExstockForm.value).subscribe({
            next: (val: any) => {
              this._sweetAlerts.showSuccessAlert("New details updated successfully!");
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._GONService.addGoodsExstock(this.goodsExstockForm.value).subscribe( res => {
        
            this._sweetAlerts.showSuccessAlert("New details added successfully!");
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

// 
