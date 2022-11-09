import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionFactoryOwnerComponent } from './auction-factory-owner.component';

describe('AuctionFactoryOwnerComponent', () => {
  let component: AuctionFactoryOwnerComponent;
  let fixture: ComponentFixture<AuctionFactoryOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionFactoryOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionFactoryOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
