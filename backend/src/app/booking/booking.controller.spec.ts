import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './booking.service';
import { EdgeDBTestModule } from '../../../test/utils/edgedb-test.module';
import { randomUUID } from 'crypto';  
import { NotFoundException } from '@nestjs/common';

describe('BookingService (Integration)', () => {
  let service: BookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EdgeDBTestModule],
      providers: [BookingService],
    }).compile();

    service = module.get<BookingService>(BookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('searchFlights', () => {
    it('should return a list of flights based on search parameters or not found', async () => {
      const searchParams = {
        departureDate: '2023-07-17',
        arrivalAirport: randomUUID(),
        departueAirport: randomUUID(),
        passengers: 0,
      };

      
        const result = await service.searchFlights(searchParams);
        expect(result).toBeDefined(); 
        expect(result.length).toBeGreaterThan(0); 
      
    });
  });

  // További tesztek itt...
});
