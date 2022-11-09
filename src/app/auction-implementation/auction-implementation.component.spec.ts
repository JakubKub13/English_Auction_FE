import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionImplementationComponent } from './auction-implementation.component';

describe('AuctionImplementationComponent', () => {
  let component: AuctionImplementationComponent;
  let fixture: ComponentFixture<AuctionImplementationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionImplementationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionImplementationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
