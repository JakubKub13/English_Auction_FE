import { Component } from '@angular/core';
import { AuctionFactoryService } from './auction-factory.service';

declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'English_auction_FE';
  isWalletLoggedIn: Boolean;

  constructor(private auctionFactoryService: AuctionFactoryService) {
    this.isWalletLoggedIn = false;

    const { ethereum } = window;
    this.auctionFactoryService.checkWalletConnection(ethereum).then((data0) => {
      if (data0) {
        this.isWalletLoggedIn = true;
      }
    })
    this.auctionFactoryService.loadContractOwner(ethereum);
  }

  // connect metamask wallet button
  async connectMetamaskWallet() {
    this.isWalletLoggedIn = this.auctionFactoryService.isLoggedIn

    if(!this.isWalletLoggedIn) {
      const { ethereum } = window;
      await this.auctionFactoryService.checkWalletConnection(ethereum);
      await this.auctionFactoryService.connectToWallet(ethereum);
      this.isWalletLoggedIn = this.auctionFactoryService.isLoggedIn;
      window.alert('Wallet connected !')
    }
  }

  
}
