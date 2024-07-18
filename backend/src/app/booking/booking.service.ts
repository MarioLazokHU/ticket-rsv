import { Injectable, NotFoundException } from '@nestjs/common';
import e from '../../utils/e';
import { client } from '../../utils/edgedb';
import { BookingDTO, SearchDTO } from '../../dto/booking/booking.dto';

@Injectable()
export class BookingService {
  public async searchFlights(searchParams: SearchDTO) {
    const searchParamsDepartureDate = new Date(searchParams.departureDate);
    const foundFlights = await e
      .select(e.Flight, (flight) => ({
        ...e.Flight['*'],
        departueAirport: { ...e.Airport['*'] },
        arrivalAirport: { ...e.Airport['*'] },
        seats: { ...e.Seat['*'] },
        filter: e.op(
          e.op(
            e.datetime_truncate(flight.departureDate, 'days'),
            '=',
            e.datetime_truncate(searchParamsDepartureDate, 'days'),
          ),
          'and',
          e.op(
            e.op(
              flight.arrivalAirport.id,
              '=',
              e.uuid(searchParams.arrivalAirport),
            ),
            'and',
            e.op(
              flight.departueAirport.id,
              '=',
              e.uuid(searchParams.departueAirport),
            ),
          ),
        ),
      }))
      .run(client);
    if (foundFlights.length > 0) {
      return foundFlights;
    } else {
      throw new NotFoundException('Flights not found');
    }
  }

  public async getFlight(id: string) {
    if (id) {
      const flight = await e
        .select(e.Flight, () => ({
          ...e.Flight['*'],
          arrivalAirport: { ...e.Airport['*'] },
          departueAirport: { ...e.Airport['*'] },
          seats: { ...e.Seat['*'] },
          filter_single: { id },
        }))
        .assert_single()
        .run(client);

      return flight;
    }
  }

  public async saveBooking(bookingDTO: BookingDTO) {
    const { id } = await e
      .insert(e.Booking, {
        flight: e
          .select(e.Flight, () => ({
            filter_single: { id: bookingDTO.flightId },
          }))
          .assert_single(),
        user: e
          .select(e.User, () => ({
            filter_single: { id: bookingDTO.userId },
          }))
          .assert_single(),
      })
      .run(client);

    if (id) {
      if (bookingDTO.extraIds.length > 0) {
        await Promise.all(bookingDTO.extraIds.map(async (ei) => {
          await e
            .update(e.Booking, () => ({
              set: {
                extras: {
                  '+=': e.select(e.Extra, () => ({
                    filter_single: { id: ei },
                  }))
                },
              },
              filter_single: { id },
            }))
            .run(client);
        }));
      }

      await e
        .update(e.User, () => ({
          set: {
            bookings: {
              '+=': e.select(e.Booking, () => ({
                filter_single: { id },
              })),
            },
          },
          filter_single: { id: bookingDTO.userId },
        }))
        .run(client);

      await Promise.all(bookingDTO.seatIds.map(async (si) => {
        await e
          .update(e.Seat, () => ({
            set: {
              isBooked: true,
            },
            filter_single: { id: si },
          }))
          .run(client);

        await e
          .update(e.Booking, () => ({
            set: {
              seats: {
                '+=': e.select(e.Seat, () => ({
                  filter_single: { id: si },
                }))
              },
            },
            filter_single: { id },
          }))
          .run(client);
      }));
      return { id };
    }
}
  public async getBookings() {
    const bookings = await e
      .select(e.Booking, () => ({
        ...e.Booking['*'],
        extras: { ...e.Extra['*'] },
        user: { email: true, name: true, id: true },
        seats: { ...e.Seat['*'] },
        flight: {
          ...e.Flight['*'],
          departueAirport: { ...e.Airport['*'] },
          arrivalAirport: { ...e.Airport['*'] },
        },
      }))
      .run(client);

    return bookings;
  }

  public async getUserBookings(id: string) {
    const userBookings = await e
      .select(e.Booking, (b) => ({
        ...e.Booking['*'],
        extras: { ...e.Extra['*'] },
        user: { email: true, name: true, id: true },
        seats: { ...e.Seat['*'] },
        flight: {
          ...e.Flight['*'],
          departueAirport: { ...e.Airport['*'] },
          arrivalAirport: { ...e.Airport['*'] },
        },
        filter: e.op(b.user.id, '=', e.uuid(id)),
      }))
      .run(client);

    return userBookings;
  }
}
