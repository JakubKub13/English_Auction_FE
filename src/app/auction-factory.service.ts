import { Injectable } from '@angular/core';
import { ethers, BigNumber } from 'ethers';
import bigNumberToETHString from 'src/helpers/bigNumberToETHString';
import * as addressesJSON from '../assets/contractAddresses.json';
import * as auctionFactoryJSON from '../assets/AuctionFactory.json';
import * as auctionImplementationJSON from '../assets/AuctionImplementation.json';
import * as mDaiJSON from '../assets/mDAI.json';
import * as nftJSON from '../assets/nft.json';
import currentEpoch from 'src/helpers/currentEpoch';

@Injectable({
  providedIn: 'root'
})
export class AuctionFactoryService {
  currentAccount: string
  isLoggedIn: Boolean
  contractOwner: string
  auctionFactoryAddress: string
  nftAddress: string
  mDAIaddress: string

  addressesJSON: {
    auctionFactory: string,
    auctionImplementation1: string,
    mDAI: string,
    nft: string
  }

  auctionFactoryJSON: any
  auctionImplementationJSON: any
  mDaiJSON: any
  nftJSON: any
  
  provider: ethers.providers.JsonRpcProvider

  constructor() { }
}
