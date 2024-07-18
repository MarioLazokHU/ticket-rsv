# Project Documentation: React Application
## Introduction

This documentation outlines the structure and functionality of the Mario's Airline React application. The project aims to flighs managing and booking.

### Technology Stack
Frontend Framework: React
Backend Framework: Nest.js
Routing: react-router-dom
State Management: Context API (AuthContext)
UI Framework: Material-UI
Styling: Tailwind
Installation and Running

### Installation:
`npm install`
Running:

`npm run dev`
The application will start in development mode at http://localhost:5173.

### Architecture
The project directory structure is as follows:

/src
  /components
    - Header.tsx
    - context
      - AuthContext.tsx
  /pages
    - Home.tsx
    - Register.tsx
    - Login.tsx
    - Admin.tsx
    - Booking.tsx
  App.tsx
  main.tsx

# Components and Major Modules
App.tsx
Entry point of the application. Initialization of main components and setting the default theme happens here.

## Header Components

### Overview
The Header component provides navigation and user interface elements for the application header. It dynamically adjusts its content based on the user's authentication status and role.

### Dependencies
Material-UI: Provides styling components like Typography for header text.
react-router-dom: Enables navigation within the React application using NavLink and useNavigate.
FontAwesome: Provides icons for navigation links.
Usage
The Header component is used at the top of each page to provide consistent navigation and user access controls.

### Structure
The Header component is structured as follows:

export default Header;
Explanation
Authentication and Role Management: Uses useAuth context to manage user authentication state (loggedIn) and role (userRole). Displays different navigation links and controls based on these states.
Navigation Links: Utilizes NavLink for internal navigation within the application.
Conditional Rendering: Dynamically renders navigation links based on the user's authentication status and role.

### Future Improvements
Enhance accessibility features such as screen reader support.
Implement responsive design for better usability on different devices.
Add error handling for cases such as failed authentication.

## Authentication Context (AuthProvider and useAuth):

The AuthProvider and useAuth components manage user authentication state and provide authentication-related functionalities throughout the application.

### Dependencies
React: Fundamental library for building user interfaces in React applications.
React Context API: Used for managing global state across the application.
Cookies: Utilized for storing user authentication information client-side.
Fetch API: Enables communication with the backend server for authentication.
AuthContextType

Defines the shape of the authentication context, including loggedIn state, login and logout functions, and userRole information.

AuthProvider Component
Props

children: ReactNode representing the child components wrapped by AuthProvider.
Usage

## Explanation
AuthContext: Creates a context with initial values for loggedIn, login, logout, and userRole.
useAuth: Custom hook to consume the authentication context values throughout the application.
useState: Manages state variables loggedIn and userRole to keep track of user authentication status.
useEffect: Loads user authentication data from cookies on component mount and attempts to authenticate if valid user data exists.
login: Updates loggedIn state to true when user successfully logs in.
logout: Clears user authentication data from cookies and resets state variables on logout.
authUser: Authenticates user with backend server using provided user ID and token, updating userRole and loggedIn state upon successful authentication.

## Future Improvements
Implement error handling for authentication failures.
Enhance security measures such as token expiration handling.
Expand documentation with examples of usage across different components.

# Admin section
## Admin Component

### Overview
The Admin component serves as the main interface for administrative functionalities within the application. It provides navigation to various admin-related pages such as managing bookings, flights, extras, and airports. It also ensures that only logged-in users with admin privileges can access the admin routes.

### Dependencies
React: For building the component structure and managing state.
React Router DOM: For handling navigation and routing.
Material-UI: For UI components such as Button, ButtonGroup, and CircularProgress.
AuthContext: For managing and accessing authentication state.
Component Structure
Props
The Admin component does not accept any props directly. It relies on the context provided by AuthProvider and internal state management.

### State
saveProgress (boolean): Indicates whether a save operation is in progress, used to show a loading indicator.

### Usage

### Authentication Check:

Uses the useAuth hook to access loggedIn and userRole from the AuthContext.
useEffect ensures that only logged-in users with the admin role can access this component. If the conditions are not met, it redirects the user to the home page with a 401 Unauthorized status.

### Navigation Buttons:
Uses Material-UI ButtonGroup to provide navigation between different admin sections (Booking, Flights, Extras, Airports).
Save Progress Indicator:

Displays a CircularProgress component when saveProgress is true, indicating that a save operation is in progress.

### Admin Routes:
Sets up routes for various admin-related components (Extras, Airports, Flights, Bookings) using Routes and Route from react-router-dom.
Each route component (e.g., Extras, Airports, Flights) accepts a setSaveProgress prop to update the save progress state.

### Components Used
useAuth: Custom hook to consume authentication context values.
ButtonGroup: Material-UI component to group buttons for navigation.
Button: Material-UI component for individual navigation buttons.
CircularProgress: Material-UI component to indicate loading state.
Routes and Route: React Router DOM components for routing.
Link: React Router DOM component for navigation links.
Airports, Flights, Extras, Bookings: Admin-related components for managing specific resources.

### Future Improvements
Add error handling for failed authentication or failed data fetch.
Enhance user feedback for save operations.
Consider adding breadcrumb navigation for better user experience.
Implement lazy loading for admin-related components to optimize performance.

## Airports Component
### Overview
The Airports component is designed for managing airport data within an admin interface. It allows users to add new airports and view the list of existing airports.

### Features
Add New Airport: Users can input details about a new airport and submit it to be saved.
View Existing Airports: Displays a list of saved airports with their details.

### Props
AirportsProps
setSaveProgress: A function to update the save progress state in the parent component.

### State Management
airportData: Stores the input data for a new airport.
savedAirports: Stores the list of airports fetched from the backend.
useEffect
getAirports: Fetches the list of airports when the component mounts.

### Functions
getAirports
Fetches the list of airports from the backend and updates the savedAirports state.

### handleAirportDataChange
Updates the airportData state when the input fields for the new airport are changed.

### handleSubmtiAirport
Submits the new airport data to the backend, resets the input fields, and updates the list of saved airports.

### Usage
Adding a New Airport:

Fill in the "Airport Name", "Airport Country", and "Airport City" fields.
Click the "Submit" button to save the new airport.
Viewing Airports:

The list of saved airports is displayed in a grid format with columns for "Name", "Country", "City", and "Options".

### UI Components
Card: Used for containing and organizing the form for adding new airports and the list of saved airports.
Typography: For titles and headings.
TextField: For input fields to enter new airport data.
Button: For submitting the new airport data.
Grid: For displaying the list of saved airports in a structured format.

## Extras Component 
### Overview
The Extras component is designed to manage additional services or items (extras) within an admin interface. It allows users to add new extras and view the list of existing extras.

### Features
Add New Extra: Users can input details about a new extra (name, description, and price) and submit it to be saved.
View Existing Extras: Displays a list of saved extras with their details.

### Props
setSaveProgress: A function to update the save progress state in the parent component.
State Management
useState
extraData: Stores the input data for a new extra.
savedExtras: Stores the list of extras fetched from the backend.
useEffect
getExtras: Fetches the list of extras when the component mounts.

### Functions
getExtras
Fetches the list of extras from the backend and updates the savedExtras state.

handleExtraDataChange
Updates the extraData state when the input fields for the new extra are changed.

handleSubmtiExtra
Submits the new extra data to the backend, resets the input fields, and updates the list of saved extras.

### Usage
Adding a New Extra:

Fill in the "Extra Name", "Description", and "Price" fields.
Click the "Submit" button to save the new extra.
Viewing Extras:

The list of saved extras is displayed in a grid format with columns for "Name", "Description", "Price", and "Options".
UI Components
Card: Used for containing and organizing the form for adding new extras and the list of saved extras.
Typography: For titles and headings.
TextField: For input fields to enter new extra data.
Button: For submitting the new extra data.
Grid: For displaying the list of saved extras in a structured format.


## Flights Component

### Overview
The Flights component is an administrative interface for managing flight data. It allows users to add new flights and view existing flights.

### Features
Add New Flight: Input details for a new flight (departure date, price, departure airport, and arrival airport) and submit to save.
View Existing Flights: Displays a list of saved flights with details such as departure and arrival information, date, price, and seats.

### Props
setSaveProgress: A function to update the save progress state in the parent component.

### State Management
flightsData: Stores the input data for a new flight.
savedFlights: Stores the list of flights fetched from the backend.
savedAirports: Stores the list of airports fetched from the backend.
useEffect
getFlights: Fetches the list of flights when the component mounts.
getAirports: Fetches the list of airports when the component mounts.

### Functions
getAirports
Fetches the list of airports from the backend and updates the savedAirports state.

getFlights
Fetches the list of flights from the backend and updates the savedFlights state.

handleSubmiFlight
Submits the new flight data to the backend, resets the input fields, and updates the list of saved flights.

### Usage
Adding a New Flight:

Fill in the "Departure Date", "Price", "Departure Airport", and "Arrival Airport" fields.
Click the "Submit" button to save the new flight.
Viewing Flights:

The list of saved flights is displayed in a grid format with columns for "Departure", "Arrival", "Flight Date", "Price", "Seats", and "Options".
UI Components
Card: Used for containing and organizing the form for adding new flights and the list of saved flights.
Typography: For titles and headings.
TextField: For input fields to enter new flight data.
Button: For submitting the new flight data.
Select: For selecting the departure and arrival airports from a list.
MenuItem: Represents individual items in the select dropdown.
InputLabel: Labels for input fields and dropdowns.
Tooltip: For providing additional information on hover.
Grid: For displaying the list of saved flights in a structured format.

### Integration
To use the Flights component:

Import it into your desired parent component.
Pass the setSaveProgress prop to manage save progress state.

# User Section

## Booking Component
### Overview
The Booking component provides a user interface for booking flights. Users can view flight details, select extras, and choose seats. It also allows users to complete the booking process.

### Features
View Flight Details: Displays the details of the selected flight, including departure and arrival information.
Select Extras: Users can select additional services (extras) for their booking.
Select Seats: Users can choose seats for the flight.
Checkout & Book: Users can finalize the booking and see the total price.

### State Management

flightData: Stores the data of the selected flight.
extrasData: Stores the list of available extras.
selectedExtras: Stores the list of extras selected by the user.
seatIDs: Stores the list of seat IDs selected by the user.
successDialog: Manages the state of the success dialog.
useEffect
getFlightData: Fetches the flight data when the component mounts.
getExtras: Fetches the extras data when the component mounts.

### Functions
getFlightData
Fetches the flight data based on the flightId from the URL parameters and updates the flightData state.

getExtras
Fetches the list of extras from the backend and updates the extrasData state.

handleBooking
Handles the booking process by sending the selected flight, user, extras, and seat IDs to the backend. Displays a success dialog upon successful booking.

handleCheckboxChange
Updates the selectedExtras state based on the checkbox status (checked/unchecked).

handleSeatSelection
Updates the seatIDs state based on the checkbox status (checked/unchecked).

### UI Components
Card: Used to organize and style sections such as flight details, extras, and seat selection.
Typography: For titles and text content.
Grid: For layout and alignment.
Button: For actions like "Checkout & Book".
Checkbox: For selecting extras and seats.
Dialog: For displaying the success message.
DialogTitle: For the title of the dialog.
DialogActions: For the actions in the dialog.

### Usage
Viewing Flight Details:

The flight details are displayed in a Card component showing the departure and arrival airports.
Selecting Extras:

Available extras are listed in a Card component. Users can select or deselect extras using checkboxes.
Selecting Seats:

Available seats are displayed in a Card component. Users can select or deselect seats using checkboxes.
Checkout & Book:

After selecting seats and any extras, users can click the "Checkout & Book" button to finalize the booking. The total price is calculated and displayed.
Success Dialog:

Upon successful booking, a dialog is displayed with a success message.
Integration
To use the Booking component:

Import it into the desired parent component or page.
Ensure the backend endpoints (/booking/flight/{flightId}, /admin/extras, /booking/save) are correctly set up to handle requests from this component.

### Notes
The component relies on URL parameters to fetch the flight ID.
It uses the getCookie utility to fetch the user ID from cookies.
The success dialog redirects the user to the home page upon closing.

## Home Component Documentation

### Overview
The Home component provides a user interface for searching and displaying flights. Users can search for flights based on departure airport, arrival airport, departure date, and the number of passengers. It also provides an option to display all available flights.

### Features
Search Flights: Allows users to search for flights based on specific criteria.
Display All Flights: Provides an option to display all available flights.
Flight Results: Displays the list of flights that match the search criteria or all flights if no criteria are set.
Book Flights: Provides a link to book a selected flight.

### State Management
useState
savedAirports: Stores the list of available airports.
searchFlightsParams: Stores the search parameters for finding flights.
flightsResultList: Stores the list of flights that match the search criteria.
useEffect
getAirports: Fetches the list of airports when the component mounts.

### Functions
getAirports
Fetches the list of available airports from the backend and updates the savedAirports state.

handleSearchFlights
Handles the search process by sending the search parameters to the backend and updates the flightsResultList state with the search results.

handleAllFlights
Fetches the list of all available flights from the backend and updates the flightsResultList state.

### UI Components
Card: Used to organize and style sections such as the search form and flight results.
Typography: For titles and text content.
InputLabel: For labeling form inputs.
Select: For selecting airports.
MenuItem: For individual options in the select dropdown.
DatePicker: For selecting the departure date.
LocalizationProvider: Provides localization support for the date picker.
TextField: For entering the number of passengers.
Button: For actions like "Search" and "All Flights".
Paper: For displaying additional flight information.
NavLink: For navigating to the booking page.

### Usage
Searching for Flights:

Users can select the departure airport, arrival airport, departure date, and the number of passengers using the form inputs.
Clicking the "Search" button triggers the handleSearchFlights function.
Displaying All Flights:

Users can click the "All Flights" button to display all available flights. This triggers the handleAllFlights function.
Viewing Flight Results:

The component displays the list of flights that match the search criteria or all flights if no criteria are set.
Each flight result shows the departure and arrival countries, an image, the price, the number of available seats, and a button to book the flight.
Booking a Flight:

Users can click the "Book now" button on a flight result to navigate to the booking page for that flight.
Integration
To use the Home component:

Import it into the desired parent component or page.
Ensure the backend endpoints (/admin/airports, /booking/search, /admin/flights) are correctly set up to handle requests from this component.

### Notes
The component relies on a list of airports and flight data from the backend.
It uses the dayjs library for date handling and formatting.
The search parameters include the departure airport, arrival airport, departure date, and the number of passengers.
Flight results display the number of available seats, which are determined by filtering out booked seats.

## UserBookings Component Documentation
### Description
The UserBookings component is designed to fetch and display a user's flight bookings. It retrieves data from an API, processes it, and presents it in a structured format using Material-UI components.

### State
userBookings: An array of FlightBooking objects that represent the user's flight bookings.

### Functions
getUserBookings: An asynchronous function that fetches the user's bookings from the server using their user ID, which is retrieved from a cookie.

### Hooks
useEffect: Invokes getUserBookings on component mount to fetch the user's bookings.
UI Structure
Main Container: A div that contains the entire component, with padding and flex properties to center the content.
Typography: Displays the user's name and the title "Bookings".
Card: A Material-UI Card component that contains the grid layout for the bookings.
Grid: A Material-UI Grid component to layout the booking details.
Columns: Labels for departure, arrival, flight date, flight time, total price, seats, user, and extras.
Booking Details: For each booking, details such as the departure and arrival airports, flight date and time, total price, seats, user information, and any extras are displayed in a grid layout.

### Data Handling
Fetching Data: The component makes an HTTP GET request to fetch the user's bookings using their user ID from cookies.
Rendering Data: Maps over the userBookings array to render each booking in a grid layout with appropriate details.

### Dependencies
React: For building the component and managing state.
Material-UI: For UI components and styling.
Utility Functions: getCookie for retrieving cookies and BASE_URL for the API endpoint.
useEffect and useState: React hooks for side effects and state management.

### Example Usage
This component can be used in a user profile page where the user's bookings need to be displayed. It assumes the presence of a cookie containing user information and an API endpoint to fetch the bookings.

### Styling
The component uses Tailwind CSS classes for basic styling and Material-UI for structured and consistent UI elements. It ensures a responsive and clean design by utilizing the flexbox model and grid system.

### Key Points
Data Fetching: Ensures that bookings are fetched on component mount and updates the state accordingly.
User Information: Displays user-specific bookings by fetching the user ID from cookies.
Detailed Display: Provides a detailed view of each booking, including flight and user details.
Error Handling: (Not implemented in the provided code) It is recommended to add error handling for the fetch requests to manage any potential issues gracefully.