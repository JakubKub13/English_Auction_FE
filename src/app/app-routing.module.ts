import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuctionFactoryComponent } from './auction-factory/auction-factory.component';
import { AuctionImplementationComponent } from './auction-implementation/auction-implementation.component';

const routes: Routes = [
  { path: "", component: AuctionFactoryComponent},
  { path: 'auction-implementation', component: AuctionImplementationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
