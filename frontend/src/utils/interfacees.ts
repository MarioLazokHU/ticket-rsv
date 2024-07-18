interface Flight {
    price: number;
    departureDate: string;
    flightTime: number; // minutes
    id: string;
    departueAirport: Airport;
    arrivalAirport: Airport;
  }
  
  interface Airport {
    city: string;
    country: string;
    name: string;
    id: string;
  }

  
  interface Extra {
    description: string;
    name: string;
    price: number;
    id: string;
  }
  
  interface Seat {
    isBooked: boolean;
    position: string;
    id: string;
  }
  
    
 export interface FlightBooking {
    created: string;
    id: string;
    extras: Extra[];
    user: {
      email: string;
      name: string;
      id: string;
    };
    seats: Seat[];
    flight: Flight;
  }