# Healora: Healthcare, Simplified

A modern, responsive **Appointment & Consultation Booking Platform** for a clinic, built as a single-page React application. Users can explore services, browse specialists, book appointments through a step-by-step modal, and manage their bookings. The project is frontend-only and uses structured mock JSON data with `localStorage` persistence.

**Live Demo:** https://healora-clinic-alchemist-digital-so.vercel.app/

## Features

### Core requirements
- **Landing and services showcase:** sticky navbar, hero section with a primary "Book Appointment" CTA, and a services grid showing title, duration, fee and category (with category filter).
- **Specialist directory:** profile cards with name, specialty, experience, rating and available days, with search and category filtering.
- **Interactive booking flow:** a 4-step modal (Service, Specialist, Date and Time, Client Details).
  - Available and booked time slots are visibly different, and booked slots are disabled.
  - Dates on which a specialist does not work are disabled.
  - Form validation for name, phone, email and notes.
  - Double-booking protection, re-checked at confirmation time.
- **My Bookings dashboard:** table on desktop and cards on mobile, status badges (Pending, Confirmed, Completed, Cancelled), status filter tabs and a "Cancel Appointment" action with a confirmation popup.
- **Mobile-first responsiveness** across mobile, tablet and desktop.

### Bonus features
- **Reschedule modal** to change the date and time slot of an existing booking.
- **Booking confirmation slip** shown immediately after booking, with a print option (prints only the slip).

### Extra polish
- Splash screen with heartbeat animation (shown once per session, with a Skip button)
- Scroll-spy navbar with smooth scrolling between sections
- Scroll-reveal animations, count-up stats, hover effects and modal transitions
- Patient reviews with a rating form (saved in `localStorage`), FAQ accordion and a contact form with validation
- Toast notifications, empty states and a custom 404 page
- Image fallbacks, so the layout never breaks if a photo is missing
- Respects `prefers-reduced-motion`

## Tech Stack

- React (Vite)
- Tailwind CSS v4
- React Router DOM
- React Hot Toast
- Mock JSON data and `localStorage`

## Getting Started

**Requirements:** Node.js 18 or higher.

```bash
# 1. Go into the project folder
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
│   ├── favicon.png
│   └── images/
│       ├── hero-doctor.jpg
│       ├── about-clinic.jpg
│       ├── doctors/           doctor-1.jpg ... doctor-8.jpg
│       ├── services/          one photo per service
│       └── patients/          patient-1.jpg ... patient-4.jpg
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── BookingModal.jsx          4-step booking wizard in a modal
│   │   ├── CancelModal.jsx           Confirmation before cancelling
│   │   ├── ClientDetailsForm.jsx     Name, phone, email, notes
│   │   ├── ConfirmationSlip.jsx      Printable booking slip
│   │   ├── Contact.jsx               Contact info, map and form
│   │   ├── CountUp.jsx               Animated number counter
│   │   ├── DoctorAvatar.jsx          Illustrated fallback avatar
│   │   ├── FAQ.jsx                   Accordion
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Icons.jsx                 SVG icon set
│   │   ├── Logo.jsx
│   │   ├── Navbar.jsx                Scroll-spy navbar with mobile menu
│   │   ├── RescheduleModal.jsx       Change date/time (bonus)
│   │   ├── Reveal.jsx                Scroll-reveal wrapper
│   │   ├── ScrollToTop.jsx           Scroll handling on route/hash change
│   │   ├── ServiceCard.jsx
│   │   ├── ServicesGrid.jsx          Services grid with category filter
│   │   ├── SmartImage.jsx            Image with extension and fallback handling
│   │   ├── SpecialistCard.jsx
│   │   ├── SplashScreen.jsx          Intro animation
│   │   ├── StatusBadge.jsx
│   │   ├── StepIndicator.jsx         Wizard progress bar
│   │   ├── TimeSlotPicker.jsx        Date chips and available/booked slots
│   │   ├── Reviews.jsx               Ratings summary, review form and cards
│   │   └── WhyChooseUs.jsx
│   ├── context/
│   │   ├── BookingContext.jsx        Bookings state and actions
│   │   └── BookingModalContext.jsx   Opens the booking modal from anywhere
│   ├── data/
│   │   ├── bookings.json
│   │   ├── reviews.json
│   │   ├── services.json
│   │   ├── specialists.json
│   │   └── timeSlots.json
│   ├── pages/
│   │   ├── Home.jsx                  All sections on one page
│   │   ├── MyBookings.jsx            Bookings dashboard section
│   │   ├── NotFound.jsx
│   │   └── Specialists.jsx           Directory section
│   ├── utils/
│   │   └── helpers.js                Date and fee formatting
│   ├── App.jsx                       Routes, splash and layout
│   ├── index.css                     Tailwind import and custom animations
│   └── main.jsx
├── index.html
├── package.json
├── vercel.json                       SPA rewrite for deployment
└── vite.config.js
```

## Page Structure

The site is a single page. The navbar scrolls smoothly to each section:

`Hero` then `Why Healora` then `About` then `Services` then `Specialists` then `How It Works` then `My Bookings` then `Reviews` then `FAQ` then `Contact` then `Footer`.

The booking flow opens as a **modal** from any "Book" button, so users never leave the page. Old links such as `/book?service=3` still work and open the modal with that service pre-selected.

## Component Architecture

```
App
├── SplashScreen (once per session)
└── BookingProvider                    bookings state
    └── BrowserRouter
        └── BookingModalProvider       modal open/close state
            ├── ScrollToTop
            ├── Navbar
            ├── Routes
            │   ├── Home
            │   │   ├── Hero
            │   │   ├── WhyChooseUs
            │   │   ├── About
            │   │   ├── ServicesGrid → ServiceCard
            │   │   ├── Specialists → SpecialistCard
            │   │   ├── MyBookings → StatusBadge, CancelModal, RescheduleModal
            │   │   ├── Reviews
            │   │   ├── FAQ
            │   │   └── Contact
            │   └── NotFound
            ├── Footer
            └── BookingModal
                ├── StepIndicator
                ├── TimeSlotPicker
                ├── ClientDetailsForm
                └── ConfirmationSlip
```

### State management

`BookingContext` exposes:

| Function | Purpose |
|---|---|
| `bookings` | List of all bookings |
| `addBooking(data)` | Creates a booking with status `Pending` |
| `cancelBooking(id)` | Sets status to `Cancelled` |
| `rescheduleBooking(id, date, timeSlot)` | Updates date and time of a booking |
| `isSlotBooked(specialistId, date, timeSlot)` | Checks if a slot is taken (cancelled bookings are ignored) |

State is initialised from `src/data/bookings.json` on first load and saved to `localStorage` (key: `healora-bookings`) after every change. Reviews use the key `healora-reviews`.

`BookingModalContext` exposes `openBooking({ serviceId, specialistId })` and `closeBooking()`.

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
{ "id": 1, "title": "General Checkup", "category": "General", "duration": 30, "fee": 1500, "image": "general" }
```

**Specialist** (`specialists.json`)
```json
{ "id": 1, "name": "Dr. Ayesha Khan", "specialty": "General", "experience": 10, "rating": 4.8, "availableDays": ["Mon", "Tue", "Wed", "Thu"] }
```

**Review** (`reviews.json`)
```json
{ "id": 1, "name": "Ali Raza", "rating": 5, "comment": "Great experience.", "date": "2026-11-02", "photo": "patient-1" }
```

A service's `category` matches a specialist's `specialty`, so choosing a service shows only the relevant doctors.

## Key Logic

- **Slot availability:** a slot is "Booked" when another non-cancelled booking has the same specialist, date and time slot.
- **Date picker:** shows the next 14 days, and days outside the specialist's `availableDays` are disabled.
- **Validation:** name (letters only, minimum 3 characters), phone (Pakistani format `03XXXXXXXXX`), email (valid format), notes (maximum 200 characters).
- **Cancel and reschedule:** only available for `Pending` and `Confirmed` bookings.
- **Printing:** print styles hide the whole website so only the confirmation slip is printed on one page.
- **Images:** `SmartImage` tries common extensions and shows a gradient or initials fallback if a photo is missing.

## Responsive Breakpoints

| Device | Width | Layout |
|---|---|---|
| Mobile | below 640px | 1 column, hamburger menu, booking cards, bottom-sheet modal |
| Tablet | 640px to 1023px | 2 columns, table view from 768px |
| Desktop | 1024px and above | 4 columns, full navbar, centered modal |

## Notes and Assumptions

- There is no login system, so My Bookings shows all bookings in the mock data.
- No backend is used. Clearing browser data resets bookings to the original mock data.
- New bookings start as `Pending`. In a real system, clinic staff would move them to Confirmed or Completed.
- The contact form, newsletter and reviews are saved locally and are not sent to a server.
- Photos are used for demonstration purposes only.

## Deployment

The app is deployed on Vercel. `vercel.json` rewrites all routes to `index.html` so direct links and refreshes work.