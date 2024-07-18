## Introduction
This documentation contains the commands necessary for installing the system and information on how to use the system.

## Dependencies
- Node 20: https://nodejs.org/
- EdgeDB: https://docs.edgedb.com/get-started/quickstart

## Npm/EdgeDB commands (in order):
### backend/
1. `npm install` - installs backend dependencies
2. `edgedb project init` - creates the database and links it to the project
3. `edgedb restore ./dummy/dummy.dump` - populates the database with test data
4. `edgedb migration create` - creates a migration file
5. `edgedb migrate --dev-mode` - applies the migration in development mode
6. `npm run generate` - creates the query builder and schema interfaces
7. `npm start:dev` - starts the Nest application in development environment (PORT: 3000)

### frontend/
1. `npm install` - installs frontend dependencies
2. `npm run dev` - starts the frontend application in development environment

## Notes
- The frontend and backend are two separate applications that require two terminals.
- Preferred operating systems for running the application: Linux, MacOS
- On Windows, WSL is required to use EdgeDB: https://docs.edgedb.com/get-started/quickstart Windows (Powershell)

## Usage
### Registration and Login
The application is available by default at http://localhost:5173/.  
On the homepage, click the "Register" button in the top right corner to access the registration form.  
After a successful registration, the application redirects to the "Login" page, where you can log in with the email and password provided during registration. After a successful login, the application redirects to the homepage.

Default user:  
- email: `lazokmarios7@gmail.com`  
- password: `BlackBox90`  

### Homepage (Home)
#### Flight Search Module (Find flights)
Search by departure and arrival countries/airports and flight departure date. If no results are found, the system notifies the user.  
List all flights (ALL FLIGHT button).

#### Flight List
The flight card contains information related to the flight. The 'Book Now' button directs the user to the booking page of the ideal flight.

### Booking Page (Booking)
- Flight Card: contains information related to the flight.
- Extra Card: lists available extras with name, description, and price. Selecting an extra increases the total price.
- Seat Selection Card: contains available seats. Each seat selection increases the total price. One seat must be selected, and already booked seats cannot be selected.
- Summary Card: contains the total price of selected extras, the final amount, and the button to complete the booking. After a successful booking, the system provides feedback and redirects the user to the homepage.

### Header
- Home button: navigates to the homepage.
- Admin button (available to admins only).
- My Bookings button.
- User Management button.

### My Bookings Page
Contains the user's bookings with all relevant information in a list view.

### Admin Page
#### Booking Subpage
List of all users' bookings with all necessary details.

#### Airports Subpage
Admin can add new airports to the database.

#### Extras Subpage
New extra services can be added to the database.

#### Flights Subpage
Admin can create new flights.
