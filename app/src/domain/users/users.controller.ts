import { Controller, Get } from '@nestjs/common';
import { UsersService, User } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  list(): Promise<User[]> {
    return this.usersService.list();
  }
}
