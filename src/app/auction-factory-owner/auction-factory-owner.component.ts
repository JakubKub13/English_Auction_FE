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
  isOwnerLoggedIn: Boolean;
  accumulatedFees: string;


  withdrawOwnerForm = this.fb.group({
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
    this.isOwnerLoggedIn = false;
    this.accumulatedFees = '';
   }

  async ngOnInit(): Promise<void> {
    const { ethereum } = window;
    await this.auctionFactoryService.checkWalletConnection(ethereum);
    await this.auctionFactoryService.loadContractOwner(ethereum);
    this.currentOwnerFeePoolBalance = await this.auctionFactoryService.getOwnerFeePoolBalance(ethereum);
    this.isLoadingFeePoolBalance = false;
    this.isOwnerLoggedIn = this.auctionFactoryService.determineIsCurrentAccountContractOwner();
    this.accumulatedFees = await this.auctionFactoryService.getOwnerFeePoolBalance(ethereum);
  }

  async attemptToWithdrawOwnerFeePool() {
    this.isAttemptingToWithdrawOwnerFee = true;
    const { ethereum } = window;
    const { addressToSendFundsTo, amountToWithdraw } = this.withdrawOwnerForm.value;

    const isWithdrawalSuccess = await this.auctionFactoryService.ownerFeePoolWithdraw(
      ethereum,
      addressToSendFundsTo!,
      Number(amountToWithdraw)
    )

    if(isWithdrawalSuccess) {
      window.alert('Owner fee pool was successfully withdrawn! ');
      this.currentOwnerFeePoolBalance = await this.auctionFactoryService.getOwnerFeePoolBalance(ethereum);
    } else window.alert('Withdrawal of owner fee pool was unsuccessful try again');
    console.log(addressToSendFundsTo);
    console.log(amountToWithdraw);
    this.isAttemptingToWithdrawOwnerFee = false;
    await this.ngOnInit();
  }
}
