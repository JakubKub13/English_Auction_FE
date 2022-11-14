import { Component, OnInit } from '@angular/core';
import { AuctionFactoryService } from '../auction-factory.service';
import { MDaiService } from '../m-dai.service';
import { NftService } from '../nft.service';
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

  constructor() { }

  ngOnInit(): void {
  }

}
