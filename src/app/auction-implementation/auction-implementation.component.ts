import { Component, OnInit } from '@angular/core';
import { AuctionFactoryService } from '../auction-factory.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ethers } from 'ethers';
import bigNumberToETHString from 'src/helpers/bigNumberToETHString';

declare var window: any

@Component({
  selector: 'app-auction-implementation',
  templateUrl: './auction-implementation.component.html',
  styleUrls: ['./auction-implementation.component.css']
})
export class AuctionImplementationComponent implements OnInit {
  isLoadingImplementationsAddresses: Boolean;
  ImplenetantionAdress: string

  constructor(private auctionFactoryService: AuctionFactoryService) {
    this.isLoadingImplementationsAddresses = true;
    this.ImplenetantionAdress = "";
   }

  async ngOnInit(): Promise<void> {
    const { ethereum } = window;
    this.isLoadingImplementationsAddresses = false;
    await this.auctionFactoryService.checkWalletConnection(ethereum);
    await this.auctionFactoryService.loadContractOwner(ethereum);
  }

}
