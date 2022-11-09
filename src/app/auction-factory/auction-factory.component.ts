import { Component, OnInit } from '@angular/core';
import { AuctionFactoryService } from '../auctionFactory.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ethers } from 'ethers';
import bigNumberToETHString from 'src/helpers/bigNumberToETHString';
@Component({
  selector: 'app-auction-factory',
  templateUrl: './auction-factory.component.html',
  styleUrls: ['./auction-factory.component.css']
})
export class AuctionFactoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
