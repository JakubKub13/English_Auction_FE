import { Component, OnInit } from '@angular/core';
import { AuctionFactoryService } from '../auction-factory.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ethers } from 'ethers';
import bigNumberToETHString from 'src/helpers/bigNumberToETHString';

declare var window: any
@Component({
  selector: 'app-auction-factory-owner',
  templateUrl: './auction-factory-owner.component.html',
  styleUrls: ['./auction-factory-owner.component.css']
})
export class AuctionFactoryOwnerComponent implements OnInit {
  isAttemptingToWithdrawOwnerFee: Boolean;
  isLoadingFeePoolBalance: Boolean;
  currentOwnerFeePoolBalance: string;


  withdrawOwnerForm = this.isLoadingFeePoolBalance.group({
    addressToSendFundsTo: ['', [Validators.required]],
    amountToWithdraw: ['', [Validators.required]]
  });

  constructor(
    private auctionFactoryService: AuctionFactoryService,
    private fb: FormBuilder
  ) {
    this.isAttemptingToWithdrawOwnerFee = false;
    this.isLoadingFeePoolBalance = true;
    this.currentOwnerFeePoolBalance = '';
   }

  async ngOnInit(): Promise<void> {
    const { ethereum } = window;
    this.currentOwnerFeePoolBalance = await this.auctionFactoryService.getOwnerFeePoolBalance();
    this.isLoadingFeePoolBalance = false;
  }

  async attempToWithdrawOwnerFeePool() {
    this.attempToWithdrawOwnerFeePool = true;
  }

}
