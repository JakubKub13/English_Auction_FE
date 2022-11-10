import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuctionFactoryComponent } from './auction-factory/auction-factory.component';
import { AuctionFactoryOwnerComponent } from './auction-factory-owner/auction-factory-owner.component';
import { AuctionImplementationComponent } from './auction-implementation/auction-implementation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    AuctionFactoryComponent,
    AuctionFactoryOwnerComponent,
    AuctionImplementationComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
