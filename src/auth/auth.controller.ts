import { Controller, Post, Request, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalLoginDTO } from './dto/local-login.dto';
import { LocalLoginResponseDTO } from './dto/local-login-response.dto';
import { User } from 'src/users/dto/user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: LocalLoginDTO })
  @ApiResponse({
    status: 201,
    description: 'Login successful',
    type: LocalLoginResponseDTO,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the current user',
    type: User,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Get('session')
  getProfile(@Request() req) {
    return req.user;
  }
}
