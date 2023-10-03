import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsExStockComponent } from './goods-ex-stock.component';

describe('GoodsExStockComponent', () => {
  let component: GoodsExStockComponent;
  let fixture: ComponentFixture<GoodsExStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsExStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsExStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
