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
  factoryFee: Number

  addressesJSON: {
    auctionFactory: string,
    auctionImplementation4: string,
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
    this.auctionImplementationAddress = this.addressesJSON.auctionImplementation4;
    this.nftAddress = this.addressesJSON.nft;
    this.factoryFee = 0.03;
    this.mDAIaddress = this.addressesJSON.mDAI;
    this.auctionFactoryJSON = AuctionFactoryJSON;
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
  async getAuctionFactoryContract(signer?: ethers.Signer) {
    let auctionFactoryContract: ethers.Contract;

    if(signer) {
      auctionFactoryContract = new ethers.Contract(this.auctionFactoryAddress, this.auctionFactoryJSON.abi, signer);
    } else {
      auctionFactoryContract = new ethers.Contract(this.auctionFactoryAddress, this.auctionFactoryJSON.abi, this.provider);
    }
    return auctionFactoryContract
  }

  // Load contract owner
  async loadContractOwner(ethereum: any) {
    let auctionFactoryContract: ethers.Contract;
    auctionFactoryContract = await this.getAuctionFactoryContract();
    const owner = await auctionFactoryContract.owner()
    this.contractOwner = owner;
  }

  //Create auction implementation
  async createAuctionImplementation(
    ethereum: any,
    nftAddress: string,
    nftId: Number,
    startingBid: Number,
    seller: string,
    paymentTokenAddress: string
  ): Promise<Boolean> {
    try {
      const currentWallet = await this.getMetamaskWalletSigner(ethereum)
      const auctionFactory = await this.getAuctionFactoryContract();
      const auctionImplementationCreationTx = await auctionFactory.connect(currentWallet).createAuction(
        nftAddress,
        nftId,
        ethers.utils.parseEther(startingBid.toString()),
        seller,
        paymentTokenAddress,
        { value: ethers.utils.parseEther(this.factoryFee.toFixed(18))}
      );
      const auctionImplementTxReceipt = await this.provider.getTransactionReceipt(auctionImplementationCreationTx.hash);
      console.log(auctionImplementTxReceipt)
      return true;
    
    } catch (error) {
      console.log(error)
      window.alert(error)
      return false
    } 
  }

  // getDeployed Auction Implementations

  

  
}
