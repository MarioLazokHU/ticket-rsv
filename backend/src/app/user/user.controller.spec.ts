import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import e from '../../utils/e';
import { client } from '../../utils/edgedb';

describe('BookingService (Integration)', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  let userId: string;
  let userToken: string;
  const userIn = { email: 'test@test.com', name: 'test', password: 'testword' };

  afterAll(async () => {
    await e
      .delete(e.User, () => ({
        filter_single: { id: userId },
      }))
      .run(client);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register-user', () => {
    it('should be return user id', async () => {
      const result = await service.registerUser(userIn);
      userId = result.id;
      expect(result).toBeDefined();
      expect(
        new RegExp(
          /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/,
        ).test(result.id),
      ).toBeTruthy();
    });
  });
  describe('login-user', () => {
    it('should be return user data', async () => {
      const result = await service.loginUser({
        email: userIn.email,
        password: userIn.password,
      });
      userToken = result.token;
      expect(result).toBeDefined();
      expect(result.name).toBe(userIn.name);
      expect(result.role).toBe('admin' || 'user');
      expect(
        new RegExp(
          /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/,
        ).test(result.id),
      ).toBeTruthy();
      expect(
        new RegExp(
          /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/,
        ).test(result.token),
      ).toBeTruthy();
    });
    it('should return user not found', async () => {
      try {
        await service.loginUser({
          email: 'error@error.com',
          password: 'notfound',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Invalid credentials');
      }
    });
  });

  describe('auth-user', () => {
    it('shuld be return user-data(partial) from token', async () => {
      const result = await service.authUser({ token: userToken, ...userIn });
      expect(result).toBeDefined();
      expect(result.token).toBe(userToken);
      expect(result.role).toBe('admin' || 'user');
      expect(
        new RegExp(
          /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/,
        ).test(result.id),
      ).toBeTruthy();
    });
    it('should return user not found', async () => {
      try {
        await service.loginUser({ token: 'invalidtoken', ...userIn });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Invalid token');
      }
    });
  });
});
