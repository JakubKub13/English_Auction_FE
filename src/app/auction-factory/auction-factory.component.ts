import { Component, OnInit } from '@angular/core';
import { AuctionFactoryService } from '../auction-factory.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ethers } from 'ethers';
import bigNumberToETHString from 'src/helpers/bigNumberToETHString';

declare var window: any

@Component({
  selector: 'app-auction-factory',
  templateUrl: './auction-factory.component.html',
  styleUrls: ['./auction-factory.component.css']
})
export class AuctionFactoryComponent implements OnInit {
  isAttemptingToCreateAuction: Boolean;
  isLoadingBalance: Boolean;
  currentTokenBalanceForCurrentWallet: string;
  currentWalletBalance: string;
  factoryFee: Number
  
  createAuctionForm = this.fb.group({
    nftAddress: ['', [Validators.required]],
    nftId: ['', [Validators.required]],
    startingBid: ['', [Validators.required]],
    sellerAddress: ['', [Validators.required]],
    auctionToken: ['', [Validators.required]]
  });

  constructor(
    private auctionFactoryService: AuctionFactoryService,
    private fb: FormBuilder
  ) {
    this.isAttemptingToCreateAuction = false;
    this.isLoadingBalance = true;
    this.currentTokenBalanceForCurrentWallet = '';
    this.currentWalletBalance = '';
    this.factoryFee = 0.03;
  }

  async ngOnInit(): Promise<void> {
    const { ethereum } = window;
    this.currentWalletBalance = await this.auctionFactoryService.getWalletBalance(ethereum);
    this.isLoadingBalance = false;
  }

  async attemptToCreateAuction() {
    this.isAttemptingToCreateAuction = true;
    const { ethereum } = window;
    const { nftAddress, nftId, startingBid, sellerAddress, auctionToken} = this.createAuctionForm.value;
    
    const isCreationSuccess = await this.auctionFactoryService.createAuctionImplementation(
      ethereum,
      nftAddress!,
      Number(nftId)!,
      Number(startingBid)!, 
      sellerAddress!, 
      auctionToken!,
    );

    if(isCreationSuccess) {
      window.alert('Auction was successfully created! ');
      this.currentWalletBalance = await this.auctionFactoryService.getWalletBalance(ethereum)
    } else window.alert('Creation of auction implementation unsuccessful try again');
    this.isAttemptingToCreateAuction = false;
    await this.ngOnInit();
  }

}
