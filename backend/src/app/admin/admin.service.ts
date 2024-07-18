import { Injectable } from '@nestjs/common';
import e from '../../utils/e';
import { client } from '../../utils/edgedb';
import { AirportDTO, ExtraDTO, FlightDTO } from '../../dto/admin/admin.dto';
import { seats } from '../../utils/pupulate/seats';

@Injectable()
export class AdminService {
  public async getAirport() {
    const airports = await e
      .select(e.Airport, () => ({
        ...e.Airport['*'],
      }))
      .run(client);

    return airports;
  }

  public async getFlight() {
    const flights = await e
      .select(e.Flight, () => ({
        ...e.Flight['*'],
        arrivalAirport: { ...e.Airport['*'] },
        departueAirport: { ...e.Airport['*'] },
        seats: { ...e.Seat['*'] },
      }))
      .run(client);

    return flights;
  }

  public async getExtra() {
    const extra = await e
      .select(e.Extra, () => ({
        ...e.Extra['*'],
      }))
      .run(client);

    return extra;
  }

  public async setAirport(airportDTO: AirportDTO) {
    const { id } = await e
      .insert(e.Airport, {
        ...airportDTO,
      })
      .run(client);
    return { id };
  }

  public async setFlight(flightDTO: FlightDTO) {
    const flight = await e
      .insert(e.Flight, {
        departureDate: new Date(flightDTO.departureDate),
        price: flightDTO.price,
        flightTime: flightDTO.flightTime,
        departueAirport: e
          .select(e.Airport, () => ({
            filter_single: { id: flightDTO.departueAirport },
          }))
          .assert_single(),
        arrivalAirport: e
          .select(e.Airport, () => ({
            filter_single: { id: flightDTO.arrivalAirport },
          }))
          .assert_single(),
      })
      .run(client);

    const seatIds = await Promise.all(
      seats.map(async (seat) => {
        const { id } = await e
          .insert(e.Seat, {
            position: seat,
          })
          .run(client);
        return id.toString();
      }),
    );

    await Promise.all(
      seatIds.map(async (id) => {
        await e
          .update(e.Flight, () => ({
            set: {
              seats: {
                '+=': e.select(e.Seat, () => ({
                  id: true,
                  filter_single: { id },
                })),
              },
            },
            filter_single: {id: flight.id}
          }))
          .run(client);
      }),
    );
    return flight;
  }

  public async setExtra(extraDTO: ExtraDTO) {
    const extra = await e
      .insert(e.Extra, {
        ...extraDTO,
      })
      .run(client);

    return extra;
  }
}
