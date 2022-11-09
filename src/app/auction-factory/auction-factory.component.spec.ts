import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionFactoryComponent } from './auction-factory.component';

describe('AuctionFactoryComponent', () => {
  let component: AuctionFactoryComponent;
  let fixture: ComponentFixture<AuctionFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionFactoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
