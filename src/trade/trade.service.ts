import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trade } from './schemas/trade.schema';
import { CreateSwapDto } from './dto/create-swap.dto';
import { GetPriceDto } from './dto/get-price.dto';
import axios from 'axios';
import Web3 from 'web3';

@Injectable()
export class TradeService {
  private web3: Web3;

  constructor(@InjectModel(Trade.name) private tradeModel: Model<Trade>) {
    this.web3 = new Web3(process.env.ETHEREUM_RPC_URL);
  }

  async createSwap(createSwapDto: CreateSwapDto) {
    const { fromToken, toToken, amount, walletAddress } = createSwapDto;

    // Here you would implement the actual swap logic
    // This would include interacting with liquidity pools or DEX contracts

    // For demo purposes, let's just record the swap request
    const trade = new this.tradeModel({
      fromToken,
      toToken,
      amount,
      walletAddress,
      status: 'pending',
    });

    await trade.save();

    // In a real implementation, you would initiate the swap
    // through relevant smart contracts here

    return {
      id: trade._id,
      status: trade.status,
      message: 'Swap initiated successfully',
    };
  }

  async getPrice(getPriceDto: GetPriceDto) {
    const { fromToken, toToken, amount } = getPriceDto;

    // In a real implementation, you would fetch price data
    // from on-chain sources or price oracles

    // For demo, let's simulate a price fetch from CoinGecko
    try {
      // This is a simplified example
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${fromToken},${toToken}&vs_currencies=usd`,
      );

      const fromPrice = response.data[fromToken]?.usd || 0;
      const toPrice = response.data[toToken]?.usd || 0;

      if (fromPrice && toPrice) {
        const exchangeRate = toPrice / fromPrice;
        const estimatedAmount = amount * exchangeRate;

        return {
          fromToken,
          toToken,
          fromAmount: amount,
          toAmount: estimatedAmount,
          exchangeRate,
          fees: {
            networkFee: 0.001, // Example gas fee in ETH
            protocolFee: amount * 0.003, // Example 0.3% fee
          },
        };
      }

      throw new Error('Price data not available');
    } catch (error) {
      // Fallback to a mock price
      return {
        fromToken,
        toToken,
        fromAmount: amount,
        toAmount: amount * 1.5, // Mock exchange rate
        exchangeRate: 1.5,
        fees: {
          networkFee: 0.001, // Example gas fee in ETH
          protocolFee: amount * 0.003, // Example 0.3% fee
        },
      };
    }
  }

  async getAvailableTokens() {
    // In a real implementation, you would fetch this from a database
    // or blockchain sources

    return [
      {
        symbol: 'ETH',
        name: 'Ethereum',
        type: 'native',
        address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        decimals: 18,
        chain: 'ethereum',
      },
      {
        symbol: 'USDT',
        name: 'Tether',
        type: 'token',
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        decimals: 6,
        chain: 'ethereum',
      },
      // Add more tokens as needed
    ];
  }

  async getTradeHistory(walletAddress: string) {
    return this.tradeModel
      .find({ walletAddress })
      .sort({ createdAt: -1 })
      .exec();
  }
}
