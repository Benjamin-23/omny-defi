import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ethers } from 'ethers';
import { WalletConnectDto } from './dto/wallet-connect.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateWalletSignature(
    walletConnectDto: WalletConnectDto,
  ): Promise<any> {
    const { address, signature, message } = walletConnectDto;

    try {
      // Verify the signature
      const signerAddress = ethers.verifyMessage(message, signature);

      if (signerAddress.toLowerCase() !== address.toLowerCase()) {
        throw new UnauthorizedException('Invalid signature');
      }

      // Find or create user with this wallet address
      let user = await this.userService.findByWalletAddress(address);

      if (!user) {
        user = await this.userService.create({ walletAddress: address });
      }

      return user;
    } catch (error: any) {
      throw new UnauthorizedException('Invalid signature or wallet connection');
    }
  }

  async login(user: any) {
    const payload = { sub: user._id, walletAddress: user.walletAddress };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        _id: user._id,
        walletAddress: user.walletAddress,
      },
    };
  }
}
