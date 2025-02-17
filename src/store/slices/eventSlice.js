import { createSlice } from "@reduxjs/toolkit";

const generateSeatLayout = () => {
  const rows = ["A", "B", "C", "D", "E"];
  const seatsPerRow = 10;
  const seats = {};

  rows.forEach((row) => {
    seats[row] = new Array(seatsPerRow).fill(true);
  });

  return seats;
};

// Load stored data from localStorage
const loadBookingsFromStorage = () => {
  const storedData = localStorage.getItem("bookedSeats");
  return storedData ? JSON.parse(storedData) : {};
};

const loadTicketsFromStorage = () => {
  const storedData = localStorage.getItem("availableTickets");
  return storedData ? JSON.parse(storedData) : {};
};

const initialState = {
  events: [],
  loading: false,
  error: null,
  bookedSeats: loadBookingsFromStorage(),
  availableTickets: loadTicketsFromStorage(),
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload.map((event) => ({
        ...event,
        seats:
          state.bookedSeats[event.id] || event.seats || generateSeatLayout(),
        availableTickets:
          state.availableTickets[event.id] || event.availableTickets || 50,
      }));
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    bookSeats: (state, action) => {
      const { eventId, selectedSeats, username } = action.payload;

      state.events = state.events.map((event) => {
        if (event.id === eventId) {
          if (!event.seats) return event;

          let updatedSeats = { ...event.seats };
          let availableTickets = event.availableTickets;

          selectedSeats.forEach(({ row, seatIndex }) => {
            if (updatedSeats[row] && updatedSeats[row][seatIndex]) {
              updatedSeats[row][seatIndex] = {
                booked: true,
                bookedBy: username,
              };
              availableTickets--;
            }
          });

          state.bookedSeats[eventId] = updatedSeats; // ✅ Store booked seats
          state.availableTickets[eventId] = availableTickets;

          localStorage.setItem(
            "bookedSeats",
            JSON.stringify(state.bookedSeats)
          );
          localStorage.setItem(
            "availableTickets",
            JSON.stringify(state.availableTickets)
          );

          return { ...event, seats: updatedSeats, availableTickets };
        }
        return event;
      });
    },
  },
});

export const { setEvents, setLoading, setError, bookSeats } =
  eventSlice.actions;
export default eventSlice.reducer;
