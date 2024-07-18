# Backend Documentation

## EdgeDB & Typescript Query Builder
### Overview
This documentation covers the use of EdgeDB and its query builder in the NestJS backend application. It describes how to define database schemas, execute queries, and integrate them into services without providing specific code snippets.

### EdgeDB Setup
EdgeDB is a database system that employs a sophisticated data model and query language tailored for modern applications. Setting up EdgeDB involves configuring a client library within your NestJS project. This client connects your application to the EdgeDB database, enabling interaction through queries.

### Query Builder
EdgeDB offers a query builder that facilitates the creation of complex queries in a type-safe and readable manner. This builder allows developers to construct queries using JavaScript or TypeScript, leveraging the power of EdgeDB's query capabilities.

### Features
Schema Definition: EdgeDB supports defining database schemas that describe the structure of your data using a combination of types, objects, and relationships.

Query Execution: Queries are executed using the EdgeDB client, which connects to the EdgeDB server and sends queries for processing.

CRUD Operations: EdgeDB supports CRUD (Create, Read, Update, Delete) operations through its query builder, allowing developers to interact with data efficiently.

### Integration with NestJS
In a NestJS application, EdgeDB integration typically involves creating utility functions or modules that encapsulate database interaction logic. These functions or modules abstract away the complexity of querying EdgeDB, providing a clean interface for accessing and manipulating data within services and controllers.

### Benefits
Type Safety: Queries written using the query builder are type-safe, reducing the likelihood of runtime errors related to data types.

Expressive Queries: Developers can express complex relationships and conditions in queries, making it easier to retrieve and manipulate data according to application requirements.

### Use Cases
EdgeDB is suitable for applications requiring a robust data model and expressive querying capabilities. It excels in scenarios where data relationships are complex and where high-performance query execution is necessary.

### Conclusion
EdgeDB and its query builder offer powerful tools for managing and querying data in a NestJS application. By leveraging EdgeDB's capabilities, developers can build efficient and scalable backend systems that meet the demands of modern applications.

# App

### Overview
The AppModule is the main module in the NestJS application. It serves as the root module that orchestrates the application's controllers and providers. This module doesn't import any other modules but defines controllers and services crucial for handling user, admin, and booking operations.

## Controllers
### UserController
The UserController handles HTTP requests related to user operations. It defines routes and actions for managing user-related data and activities.

### AdminController
The AdminController is responsible for admin-specific operations. It manages routes and actions that are required for administrative tasks and functions.

### BookingController
The BookingController deals with booking-related operations. It defines routes and actions to handle booking management and related functionalities.

## Providers
### UserService
The UserService contains the business logic for user-related operations. It is used by the UserController to perform tasks like user creation, retrieval, update, and deletion.

### AdminService
The AdminService provides the business logic for admin operations. It supports the AdminController in handling administrative tasks, ensuring that the necessary operations are executed.

### BookingService
The BookingService handles the business logic related to booking operations. It assists the BookingController in managing bookings, including creating, updating, and retrieving booking information.

### Module Definition
The AppModule is defined by the @Module decorator, which lists the controllers and providers used in the application.


## User Module 
### Overview
The User module handles user authentication and registration processes. It comprises the UserController and UserService to manage user-related operations, including logging in, registering, and authenticating users.

### UserController
The UserController defines the routes and handles HTTP requests for user-related actions. It interacts with the UserService to perform the necessary operations.

### Routes
POST /user/login

Description: Authenticates a user based on provided credentials.
Request Body: UserDTO (email and password).
Response: Returns a user object with id, token, and role if authentication is successful.
Error: Throws HttpException with status 401 if authentication fails.
POST /user/register

Description: Registers a new user.
Request Body: UserDTO (name, email, and password).
Response: Returns an object with the user id if registration is successful.
Error: Throws HttpException with status 500 if registration fails.
POST /user/auth

Description: Authenticates a user based on a provided token.
Request Body: UserDTO (token).
Response: Returns a user object with id, token, and role if token is valid.
Error: Throws HttpException with status 401 if authentication fails.
UserService
The UserService contains the business logic for user-related operations. It interacts with the database to manage user data and authentication.

### Methods
hashPassword(password: string): Promise<string>

Description: Hashes the user's password using bcrypt.
Parameters: password - The plain text password.
Returns: The hashed password.
loginUser(userDTO: UserDTO): Promise<{ id: string; name: string; token: string; role: 'user' | 'admin' }>

Description: Authenticates a user by checking the email and password against the database.
Parameters: userDTO - An object containing the user's email and password.
Returns: An object containing the user's id, name, token, and role if authentication is successful.
Error: Throws an error if the credentials are invalid.
registerUser(userDTO: UserDTO): Promise<{ id: string }>

Description: Registers a new user by inserting their details into the database.
Parameters: userDTO - An object containing the user's name, email, and password.
Returns: An object containing the user's id if registration is successful.
Error: Throws an error if registration fails.
authUser(userDTO: UserDTO): Promise<{ id: string; token: string; role: 'user' | 'admin' }>

Description: Authenticates a user based on a provided token.
Parameters: userDTO - An object containing the user's token.
Returns: An object containing the user's id, token, and role if the token is valid.
Error: Throws an error if the token is invalid.
Data Transfer Object (DTO)
UserDTO
The UserDTO is used to transfer user data between the client and server. It includes the following fields:

name: The name of the user (required for registration).
email: The email address of the user (required for login and registration).
password: The user's password (required for login and registration).
token: The authentication token (required for token-based authentication).
Utilities
e
A utility for interacting with the database using EdgeDB. It provides methods for selecting, inserting, and updating user data.

### Error Handling
The module employs NestJS's HttpException to handle and throw appropriate HTTP errors when authentication or registration fails. This ensures that the client receives meaningful error messages and statuses.

## Admin Module
### Overview
The Admin module provides endpoints for managing airports, flights, and extras. It includes the AdminController and AdminService to handle administrative operations.

### AdminController
The AdminController defines routes and handles HTTP requests for administrative tasks. It communicates with the AdminService to perform operations related to airports, flights, and extras.

### Routes
GET /admin/airports

Description: Retrieves the list of airports.
Response: Returns an array of Airport objects.
GET /admin/flights

Description: Retrieves the list of flights.
Response: Returns an array of Flight objects, including related airports and seats.
GET /admin/extras

Description: Retrieves the list of extras.
Response: Returns an array of Extra objects.
POST /admin/save-airport

Description: Saves a new airport.
Request Body: AirportDTO (details of the airport to be saved).
Response: Returns an object containing the airport id.
POST /admin/save-flight

Description: Saves a new flight.
Request Body: FlightDTO (details of the flight to be saved).
Response: Returns an object containing the flight id.
POST /admin/save-extra

Description: Saves a new extra.
Request Body: ExtraDTO (details of the extra to be saved).
Response: Returns an object containing the extra id.
AdminService
The AdminService contains the business logic for managing airports, flights, and extras. It interacts with the database to perform these operations.

### Methods
getAirport(): Promise<Airport[]>

Description: Retrieves the list of airports from the database.
Returns: An array of Airport objects.
getFlight(): Promise<Flight[]>

Description: Retrieves the list of flights from the database, including related airports and seats.
Returns: An array of Flight objects.
getExtra(): Promise<Extra[]>

Description: Retrieves the list of extras from the database.
Returns: An array of Extra objects.
setAirport(airportDTO: AirportDTO): Promise<{ id: string }>

Description: Inserts a new airport into the database.
Parameters: airportDTO - An object containing details of the airport.
Returns: An object containing the airport id.
setFlight(flightDTO: FlightDTO): Promise<{ id: string }>

Description: Inserts a new flight into the database and associates seats with the flight.
Parameters: flightDTO - An object containing details of the flight.
Returns: An object containing the flight id.
setExtra(extraDTO: ExtraDTO): Promise<{ id: string }>

Description: Inserts a new extra into the database.
Parameters: extraDTO - An object containing details of the extra.
Returns: An object containing the extra id.
Data Transfer Objects (DTO)
AirportDTO
The AirportDTO is used to transfer airport data. It includes fields such as the airport name and location.

### FlightDTO
The FlightDTO is used to transfer flight data. It includes fields such as departure date, price, flight time, departure airport id, and arrival airport id.

### ExtraDTO
The ExtraDTO is used to transfer extra data. It includes fields such as the extra's name, description, and price.

### Interfaces
Airport
Represents the airport entity with relevant fields.

Flight
Represents the flight entity with relevant fields and associations.

Extra
Represents the extra entity with relevant fields.

### Utilities

seats
A utility for populating seat data for flights.

## Booking Module Documentation
### Overview
The Booking module provides endpoints for searching flights, managing bookings, and retrieving flight and booking information. It includes the BookingController and BookingService to handle booking-related operations.

### BookingController
The BookingController defines routes and handles HTTP requests for booking-related actions. It communicates with the BookingService to perform operations such as searching for available flights, saving bookings, and retrieving flight and booking details.

### Routes
POST /booking/search

Description: Searches for available flights based on search parameters.
Request Body: SearchDTO (search parameters including departure and arrival airports, and departure date).
Response: Returns an array of Flight objects that match the search criteria.
Error: Throws NotFoundException if no flights are found.
POST /booking/save

Description: Saves a new booking.
Request Body: BookingDTO (details of the booking including flight id, user id, seat ids, and extra ids).
Response: Returns an object containing the booking id.
GET /booking/flight/

Description: Retrieves details of a specific flight.
Parameters: id - The id of the flight to retrieve.
Response: Returns a Flight object with detailed information.
GET /booking/bookings

Description: Retrieves the list of all bookings.
Response: Returns an array of BookingsList objects containing detailed booking information.
GET /booking/user-bookings/

Description: Retrieves the list of bookings for a specific user.
Parameters: id - The id of the user whose bookings are to be retrieved.
Response: Returns an array of BookingsList objects containing detailed booking information for the user.
BookingService
The BookingService contains the business logic for managing bookings. It interacts with the database to perform operations such as searching for flights, saving bookings, and retrieving booking details.

### Methods
searchFlights(searchParams: SearchDTO): Promise<Flight[]>

Description: Searches for available flights based on the provided search parameters.
Parameters: searchParams - An object containing the search parameters (departure date, departure airport id, arrival airport id).
Returns: An array of Flight objects that match the search criteria.
Error: Throws NotFoundException if no flights are found.
getFlight(id: string): Promise<Flight>

Description: Retrieves details of a specific flight by its id.
Parameters: id - The id of the flight to retrieve.
Returns: A Flight object with detailed information.
saveBooking(bookingDTO: BookingDTO): Promise<{ id: string }>

Description: Saves a new booking into the database, associating the flight, user, seats, and extras.
Parameters: bookingDTO - An object containing details of the booking (flight id, user id, seat ids, and extra ids).
Returns: An object containing the booking id.
getBookings(): Promise<BookingsList[]>

Description: Retrieves the list of all bookings from the database.
Returns: An array of BookingsList objects containing detailed booking information.
getUserBookings(id: string): Promise<BookingsList[]>

Description: Retrieves the list of bookings for a specific user by their id.
Parameters: id - The id of the user whose bookings are to be retrieved.
Returns: An array of BookingsList objects containing detailed booking information for the user.
Data Transfer Objects (DTO)

BookingDTO
The BookingDTO is used to transfer booking data. It includes fields such as flight id, user id, seat ids, and extra ids.

SearchDTO
The SearchDTO is used to transfer search parameters for searching flights. It includes fields such as departure date, departure airport id, and arrival airport id.

Interfaces
Flight
Represents the flight entity with relevant fields and associations.

BookingsList
Represents the booking entity with detailed information, including associated user, flight, seats, and extras.

# Test 

## Integration Testing for UserService in NestJS
This document outlines the integration tests for the UserService in a NestJS application using Jest for testing. Integration tests verify the interactions between the service methods and the EdgeDB database, ensuring that user registration, login, and authentication functions correctly.

### Setup
The integration tests are designed to validate the functionality of the UserService against the EdgeDB database. Here’s an overview of the testing setup and the tests themselves:

Testing Module Setup: Uses Test.createTestingModule from @nestjs/testing to create a testing module for the UserService with dependencies properly injected.

Database Cleanup: Utilizes afterAll hook to clean up test data after all tests have been executed, ensuring a clean state for subsequent test runs.

Test Data: Defines a test user object (userIn) with email, name, and password for user registration and authentication tests.

### Tests
Registration Test: Verifies that the registerUser method in UserService correctly registers a new user and returns a valid user id. It checks the returned id format and ensures that the registration process behaves as expected.

Login Tests: Tests the loginUser method to ensure correct user authentication. It validates that the method returns user data including id, name, role, and token upon successful login. It also tests for scenarios where invalid credentials trigger an error with the message 'Invalid credentials'.

Authentication Tests: Validates the authUser method functionality, which verifies user identity based on a token. It asserts that the method returns partial user data including the token and role when provided with a valid token. It also tests for error handling when an invalid token is provided, triggering an error with the message 'Invalid token'.

### Conclusion
These integration tests provide comprehensive coverage for the UserService operations related to user registration, login, and authentication. By testing against a real EdgeDB instance using Jest and NestJS testing utilities, they ensure that the service methods interact correctly with the database and handle edge cases appropriately.

