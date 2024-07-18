import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { e } from '../../utils/mocks/e'; // Mock-olt e importálása
import { client } from '../../utils/mocks/edgedb';
import { UserDTO } from '../../dto/user/user.dto';
/*
jest.mock('./utils/mocks/e.ts'); // Jest mock e modulra
jest.mock('./utils/mocks/edgedb.ts');

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('loginUser', () => {
    it('should login a user with valid credentials', async () => {
      const mockUserDTO: UserDTO = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockUser = {
        id: '1',
        name: 'Test User',
        password: '$2b$10$123456789012345678901uUjGKmJ27Q5PcyKk.',
        role: 'user',
      };

      (e.select as jest.Mock).mockResolvedValue(mockUser);
      (e.update as jest.Mock).mockResolvedValue({ id: '1' });

      const result = await service.loginUser(mockUserDTO);

      expect(result).toEqual({
        id: '1',
        name: 'Test User',
        token: expect.any(String),
        role: 'user',
      });
    });

    it('should throw an error with invalid credentials', async () => {
      const mockUserDTO: UserDTO = {
        email: 'test@example.com',
        password: 'invalidpassword',
      };

      (e.select as jest.Mock).mockResolvedValue(null);

      await expect(service.loginUser(mockUserDTO)).rejects.toThrowError('Invalid credentials');
    });
  });

  describe('registerUser', () => {
    it('should register a new user', async () => {
      const mockUserDTO: UserDTO = {
        name: 'New User',
        email: 'newuser@example.com',
        password: 'password123',
      };

      const mockInsertResult = { id: '1' };
      (service['hashPassword'] as jest.Mock).mockResolvedValue('hashedPassword');
      (e.insert as jest.Mock).mockResolvedValue(mockInsertResult);

      const result = await service.registerUser(mockUserDTO);

      expect(result).toEqual({ id: '1' });
    });

    it('should throw an error if registration fails', async () => {
      const mockUserDTO: UserDTO = {
        name: 'New User',
        email: 'newuser@example.com',
        password: 'password123',
      };

      (service['hashPassword'] as jest.Mock).mockResolvedValue('hashedPassword');
      (e.insert as jest.Mock).mockResolvedValue(null);

      await expect(service.registerUser(mockUserDTO)).rejects.toThrow('Registration failed');
    });
  });
});
*/