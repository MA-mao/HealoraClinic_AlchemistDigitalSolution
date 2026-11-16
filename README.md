# Healora: Healthcare, Simplified

A modern, responsive **Appointment & Consultation Booking Platform** for a clinic. Users can browse services, find specialists, book appointments through a step-by-step flow, and manage their bookings. Built as a frontend-only project using mock JSON data.

## Features

### Core
- **Landing page** with navbar, hero section ("Book Appointment" CTA) and a services grid (title, duration, fee, category) with category filter
- **Specialist directory** with cards (name, specialty, experience, rating, available days), search and category filtering
- **4-step booking flow**: Service, Specialist, Date & Time, Client Details
  - Available and booked time slots are visibly different (booked slots are disabled)
  - Specialist's non-working days are disabled in the date picker
  - Form validation for name, phone, email and notes
  - Double-booking protection
- **My Bookings dashboard** with status badges (Pending, Confirmed, Completed, Cancelled), status filter tabs and a Cancel action with confirmation
- **Mobile-first responsive design** for mobile, tablet and desktop

### Bonus
- **Reschedule modal** to change the date/time of an existing booking
- **Booking confirmation slip** shown right after booking, with a Print option

### Extras
- Toast notifications, empty states, 404 page, scroll-to-top on route change, page fade animation
- Bookings persist in `localStorage`

## Tech Stack

- React 19 (Vite)
- Tailwind CSS v4
- React Router DOM
- React Hot Toast
- Mock JSON data + `localStorage`

## Setup

**Requirements:** Node.js 18 or higher

```bash
# 1. Clone or download the project, then go into the folder
cd healora-clinic

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open `http://localhost:5173` in your browser.

```bash
# Production build
npm run build

# Preview the production build
npm run preview
```

## Folder Structure

```
healora-clinic/
├── public/
├── src/
│   ├── components/
│   │   ├── CancelModal.jsx          Confirmation popup before cancelling
│   │   ├── ClientDetailsForm.jsx    Name, phone, email, notes form
│   │   ├── ConfirmationSlip.jsx     Printable booking slip
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx               Responsive navbar with mobile menu
│   │   ├── RescheduleModal.jsx      Change date/time of a booking (bonus)
│   │   ├── ScrollToTop.jsx          Scrolls to top on route change
│   │   ├── ServiceCard.jsx
│   │   ├── ServicesGrid.jsx         Services grid with category filter
│   │   ├── SpecialistCard.jsx
│   │   ├── StatusBadge.jsx          Coloured booking status label
│   │   ├── StepIndicator.jsx        Booking wizard progress bar
│   │   └── TimeSlotPicker.jsx       Date chips + available/booked slots
│   ├── context/
│   │   └── BookingContext.jsx       Global booking state + actions
│   ├── data/
│   │   ├── bookings.json
│   │   ├── services.json
│   │   ├── specialists.json
│   │   └── timeSlots.json
│   ├── pages/
│   │   ├── Book.jsx                 Booking wizard
│   │   ├── Home.jsx
│   │   ├── MyBookings.jsx
│   │   ├── NotFound.jsx
│   │   └── Specialists.jsx
│   ├── utils/
│   │   └── helpers.js               Date and fee formatting helpers
│   ├── App.jsx                      Routes and layout
│   ├── index.css                    Tailwind import + custom styles
│   └── main.jsx                     App entry point
├── index.html
├── package.json
└── vite.config.js
```

## Component Architecture

```
App
├── BookingProvider (context: bookings state)
│   └── BrowserRouter
│       ├── ScrollToTop
│       ├── Navbar
│       ├── Routes
│       │   ├── Home
│       │   │   ├── Hero
│       │   │   └── ServicesGrid → ServiceCard
│       │   ├── Specialists → SpecialistCard
│       │   ├── Book
│       │   │   ├── StepIndicator
│       │   │   ├── TimeSlotPicker
│       │   │   ├── ClientDetailsForm
│       │   │   └── ConfirmationSlip
│       │   ├── MyBookings
│       │   │   ├── StatusBadge
│       │   │   ├── CancelModal
│       │   │   └── RescheduleModal → TimeSlotPicker
│       │   └── NotFound
│       └── Footer
```

### State management
All bookings live in `BookingContext`, which exposes:

| Function | Purpose |
|---|---|
| `bookings` | List of all bookings |
| `addBooking(data)` | Creates a booking with status `Pending` |
| `cancelBooking(id)` | Sets status to `Cancelled` |
| `rescheduleBooking(id, date, timeSlot)` | Updates date and time of a booking |
| `isSlotBooked(specialistId, date, timeSlot)` | Checks if a slot is taken (cancelled bookings are ignored) |

The state is initialised from `src/data/bookings.json` on first load and saved to `localStorage` (key: `healora-bookings`) after every change.

## Data Schemas

**Booking** (`bookings.json`)
```json
{
  "id": 1,
  "serviceId": 1,
  "specialistId": 1,
  "date": "2026-11-16",
  "timeSlot": "10:00 AM",
  "status": "Confirmed",
  "clientName": "Ali Raza",
  "phone": "03001234567",
  "email": "ali@example.com",
  "notes": "Regular checkup"
}
```

**Service** (`services.json`)
```json
{ "id": 1, "title": "General Checkup", "category": "General", "duration": 30, "fee": 1500 }
```

**Specialist** (`specialists.json`)
```json
{ "id": 1, "name": "Dr. Ayesha Khan", "specialty": "General", "experience": 10, "rating": 4.8, "availableDays": ["Mon", "Tue", "Wed", "Thu"] }
```

A service's `category` matches a specialist's `specialty`, so choosing a service shows only the relevant doctors.

## Key Logic

- **Slot availability:** a slot is "Booked" if another non-cancelled booking has the same specialist, date and time.
- **Date picker:** shows the next 14 days; days outside the specialist's `availableDays` are disabled.
- **Validation:** name (letters only, min 3 chars), phone (Pakistani format `03XXXXXXXXX`), email (valid format), notes (max 200 chars).
- **Deep links:** `/book?service=3` and `/book?specialist=2` pre-select a service or specialist.

## Notes and Assumptions

- There is no login system, so the My Bookings page shows all bookings in the mock data.
- No backend is used. Clearing browser data resets bookings to the original mock data.
- New bookings start as `Pending`. Status changes to Confirmed/Completed would be handled by clinic staff in a real system.

## Responsive Breakpoints

| Device | Width | Layout |
|---|---|---|
| Mobile | < 640px | 1 column, hamburger menu, booking cards |
| Tablet | 640px to 1023px | 2 columns, table view from 768px |
| Desktop | 1024px+ | 4 columns, sticky booking summary |
