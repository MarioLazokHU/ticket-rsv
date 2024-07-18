import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from '../../dto/user/user.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async loginUser(
    @Body() userDTO: UserDTO,
  ): Promise<{ id: string; token: string; role: 'user' | 'admin' }> {
    const data = await this.userService.loginUser(userDTO);
    if (data) {
      return data;
    } else {
      throw new HttpException('Unauthorized', 401);
    }
  }

  @Post('/register')
  async registerUser(@Body() userDTO: UserDTO): Promise<{ id: string }> {
    const data = await this.userService.registerUser(userDTO);
    if (data) {
      return data;
    } else {
      throw new HttpException('Internal server error', 500);
    }
  }

  @Post('/auth')
  async authUser(
    @Body() userDTO: UserDTO,
  ): Promise<{ id: string; token: string; role: 'user' | 'admin' }> {
    const data = await this.userService.authUser(userDTO);
    if (data) {
      return data;
    }
  }
}
