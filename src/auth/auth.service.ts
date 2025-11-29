import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto, AuthRegisterDto } from './dto/auth.dto';
import { User } from './interfaces/user.interface';

import { TwilioService } from './twilio.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private twilioService: TwilioService
  ) { }

  async sendOtp(phoneNumber: string) {
    return this.twilioService.sendOtp(phoneNumber);
  }

  async verifyOtp(phoneNumber: string, code: string) {
    const isValid = await this.twilioService.verifyOtp(phoneNumber, code);
    if (!isValid) {
      throw new UnauthorizedException('Invalid OTP');
    }
    return this.findOrCreateUserByPhone(phoneNumber);
  }

  async register(authRegisterDto: AuthRegisterDto) {
    const hashedPassword = await bcrypt.hash(authRegisterDto.password, 10);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: authRegisterDto.email,
          passwordHash: hashedPassword,
          name: authRegisterDto.name,
        },
      });
      return this.generateJwtToken(user);
    } catch (error) {
      if (error.code === 'P2002') { // Unique constraint failed
        throw new UnauthorizedException('User with this email already exists');
      }
      throw error;
    }
  }

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: authLoginDto.email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(authLoginDto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateJwtToken(user);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(pass, user.passwordHash))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async findOrCreateUserByPhone(phoneNumber: string) {
    let user = await this.prisma.user.findUnique({ where: { phoneNumber } });
    let isNewUser = false;

    if (!user) {
      isNewUser = true;
      user = await this.prisma.user.create({
        data: {
          phoneNumber,
          email: `${phoneNumber}@mobile.com`, // Placeholder email
          name: 'Mobile User',
          passwordHash: '', // No password for mobile users
        },
      });
    }

    const token = this.generateJwtToken(user);
    return {
      ...token,
      isNewUser,
    };
  }

  async completeProfile(userId: string, data: { name: string; email: string; password?: string }) {
    const updateData: any = {
      name: data.name,
      email: data.email,
    };

    if (data.password) {
      updateData.passwordHash = await bcrypt.hash(data.password, 10);
    }

    try {
      const user = await this.prisma.user.update({
        where: { id: userId },
        data: updateData,
      });
      return this.generateJwtToken(user);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new UnauthorizedException('Email already in use');
      }
      throw error;
    }
  }

  private generateJwtToken(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.role, phoneNumber: user.phoneNumber };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
