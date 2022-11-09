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
export class AuctionFactoryService {
  currentAccount: string
  isLoggedIn: Boolean
  contractOwner: string
  auctionFactoryAddress: string
  auctionImplementationAddress: string
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

  constructor() {
    this.currentAccount = '';
    this.isLoggedIn = false;
    this.contractOwner = '';
    this.addressesJSON = AddressesJSON;
    this.auctionFactoryAddress = this.addressesJSON.auctionFactory;
    this.auctionImplementationAddress = this.addressesJSON.auctionImplementation1;
    this.nftAddress = this.addressesJSON.nft;
    this.mDAIaddress = this.addressesJSON.mDAI;
    this.auctionFactoryJSON = AuctionFactoryJSON;
    this.auctionImplementationJSON = AuctionImplementationJSON;
    this.mDaiJSON = mockDaiJSON;
    this.nftJSON = NftJSON;
    this.provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/UYC8suTjPixZ8Ku7w4YQcEUuLGwKqP70");
   }

   //Get metamask signer
  async checkWalletConnection(ethereum: any) {
    const metamaskWalletProvider = new ethers.providers.Web3Provider(ethereum);
    console.log(metamaskWalletProvider)
  }
}
