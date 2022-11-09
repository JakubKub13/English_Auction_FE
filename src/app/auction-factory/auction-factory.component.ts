import { Component, OnInit } from '@angular/core';
import { AuctionFactoryService } from '../auction-factory.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ethers } from 'ethers';
import bigNumberToETHString from 'src/helpers/bigNumberToETHString';
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
    private fb: FormBuilder;
  ) { }

  ngOnInit(): void {
  }

}
