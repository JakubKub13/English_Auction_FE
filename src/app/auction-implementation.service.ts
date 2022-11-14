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

  provider: ethers.providers.JsonRpcProvider

  constructor() { 
    this.currentAccount = '';
    this.isLoggedIn = false;
    this.Seller = '';
    this.addressesJSON = AddressesJSON;
    this.auctionImplementationAddress = this.addressesJSON.auctionImplementation4;
    this.nftAddress = this.addressesJSON.nft;
    this.mDAIaddress = this.addressesJSON.mDAI;
    this.auctionImplementationJSON = AuctionImplementationJSON;
    this.mDaiJSON = mockDaiJSON;
    this.nftJSON = NftJSON;
    this.provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/UYC8suTjPixZ8Ku7w4YQcEUuLGwKqP70");
  }

  //Get metamask signer
  async checkWalletConnection(ethereum: any) {
    //const metamaskWalletProvider = new ethers.providers.Web3Provider(ethereum); try this
    try {
      if (!ethereum) {
        console.log('Install metamask')
        window.alert('Metamask has to be installed !')
      } else {
        console.log('Ethereum object found! ')
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log('Found authorized account!', account);
        this.currentAccount = account;
        this.isLoggedIn = true;
        return true;
      } else {
        console.log('No authorized account found!')
        this.isLoggedIn = false;
        window.alert('Connect site to MetaMask account to use this page! ');
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  // Connect to metamask on button click
  async connectToWallet(ethereum: any): Promise<string> {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    this.currentAccount = account;
    this.isLoggedIn = true;
    return this.currentAccount
  }

  // Get metamask wallet signer
  async getMetamaskWalletSigner(ethereum: any) {
    const metamaskWalletProvider = new ethers.providers.Web3Provider(ethereum);  //window.ethereum
    return metamaskWalletProvider.getSigner();
  }

  //get Wallet Balance in ETH or Matic
  async getWalletBalance(ethereum: any) {
    const metamaskWalletProvider = new ethers.providers.Web3Provider(ethereum);
    return bigNumberToETHString(await metamaskWalletProvider.getSigner().getBalance());
  }

  // Initialize AuctionFactory contract
  async getAuctionImpementationContract(signer?: ethers.Signer) {
    let auctionImplementationContract: ethers.Contract;

    if(signer) {
      auctionImplementationContract = new ethers.Contract(this.auctionImplementationAddress, this.auctionImplementationJSON.abi, signer);
    } else {
      auctionImplementationContract = new ethers.Contract(this.auctionImplementationAddress, this.auctionImplementationJSON.abi, this.provider);
    }
    return auctionImplementationContract;
  }

  // determineIsCurrentAccountSeller()
  determineIsCurrentAccountSeller(): Boolean {
    console.log(`Seller: ${this.Seller}`);
    console.log(`LoggedIn: ${this.isLoggedIn}`);
    return(
      this.Seller.toLowerCase().trim() === this.currentAccount.toLowerCase().trim()
    );
  }

  // Get NFT address

  // Get NFT token ID

  // Get NFT uri

  // Get Highest Bid

  // Get Highest bidder

  // Get payment token address

  // Start auction

  // Bid for NFT

  // Withdraw from auction

  // END auction

  


  
}
