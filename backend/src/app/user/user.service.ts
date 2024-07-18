import { Injectable } from '@nestjs/common';
import { UserDTO } from '../../dto/user/user.dto';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import e from '../../utils/e';
import { client } from '../../utils/edgedb';

@Injectable()
export class UserService {
  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  public async loginUser(userDTO: UserDTO) {
    const user = await e
      .select(e.User, (user) => ({
        id: true,
        role: true,
        name: true,
        password: true,
        filter: e.op(user.email, '=', userDTO.email),
      }))
      .assert_single()
      .run(client);

    if (user && (await bcrypt.compare(userDTO.password, user.password))) {
      const token = randomUUID();
      await e
        .update(e.User, () => ({
          set: {
            token,
          },
          filter_single: { id: user.id },
        }))
        .run(client);

      return { id: user.id, name: user.name, token: token, role: user.role };
    }

    throw new Error('Invalid credentials');
  }

  public async registerUser(userDTO: UserDTO) {
    const hashedPassword = await this.hashPassword(userDTO.password);

    const { id } = await e
      .insert(e.User, {
        name: userDTO.name,
        email: userDTO.email,
        password: hashedPassword,
      })
      .run(client);

    if (id) {
      return { id };
    }

    throw new Error('Registration failed');
  }

  public async authUser(userDTO: UserDTO) {
    if (userDTO.token) {
      const user = await e
        .select(e.User, () => ({
          ...e.User['*'],
          filter_single: { token: userDTO.token },
        }))
        .assert_single()
        .run(client);

      if (user && user.id) {
        return { id: user.id, token: user.token, role: user.role };
      }
    }

    throw new Error('Invalid token');
  }
}
