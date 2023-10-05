import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderGoodsDialogComponent } from './order-goods-dialog.component';

describe('OrderGoodsDialogComponent', () => {
  let component: OrderGoodsDialogComponent;
  let fixture: ComponentFixture<OrderGoodsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderGoodsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderGoodsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
