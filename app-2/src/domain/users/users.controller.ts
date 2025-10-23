import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  list(): Array<{ name: string; email: string }> {
    return this.usersService.list();
  }
}
