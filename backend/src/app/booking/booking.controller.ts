import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingDTO, SearchDTO } from '../../dto/booking/booking.dto';
import { Flight } from '../../edgeql-js/interfaces';
import { BookingsList } from '../../utils/computedInterface';

@Controller('/booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('/search')
  async searchAvaidableFlights(
    @Body() searchParams: SearchDTO,
  ): Promise<Flight[] | { status: number; message: string }> {
    return this.bookingService.searchFlights(searchParams);
  }

  @Post('/save')
  async setBooking(@Body() bookingDTO: BookingDTO): Promise<{ id: string }> {
    return this.bookingService.saveBooking(bookingDTO);
  }

  @Get('/flight/:id')
  async getFligth(@Param('id') id: string): Promise<Flight> {
    return this.bookingService.getFlight(id);
  }

  @Get('/bookings')
  async getBookings(): Promise<BookingsList[]> {
    return this.bookingService.getBookings();
  }

  @Get('/user-bookings/:id')
  async getUserBookings(@Param('id') id: string): Promise<BookingsList[]> {
    return this.bookingService.getUserBookings(id);
  }
}
