import { Controller, Post, UseGuards, Body, Get, Request, Res, Logger } from '@nestjs/common';
import type { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { AuthService } from './auth.service';
import { AuthRegisterDto, AuthLoginDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() authRegisterDto: AuthRegisterDto, @Res({ passthrough: true }) res: ExpressResponse) {
    const result = await this.authService.register(authRegisterDto);
    if (result.access_token) {
      res.cookie('jwt', result.access_token, { httpOnly: true });
      return { message: 'Registration successful' };
    }
    return result;
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto, @Res({ passthrough: true }) res: ExpressResponse) {
    const result = await this.authService.login(authLoginDto);
    if (result.access_token) {
      res.cookie('jwt', result.access_token, { httpOnly: true });
      return { message: 'Login successful' };
    }
    return result;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req: ExpressRequest) {
    Logger.log(`User profile requested: ${JSON.stringify(req.user)}`, 'AuthController');
    return req.user!;
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: ExpressResponse) {
    res.clearCookie('jwt');
    return { message: 'Logout successful' };
  }

  @Post('send-otp')
  async sendOtp(@Body('phoneNumber') phoneNumber: string) {
    await this.authService.sendOtp(phoneNumber);
    return { message: 'OTP sent successfully' };
  }

  @Post('verify-otp')
  async verifyOtp(@Body('phoneNumber') phoneNumber: string, @Body('code') code: string, @Res({ passthrough: true }) res: ExpressResponse) {
    const result = await this.authService.verifyOtp(phoneNumber, code);
    if (result.access_token) {
      res.cookie('jwt', result.access_token, { httpOnly: true });
      return {
        message: 'Login successful',
        access_token: result.access_token,
        isNewUser: result.isNewUser
      };
    }
    return result;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('complete-profile')
  async completeProfile(@Request() req: ExpressRequest, @Body() body: { name: string; email: string; password?: string }, @Res({ passthrough: true }) res: ExpressResponse) {
    const user = req.user as any;
    const userId = user.id;
    const result = await this.authService.completeProfile(userId, body);
    if (result.access_token) {
      res.cookie('jwt', result.access_token, { httpOnly: true });
      return { message: 'Profile updated successfully' };
    }
    return result;
  }
}
