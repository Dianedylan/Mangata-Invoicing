import { Component, OnInit, ViewChild, inject, Input } from '@angular/core';
// import { Menu_products } from '../menu_products';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { GoodsExStockComponent } from '../goods-ex-stock/goods-ex-stock.component';
// import { OrderGoodsDialogComponent } from '../order-goods-dialog/order-goods-dialog.component';
import { OrderService } from '../order.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SweetAlertService } from '../sweet-alert.service';
import { MatMenu, MatMenuContent, MatIcon } from '@angular/material';
import { OrderGoodsDialogComponent } from '../order-goods-dialog/order-goods-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
// import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Data } from '@angular/router';
import { DatePipe } from '@angular/common';



export interface Menu_products{
  id: number;
  comboname: string;
  photo: string;
  value: number;
  code: string;
  action:number;
};

export interface order_items{
  id: number;
  firstlastname: string;
  address: string;
  phone: string;
  email: string;
  itemName: string;
  qty:number;
  itemValue: number;
  code: string;
  invoice_date:string;
  // payment_due:string;

};


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {

  displayedColumns = ['id','itemName','itemUrl','itemValue','code','action'];
  displayedOrderColumns = ['id','firstlastname','address','phone','email','itemName','qty', 'itemValue', 'code', 'invoice_date', 'action'];

  dataSource!: MatTableDataSource<any>;
  orderDataSource!: MatTableDataSource<any>;
  invoice_details;

  trendingcomboList : Menu_products[] = [];
  isContinue = true;


  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort,  {static: false}) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _orderService: OrderService,
    private _sweetAlerts: SweetAlertService,
    private _date: DatePipe,
  ) {}

  
ngOnInit(): void {
  this.getGoodsList();
  this.getOrderList();

}




getGoodsList() {
  this._orderService.getItemList().subscribe({
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


applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}


openAddEditOrderForm() {
  const dialogRef = this._dialog.open(GoodsExStockComponent,{width:"55%"});
  dialogRef.afterClosed().subscribe({
    next: (val) => {
      if (val) {
        console.log(val);
        this.getGoodsList();
      }
    },
  });
}


deleteGoodsList(id: number) {
  this._orderService.deleteList(id).subscribe({
    next: (res) => {
      this._sweetAlerts.showSuccessAlert("Order item deleted successfully!", 'success');
      this.getGoodsList();
    },
    error: console.log,
  });
}







openOrderItemForm() {
  const dialogRef = this._dialog.open(OrderGoodsDialogComponent,{width:"55%", height:"90%"});
  dialogRef.afterClosed().subscribe({
    next: (val) => {
      if (val) {
        console.log(val);
        this.getOrderList();
      }
    },
  });
}

deleteOrder(id: number) {
  this._orderService.deleteOrder(id).subscribe({
    next: (res) => {
      this._sweetAlerts.showSuccessAlert("Order item deleted successfully!", 'success');
      this.getOrderList();
    },
    error: console.log,
  });
}

openEditOrderForm(data: any) {
  const dialogRef = this._dialog.open(OrderGoodsDialogComponent, {data, width:"55%", height:"80%"});

  dialogRef.afterClosed().subscribe({
   next: (val) => {
    console.log('val', val);
      if (val) {
        this.getOrderList();
      }
   },
  });
}



getOrderList() {
  this._orderService.getOrderList().subscribe(res => {
      console.log('invoice details',res);
      this.invoice_details = res;
      console.log('this.invoice_details');
      
      this.orderDataSource = new MatTableDataSource(res);
      console.log('cresults',res[0]);
      
      
      // this.dataSource.sort = this.sort;
      // this.dataSource.paginator = this.paginator;
  });
    // error: console.log


}

printPdf(order){

  const details = []
  const inv = []
  const invkeys = []
  const lpoinv = []
//  let amount = ((lpoinv[1] )*( lpoinv[2]));



  for (let [k, v] of Object.entries(order)){
    if(['firstlastname', 'address', 'phone', 'email'].includes(k)){
      details.push(v + '\n\n')
    
    }else if(['invoice_number', 'invoice_date', 'payment_due'].includes(k)){
      if(k.includes('date')){
        v = this._date.transform(v)
      }
      if(k.includes('due')){
        v = this._date.transform(v)
      }
        inv.push(v + '\n\n')
        invkeys.push(k + ':\n\n')    
      }

      if(['itemName', 'qty', 'itemValue'].includes(k)){
        lpoinv.push(v)
      }
      
        // let amount = (lpoinv[1])*(lpoinv[2]);

  }
  
    
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

    
  this.invoice_details = {
    content: [
      'Sample Invoice\n\n',

      {
        text: 'INVOICE\n\n',
        style:	{fontSize: 24,
        bold: true}
      },
      // {
        // text: 
        'Mangata Beauty Products Ltd\n\n',
        'P.O Box 14232-100 Nairobi\n\n',
        '0799966666\n\n',
        'doejohn@gmail.con\n\n\n',
      {
        margin: [15, 10],
        text:'Bill To:',
        bold: true
      },
      
      // 	style: ''
      // },
      {
        
        alignment: 'justify',
        columns: [

         
          {
          
            type: 'none',
            ul: details,    
               
          },
          {
            columns: [
              {
                type: 'none',
                ul: invkeys,
              },
              {
                type: 'none',
                ul: inv,
              }
            ]
           
            
           }
        ],
   
      },
      '\n\n\n',
      // {text: 'lightHorizontalLines:', fontSize: 14, bold: true, margin: [0, 20, 0, 8]},
      {
        style: 'tableExample \n\n\n\n',
        table: {
          headerRows: 1,
          body: [
            [{text: 'Item', style: 'tableHeader'}, {text: 'Quantity', style: 'tableHeader'}, {text: 'Price per unit', style: 'tableHeader'}, {text: 'Amount', style: 'tableHeader'}],
            [lpoinv[0], lpoinv[1]+ 'Pcs','$' + lpoinv[2],'$' + ((lpoinv[1])*(lpoinv[2])).toFixed(2)],
            ['', '', '',  '\n\n'],
            [{text: '', style: 'tableHeader'}, {text: '', style: ''}, {text: 'Subtotal', style: 'tableHeader'}, {text: ' $'+( (lpoinv[1])*(lpoinv[2])).toFixed(2)}],
            [{text: '', style: 'tableHeader'}, {text: '', style: ''}, {text: 'Tax 16%', style: 'tableHeader'}, {text:  '$' + (0.16*((lpoinv[1])*(lpoinv[2]))).toFixed(2)}],
            [{text: '', style: 'tableHeader'}, {text: '', style: ''}, {text: 'Fees/discounts', style: 'tableHeader'}, {text:  '$' + 0}],
            [{text: '', style: 'tableHeader'}, {text: '', style: ''}, {text: 'TOTAL', style: 'tableHeader'}, {text:  '$' + (0.84 * ((lpoinv[1])*(lpoinv[2]))).toFixed(2)}],

          ]
        },
        layout: 'lightHorizontalLines'
      },

      
      {
        margin: [0, 40, 0, 20],

        text:'Terms and Conditions',
        bold: true
      },

      'All Prices Subject to VAT\n\n',
      'Goods not collected after 3 Months are subject to sale\n\n',
      'Invoices to be paid within 30 days from invoice date.\n\n'
    ],

    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      }
    },
    
  }
  this.openPdf();
}

openPdf(){
  pdfMake.createPdf(this.invoice_details).open();

}





}
