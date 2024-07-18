interface Extra {
    description: string;
    name: string;
    price: number;
    id: string;
}

interface User {
    email: string;
    name: string
    id: string;
}

interface Seat {
    position: string;
    isBooked: boolean;
    id: string;
}

interface Flight {
    price: number;
    departureDate: Date;
    id: string;
    
}

export interface BookingsList {
    created: Date;
    id: string;
    seats: Seat[];
    extras: Extra[];
    user: User;
    flight: Flight;
}