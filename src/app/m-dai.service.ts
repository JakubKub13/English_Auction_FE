import { Injectable } from '@angular/core';
import { ethers, BigNumber } from 'ethers';
import bigNumberToETHString from 'src/helpers/bigNumberToETHString';
import * as AddressesJSON from '../assets/contractAddresses.json';
import * as AuctionFactoryJSON from '../assets/AuctionFactory.json';
import * as AuctionImplementationJSON from '../assets/AuctionImplementation.json';
import * as MockDaiJSON from '../assets/mDAI.json';
import * as NftJSON from '../assets/nft.json';
import currentEpoch from 'src/helpers/currentEpoch';

@Injectable({
  providedIn: 'root'
})
export class MDaiService {
  currentAccount: string;
  isLoggedIn: Boolean;
  mDAIaddress: string;

  addressesJSON: {
    auctionFactory: string,
    auctionImplementation4: string,
    mDAI: string,
    nft: string
  };

  mockDaiJSON: any;

  provider: ethers.providers.JsonRpcProvider;

  //getDaiTokenBalance

  constructor() {
    this.currentAccount = '';
    this.isLoggedIn = false;
    this.addressesJSON = AddressesJSON;
    this.mockDaiJSON = MockDaiJSON
    this.mDAIaddress = this.addressesJSON.mDAI;
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

  // Initialize Dai contract
  async getMDaiTokenContract(signer?: ethers.Signer) {
    let mDaiContract: ethers.Contract;

    if (signer) {
      mDaiContract = new ethers.Contract(this.mDAIaddress, this.mockDaiJSON.abi, signer);
    } else {
      mDaiContract = new ethers.Contract(this.mDAIaddress, this.mockDaiJSON.abi, this.provider);
    }

    return mDaiContract;
  }
  
  // get DAI token balance 
  async getDaiTokenBalance(ethereum: any) {
    try {
      const currentWallet = await this.getMetamaskWalletSigner(ethereum);
      const mDai = await this.getMDaiTokenContract();
      const currentAccountTokenBalance = await mDai.balanceOf(await currentWallet.getAddress());
      return bigNumberToETHString(currentAccountTokenBalance)
    } catch (error) {
      console.log(`Can not get token balance: ${error}`);
      window.alert(`Can not get token balance: ${error}`);
      return '0';
    }
  }
}
