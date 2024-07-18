import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AirportDTO, ExtraDTO, FlightDTO } from '../../dto/admin/admin.dto';
import { Airport, Extra, Flight } from '../../edgeql-js/interfaces';

@Controller('/admin')
export class AdminContoller {
  constructor(private readonly adminService: AdminService) {}

  @Get('/airports')
  async getAirportList(): Promise<Airport[]> {
    return this.adminService.getAirport();
  }

  @Get('/flights')
  async getFlightsList(): Promise<Flight[]> {
    return this.adminService.getFlight();
  }

  @Get('/extras')
  async getGetExtrasList(): Promise<Extra[]> {
    return this.adminService.getExtra();
  }

  @Post('/save-airport')
  async setAirport(@Body() airportDTO: AirportDTO): Promise<{ id: string }> {
    return await this.adminService.setAirport(airportDTO);
  }

  @Post('/save-flight')
  async setFlight(@Body() flightDTO: FlightDTO): Promise<{ id: string }> {
    return this.adminService.setFlight(flightDTO);
  }

  @Post('/save-extra')
  async setExtra(@Body() extraDTO: ExtraDTO): Promise<{ id: string }> {
    return this.adminService.setExtra(extraDTO);
  }
}
