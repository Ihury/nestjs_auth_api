import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './dto/user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({ status: 201, description: 'Creates a user', type: User })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    delete user.password;
    delete user.saltKey;

    return user;
  }

  // @ApiResponse({ status: 200, description: 'Returns all users', type: [User] })
  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @ApiResponse({ status: 200, description: 'Returns a user', type: User })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);

    delete user.password;
    delete user.saltKey;

    return user;
  }

  @ApiResponse({ status: 200, description: 'Updates a user', type: User })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const newUser = await this.usersService.update(+id, updateUserDto);

    delete newUser.password;
    delete newUser.saltKey;

    return newUser;
  }

  @ApiResponse({ status: 200, description: 'Deletes a user', type: User })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
