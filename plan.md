# Plan: Add Booking Functionality

Add an integrated booking experience for hotels and travel services to the VagaBond travel planner.

## 1. Type Definitions & State Management
- Update `activeTab` type in `App.tsx` to include `"booking"`.
- Add a way to pre-fill destination in the booking search.

## 2. Component Updates
- **Navbar**: Add "Bookings" navigation item.
- **Booking Section (New)**:
    - Create `src/components/sections/Booking.tsx`.
    - Implement a multi-provider search interface (Hotels, Flights, etc.).
    - Display cards for booking options with "Book on [Provider]" buttons.
- **TripDetails**: Add an "Explore Booking Options" button that redirects to the Booking section.
- **Planner**: Add a "Find Hotels" link after a trip is created.

## 3. Mock Service
- Create a mock service to simulate API calls to travel sites (Booking.com, Expedia, Skyscanner).

## 4. Visual Improvements
- Ensure consistency with the existing blue/slate theme.
- Add responsive layouts for the booking results.
