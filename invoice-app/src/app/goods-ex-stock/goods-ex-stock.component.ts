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
    private _empService: OrderService,
    private _sweetAlerts: SweetAlertService,
    private _dialogRef: MatDialogRef<GoodsExStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.combomealForm.patchValue(this.data);
  }

    
  combomealForm = new FormGroup({
    id: new FormControl(""),
     code: new FormControl("", Validators.required),
     itemName: new FormControl("", Validators.required),
     itemValue: new FormControl("", Validators.required),
     dateAdded: new FormControl(""),
     action: new FormControl("", Validators.required)
   });

    
   onFormSubmit() {
    if (this.combomealForm.valid) {
      if (this.data) {
        this._empService.updatecombomeal(this.data.id, this.combomealForm.value).subscribe({
            next: (val: any) => {
              //this._coreService.openSnackBar('Employee details updated!');
              this._sweetAlerts.showSuccessAlert("Meal details updated successfully!");
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
              //Swal.fire('Please Enter valid data)', 'error');
            },
          });
      } else {
        this._empService.addcombomeal(this.combomealForm.value).subscribe( res => {
        
            // console.log('valuesss', value.details[0].menuItems);
            this._sweetAlerts.showSuccessAlert("Meal details added successfully!");
            this._dialogRef.close(true);
          },
          
          err => {
            console.error(err);
          // Swal.fire('Please Enter valid data)', 'error');
          },
        );
      }
    }
  }

}

// 
