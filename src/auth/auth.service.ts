import { JwtPayload } from './jwt-payload.interface';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto) : Promise<void> {
    return this.userRepository.signUp(authCredentialsDto)
  }
  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
    const username = await this.userRepository.validateUserPassword(authCredentialsDto)
    if (!username) throw new UnauthorizedException('Invalid credentials')
    /* after validation if correct give him token */
    const payload: JwtPayload = { username }
    const accessToken = await this.jwtService.sign(payload)
    return { accessToken }
  }
}
