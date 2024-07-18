import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import {e} from '../../utils/mocks/e'
import { client } from '../../utils/mocks/edgedb';
import { AirportDTO, ExtraDTO, FlightDTO } from '../../dto/admin/admin.dto';
/*
jest.mock('./utils/e');
jest.mock('./utils/edgedb');

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminService],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAirport', () => {
    it('should return a list of airports', async () => {
      const mockAirports = [{ id: '1', name: 'Heathrow' }];
      (e.run as jest.Mock).mockResolvedValue(mockAirports);

      const result = await service.getAirport();
      expect(result).toEqual(mockAirports);
    });
  });

  describe('getFlight', () => {
    it('should return a list of flights', async () => {
      const mockFlights = [
        {
          id: '1',
          departureDate: '2023-07-17',
          price: 100,
          flightTime: 120,
          arrivalAirport: { id: '2', name: 'Tokyo International Airport' },
          departueAirport: { id: '1', name: 'Heathrow' },
          seats: [{ id: '1', position: 'A1' }],
        },
      ];
      (e.run as jest.Mock).mockResolvedValue(mockFlights);

      const result = await service.getFlight();
      expect(result).toEqual(mockFlights);
    });
  });

  describe('getExtra', () => {
    it('should return a list of extras', async () => {
      const mockExtras: ExtraDTO[] = [{ name: 'Extra luggage', price: 1000 , description: 'aaa' }];
      (e.run as jest.Mock).mockResolvedValue(mockExtras);

      const result = await service.getExtra();
      expect(result).toEqual(mockExtras);
    });
  });

  describe('setAirport', () => {
    it('should create and return an airport id', async () => {
      const mockAirportDTO: AirportDTO = {
        city: 'London',
        country: 'UK',
        name: 'Heathrow',
      };
      const mockInsertResult = { id: '1' };
      (e.run as jest.Mock).mockResolvedValue(mockInsertResult);

      const result = await service.setAirport(mockAirportDTO);
      expect(result).toEqual(mockInsertResult);
    });
  });

  describe('setFlight', () => {
    it('should create and return a flight', async () => {
      const mockFlightDTO: FlightDTO = {
        departureDate: '2023-07-17',
        price: 100,
        flightTime: 120,
        arrivalAirport: '2',
        departueAirport: '1',
      };
      const mockFlightResult = { id: '1' };
      (e.run as jest.Mock).mockResolvedValue(mockFlightResult);

      const mockSeatResult = { id: '1' };
      (e.run as jest.Mock).mockResolvedValue(mockSeatResult);

      const result = await service.setFlight(mockFlightDTO);
      expect(result).toEqual(mockFlightResult);
    });
  });

  describe('setExtra', () => {
    it('should create and return an extra', async () => {
      const mockExtraDTO: ExtraDTO = {
          name: 'Extra luggage',
          price: 50,
          description: 'Somathing'
      };
      const mockInsertResult = { id: '1' };
      (e.run as jest.Mock).mockResolvedValue(mockInsertResult);

      const result = await service.setExtra(mockExtraDTO);
      expect(result).toEqual(mockInsertResult);
    });
  });
});
*/