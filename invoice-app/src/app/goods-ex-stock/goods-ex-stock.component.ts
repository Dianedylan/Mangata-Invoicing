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
    const dataToPatch = this.data || {}; 
    this.goodsExstockForm.patchValue(dataToPatch);
  }

    
  goodsExstockForm = new FormGroup({
    id: new FormControl(""),
     code: new FormControl("", Validators.required),
     itemName: new FormControl("", Validators.required),
     itemValue: new FormControl("", Validators.required),
     dateAdded: new FormControl(""),
     action: new FormControl("", Validators.required),
     itemUrl: new FormControl("")
   });

      private assignImageToItem(itemName: string): string {

    const name = (itemName || '').toLowerCase();

    const imageMap = [
      { keyword: 'jojoba', image: 'assets/jojoba.jpg' },
      { keyword: 'massage', image: 'assets/massage.jpg' },
      { keyword: 'beard', image: 'assets/beard.jpg' },
      { keyword: 'scalp', image: 'assets/scalp.jpg' },

      { keyword: 'cream', image: 'assets/cream.jpg' },
      { keyword: 'moisturizer', image: 'assets/moisturizer.jpg' },
      { keyword: 'lotion', image: 'assets/lotion.jpg' },

      { keyword: 'hair', image: 'assets/hair-product.jpg' },
      { keyword: 'shampoo', image: 'assets/shampoo.jpg' },
      { keyword: 'conditioner', image: 'assets/conditioner.jpg' },

      { keyword: 'soap', image: 'assets/soap.jpg' },
      { keyword: 'cleanser', image: 'assets/cleanser.jpg' },
      { keyword: 'wash', image: 'assets/bodywash.jpg' },
      { keyword: 'oil', image: 'generic.jpg' }
    ];

    const match = imageMap.find(item =>
      name.includes(item.keyword)
    );

    if (match) {
      return match.image;
    }

    const fallbackImages = [
      'assets/goods1.jpg',
      'assets/goods2.jpg',
      'assets/goods3.jpg',
      'assets/goods4.jpg',
      'assets/goods5.jpg'
    ];

    return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
  }
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
        const formValue = this.goodsExstockForm.value;   //method to assign image to item based on itemName

        const payload = {
          ...formValue,
          itemUrl: this.assignImageToItem(formValue.itemName)
        };

        this._GONService.addGoodsExstock(payload).subscribe( res => {
        
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
