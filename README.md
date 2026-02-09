# Hotel Booking System - Backend

This is the backend API for the Hotel Booking System. It is built using Node.js and Express, utilizing MongoDB for data storage. It handles user authentication, hotel management, and booking processes.

## Features

- **User Authentication**: Secure registration, login, and logout using JWT (JSON Web Tokens) stored in HTTP-only cookies.
- **Hotel Management**: Hotel owners can add, update, and delete their hotel listings.
- **Search & Filter**: Users can search for hotels by city and filter results.
- **Booking System**: Users can book hotels for specific dates. The system prevents double bookings by checking for date overlaps.
- **Dashboard Data**: Endpoints to retrieve user-specific bookings and owner-specific hotel listings.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT & bcryptjs
- **Environment**: dotenv

## Installation & Setup

1.  **Navigate to the backend directory**:
    ```bash
    cd backend
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root of the `backend` folder. You can copy the example file:
    ```bash
    cp .env.example .env
    ```
    Update the `.env` file with your specific configuration (Port, MongoDB URI, JWT Secret).

4.  **Run the Server**:
    ```bash
    # Development mode (if nodemon is installed)
    npm run dev
    
    # Production mode
    npm start
    ```

## API Endpoints

### Authentication (`User.controller.js`)

| Method | Endpoint (Suggested) | Controller Function | Description |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/register` | `register` | Register a new user (Default role: 'user'). |
| POST | `/api/auth/login` | `login` | Authenticate user and set JWT cookie. |
| POST | `/api/auth/logout` | `logout` | Clear authentication cookie. |
| GET | `/api/auth/profile` | `Profile` | Get current logged-in user's details. |

### Hotel Listings (`Listing.controller.js`)

| Method | Endpoint (Suggested) | Controller Function | Description |
| :--- | :--- | :--- | :--- |
| GET | `/api/listings` | `getAllListing` | Fetch all available hotels. |
| POST | `/api/listings/add` | `addListing` | Create a new hotel listing (Owner). |
| GET | `/api/listings/:id` | `getListingById` | Get details of a specific hotel. |
| PUT | `/api/listings/:id` | `updateListing` | Update hotel details. |
| DELETE | `/api/listings/:id` | `deleteListing` | Delete a hotel listing. |
| GET | `/api/listings/user/me`| `getMyHotels` | Get hotels owned by the current user. |
| GET | `/api/listings/search` | `hotelsbyCity` | Search hotels via query param `?city=...`. |
| POST | `/api/listings/filter` | `filterlisting` | Filter hotels by City (via body). |

### Bookings (`Booking.controller.js`)

| Method | Endpoint (Suggested) | Controller Function | Description |
| :--- | :--- | :--- | :--- |
| POST | `/api/bookings/create/:listingId` | `createBooking` | Create a booking. Validates dates and checks for overlaps. |
| GET | `/api/bookings/my-bookings` | `getMyBookings` | Get all bookings made by the current user. |
| DELETE | `/api/bookings/cancel/:id` | `cancelBooking` | Cancel an existing booking. |

## Models

### User
- **name**: String
- **email**: String (Unique)
- **password**: String (Hashed)
- **role**: String (e.g., 'user', 'admin')

### Listing (Hotel)
- **Title**: String
- **Description**: String
- **price**: Number
- **Address**: String
- **City**: String
- **Contact**: String
- **Image**: String (URL)
- **Owner**: ObjectId (Reference to User)

### Booking
- **user**: ObjectId (Reference to User)
- **listing**: ObjectId (Reference to Listing)
- **checkIn**: Date
- **checkOut**: Date
- **totalPrice**: Number
- **status**: String (e.g., 'pending', 'confirmed', 'cancelled')

## Testing
Use tools like **Postman** or **Insomnia** to test the endpoints. Ensure that for protected routes (like creating a booking or adding a hotel), you have logged in first so the `token` cookie is set.