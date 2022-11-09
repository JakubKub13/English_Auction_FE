import { Component, OnInit } from '@angular/core';
import { AuctionFactoryService } from '../auction-factory.service';
import { MDaiService } from '../m-dai.service';
import { NftService } from '../nft.service';
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
    private mDaiService: MDaiService,
    private nftService: NftService,
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
    this.currentTokenBalanceForCurrentWallet = await this.mDaiService.getDaiTokenBalance(ethereum);
    this.currentWalletBalance = await this.auctionFactoryService.getWalletBalance(ethereum);
    this.isLoadingBalance = false;
  }

}
