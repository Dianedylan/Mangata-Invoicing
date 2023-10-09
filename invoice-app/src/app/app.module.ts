import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GoodsExStockComponent } from './goods-ex-stock/goods-ex-stock.component';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { MatMenuModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderGoodsDialogComponent } from './order-goods-dialog/order-goods-dialog.component';
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GoodsExStockComponent,
    OrderGoodsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatCardModule,
    // MatExpansionModule,
    // MatAccordion
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [ GoodsExStockComponent, OrderGoodsDialogComponent ],
})
export class AppModule { }
