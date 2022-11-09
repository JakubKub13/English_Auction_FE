import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuctionFactoryComponent } from './auction-factory/auction-factory.component';
import { AuctionFactoryOwnerComponent } from './auction-factory-owner/auction-factory-owner.component';
import { AuctionImplementationComponent } from './auction-implementation/auction-implementation.component';

@NgModule({
  declarations: [
    AppComponent,
    AuctionFactoryComponent,
    AuctionFactoryOwnerComponent,
    AuctionImplementationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
