import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService, private configService: ConfigService) {
    super({
      jwtFromRequest: (req: Request) => {
        let token = null;
        if (req && req.cookies && req.cookies['jwt']) {
          token = req.cookies['jwt'];
        } else if (req.headers.authorization) {
          const authHeader = req.headers.authorization;
          if (authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7, authHeader.length);
          }
        }
        return token;
      },
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'supersecret',
    });
  }

  async validate(payload: any) {
    return this.prisma.user.findUnique({ where: { id: payload.sub } });
  }
}