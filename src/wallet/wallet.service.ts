import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from './schemas/wallet.schema';
import { ConnectWalletDto } from './dto/connect-wallet.dto';
import Web3 from 'web3';

@Injectable()
export class WalletService {
  private web3: Web3;

  constructor(@InjectModel(Wallet.name) private walletModel: Model<Wallet>) {
    // Initialize web3 with Ethereum provider
    this.web3 = new Web3(process.env.ETHEREUM_RPC_URL);
  }

  async connectWallet(connectWalletDto: ConnectWalletDto) {
    const { address, chainId, walletType } = connectWalletDto;

    // Check if wallet already exists
    let wallet = await this.walletModel.findOne({ address });

    if (!wallet) {
      wallet = new this.walletModel({
        address,
        chainId,
        walletType,
        lastConnected: new Date(),
      });
    } else {
      wallet.lastConnected = new Date();
      wallet.chainId = chainId;
    }

    await wallet.save();
    return wallet;
  }

  async getWalletBalance(address: string) {
    // Get Ethereum balance
    const ethBalance = await this.web3.eth.getBalance(address);

    // Here you would implement additional balance checks for other tokens
    // This could involve calling ERC20 contracts, etc.

    return {
      address,
      balances: {
        eth: this.web3.utils.fromWei(ethBalance, 'ether'),
        // Other token balances would be added here
      },
    };
  }

  // Additional wallet-related methods would go here
}
