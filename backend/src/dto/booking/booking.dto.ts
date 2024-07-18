export class SearchDTO {
  departueAirport: string;
  arrivalAirport: string;
  departureDate: string;
  passengers: number;
}

export class BookingDTO{
  flightId: string
  userId: string
  extraIds: string[]
  seatIds: string[]
}
