import { Injectable } from '@angular/core';
import { ethers, BigNumber } from 'ethers';
import bigNumberToETHString from 'src/helpers/bigNumberToETHString';
import * as AddressesJSON from '../assets/contractAddresses.json';
import * as AuctionFactoryJSON from '../assets/AuctionFactory.json';
import * as AuctionImplementationJSON from '../assets/AuctionImplementation.json';
import * as mockDaiJSON from '../assets/mDAI.json';
import * as NftJSON from '../assets/nft.json';
import currentEpoch from 'src/helpers/currentEpoch';
@Injectable({
  providedIn: 'root'
})
export class AuctionImplementationService {
  currentAccount: string
  isLoggedIn: Boolean
  Seller: string
  auctionImplementationAddress: string
  nftAddress: string
  mDAIaddress: string

  addressesJSON: {
    auctionFactory: string,
    auctionImplementation4: string,
    mDAI: string,
    nft: string
  }

  auctionImplementationJSON: any
  mDaiJSON: any
  nftJSON: any

  constructor() { }
}
