module default {
  scalar type Role extending enum<admin, user>;

  scalar type DepartueIntervalls extending enum<hourly, daily, weekly>;

  abstract type HasTimeStamp {
    created: datetime {
      default := datetime_of_statement();
    }
  }

  type Session {
    required token: uuid {
      default := std::uuid_generate_v4();
      constraint exclusive;
    }
    required expired: datetime {
      default := datetime_of_statement() + <cal::date_duration>'7 days';
    }
  }

  type User extending Session {
    required email: str {
      constraint exclusive;
    }
    required password: str;
    required role: Role {
      default := 'admin';
    }
    required name: str;
    session: Session;
    created: datetime {
      default := datetime_of_statement();
    }
    multi bookings: Booking;
  }

  type Booking extending HasTimeStamp {
    user: User;
    flight: Flight;
    multi extras: Extra;
    multi seats: Seat;
  }

  type Seat {
    required position: str;
    required isBooked: bool{
        default := false
    }
  }

  type Flight {
    departureDate: datetime;
    departueAirport: Airport;
    arrivalAirport: Airport;
    flightTime: int64; #minutes
    multi seats: Seat;
    required price: int64;
  }

  type Extra {
    required name: str;
    required description: str;
    required price: int64;
  }

  type Airport {
    required name: str;
    required country: str;
    required city: str;
  }
}
