import { Component, OnInit, ViewChild, inject, Input } from '@angular/core';
// import { Menu_products } from '../menu_products';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { GoodsExStockComponent } from '../goods-ex-stock/goods-ex-stock.component';
// import { MenusinglemealsComponent } from '../menu/menusinglemeals/menusinglemeals.component';
import { OrderService } from '../order.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SweetAlertService } from '../sweet-alert.service';
import { MatMenu, MatMenuContent } from '@angular/material';

export interface Menu_products{
  id: number;
  comboname: string;
  photo: string;
  value: number;
  date: string;
  action:string;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {

  displayedColumns = [
    'id',
    'itemName',
    'itemUrl',
    'itemValue',
    'dateAdded',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;
  trendingcomboList : Menu_products[] = [];
  isContinue = true;


  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort,  {static: false}) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _orderService: OrderService,
    private _sweetAlerts: SweetAlertService,
  ) {}

  
ngOnInit(): void {
  this.getcomboList();

}


openAddEditMealForm() {
  const dialogRef = this._dialog.open(GoodsExStockComponent,{width:"55%"});
  dialogRef.afterClosed().subscribe({
    next: (val) => {
      if (val) {
        console.log(val);
        this.getcomboList();
      }
    },
  });
}

getcomboList() {
  this._orderService.getcomboList().subscribe({
    next: (res) => {
      console.log('creeesults',res);

      this.dataSource = new MatTableDataSource(res);
      console.log('cresults',res[0]);
      
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
    error: console.log
  });
}


////
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
////


deletecombomeal(id: number) {
  this._orderService.deletecombomeal(id).subscribe({
    next: (res) => {
      //this._coreService.openSnackBar('Employee deleted!', 'done');
      this._sweetAlerts.showSuccessAlert("Order item deleted successfully!", 'success');
      this.getcomboList();
    },
    error: console.log,
  });
}


openEditForm(data: any) {
  const dialogRef = this._dialog.open(GoodsExStockComponent, {
    data,
  });

  dialogRef.afterClosed().subscribe({
   next: (val) => {
    console.log('val', val);
      if (val) {
        this.getcomboList();
      }
   },
  });
}


  // ngOnInit() {
  //   this.applicationDetailsForm = this._formBuilder.group({
  //     itemname: ['', Validators.required],
  //     description: [''],
  //     qty:[''],
  //     price: [''],
  //     total:[''],
  //     action:[''],
  //   });
  //  }

    // createRequest() {
    //   // this.loading = true;
    //   // this.applicationDetailsForm.value.documents = this.application_documents;
    //   // this.applicationDetailsForm.value.applicant_type = this.account_type;
    //   // this.applicationDetailsForm.value.additional_details = this.additionalInfo;
    //   // this.applicationDetailsForm.value.items = this.appeal_reasons;
    //   this._orderService.createRequest(this.applicationDetailsForm.value).subscribe(res => {
    //     this.request_details = res;
    //     // this.loading = false;
    //     this._sweetAlerts.showSuccessAlert('Appeal Application successfully submitted!');
    //     // this._router.navigate(['/user/MoLPP/registration/appeal-of-stamp-duty/applications']);
    //   //  'Ongoing', this.request_details['request_id']
    //   }, err => {
    //     // this.loading = false;
    //   });
    // }

}
