export class AirportDTO {
  name: string;
  country: string;
  city: string;
}

export class FlightDTO {
  departureDate: string;
  price: number;
  departueAirport: string;
  arrivalAirport: string;
  flightTime: number;
}

export class ExtraDTO {
  name: string;
  price: number;
  description: string;
}
