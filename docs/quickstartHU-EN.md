# HU
## Bevezetés
Ez a dokumentáció a rendszer telepítéséhez szükséges parancsokat és a rendszer használatával kapcsolatos információkat tartalmazza.

## Függőségek
- Node 20: https://nodejs.org/
- EdgeDB: https://docs.edgedb.com/get-started/quickstart

## Npm/EdgeDB parancsok (sorrendben):
### backend/
1. `npm install` - telepíti a backend függőségeit
2. `edgedb project init` - létrehozza az adatbázist és hozzáköti a projekthez
3. `edgedb restore ./dummy/dummy.dump` - tesztadatokkal tölti fel az adatbázist
4. `edgedb migration create` - létrehoz egy migrációs fájlt
5. `edgedb migrate --dev-mode` - alkalmazza a migrációt fejlesztői módban
6. `npm run generate` - létrehozza a query builder-t és a séma interfészeket
7. `npm start:dev` - elindítja a Nest alkalmazást fejlesztői környezetben (PORT: 3000)

### frontend/
1. `npm install` - telepíti a frontend függőségeit
2. `npm run dev` - elindítja a frontend alkalmazást fejlesztői környezetben

## Megjegyzések
- A frontend és a backend két külön alkalmazás, amelyekhez két külön terminál szükséges.
- Az alkalmazás futtatásához preferált operációs rendszerek: Linux, MacOS
- Windows esetén WSL szükséges az EdgeDB használatához: https://docs.edgedb.com/get-started/quickstart Windows (Powershell)

## Használat
### Regisztráció és bejelentkezés
Az alkalmazás alapértelmezetten a http://localhost:5173/ címen érhető el.  
A főoldalon a jobb felső sarokban található "Register" gombra kattintva érhető el a regisztrációs űrlap.  
Sikeres regisztráció után az alkalmazás a "Login" oldalra irányít, ahol a regisztrációkor megadott email és jelszó használatával lehet bejelentkezni. Sikeres bejelentkezés után az alkalmazás a főoldalra navigál.

Alapértelmezett felhasználó:  
- email: `lazokmarios7@gmail.com`  
- jelszó: `BlackBox90`  

### Főoldal (Home)
#### Járatkereső modul (Find flights)
Keresés indulási és érkezési országok/repterek, valamint járat indulási dátum alapján. Ha nincs találat, a rendszer jelzi a felhasználónak.  
Minden járat listázása (ALL FLIGHT gomb).

#### Járatlista
A járatkártya a járattal kapcsolatos információkat tartalmazza. A 'Book Now' gomb az ideális járat foglalási oldalára irányítja a felhasználót.

### Foglalási oldal (Booking)
- Járatkártya: a járattal kapcsolatos információkat tartalmazza.
- Extra kártya: az elérhető extrák listáját tartalmazza névvel, leírással és árral. Az extra kiválasztása növeli a teljes árat.
- Ülésválasztó kártya: az elérhető üléseket tartalmazza. Minden ülés kiválasztása növeli a teljes árat. Egy ülést kötelező kiválasztani, és a már lefoglalt ülések nem választhatók ki.
- Összegző kártya: tartalmazza a kiválasztott extrák összegét, a végösszeget és a foglalás végrehajtásához szükséges gombot. Sikeres foglalás esetén a rendszer visszajelzést küld és visszairányítja a felhasználót a főoldalra.

### Fejléc (Header)
- Home gomb: a főoldalra navigál.
- Admin gomb (csak adminok részére elérhető).
- Saját foglalások gomb.
- Felhasználó kezelése gomb.

### Saját foglalások oldal
A felhasználó saját foglalásait tartalmazza minden adattal lista nézetben.

### Admin oldal
#### Booking aloldal
Minden felhasználó foglalásainak listája minden szükséges adattal.

#### Airports aloldal
Az admin új reptereket adhat hozzá az adatbázishoz.

#### Extra aloldal
Új extra szolgáltatások adhatók hozzá az adatbázishoz.

#### Flights aloldal
Az admin új járatokat hozhat létre.

# EN
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
