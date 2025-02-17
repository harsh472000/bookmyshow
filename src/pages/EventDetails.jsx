import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Container, Typography } from "@mui/material";
import { toast } from "react-toastify";

import {
  bookSeats,
  setEvents,
  setLoading,
  setError,
} from "../store/slices/eventSlice";
import { fetchEvents } from "../utils/api";

const MAX_TICKETS = import.meta.env.VITE_APP_MAX_SEATS;

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const event = useSelector((state) =>
    state.events.events.find((e) => e.id === parseInt(id))
  );
  const bookedSeats = useSelector(
    (state) => state.events.bookedSeats[id] || {}
  );
  const user = useSelector((state) => state.auth.user); // logged-in user

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatLimitReached, setSeatLimitReached] = useState(false);

  useEffect(() => {
    if (!event) {
      dispatch(setLoading(true));
      fetchEvents()
        .then((eventData) => {
          dispatch(setEvents(eventData));
        })
        .catch(() => dispatch(setError("Failed to load event details")))
        .finally(() => dispatch(setLoading(false)));
    }
  }, [event, dispatch]);

  useEffect(() => {
    if (bookedSeats && Object.keys(bookedSeats).length > 0) {
      setSelectedSeats([]);
    }
  }, [bookedSeats]);

  useEffect(() => {
    if (selectedSeats.length >= MAX_TICKETS && !seatLimitReached) {
      toast.error(`You cannot select more than ${MAX_TICKETS} seats.`);
      setSeatLimitReached(true);
    }
    if (selectedSeats.length < MAX_TICKETS) {
      setSeatLimitReached(false);
    }
  }, [selectedSeats]);

  if (!user) {
    return (
      <Container>
        <Typography variant="h5" color="error">
          Please log in to book tickets.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Back to Events
        </Button>
      </Container>
    );
  }

  if (!event) {
    return (
      <Container>
        <Typography variant="h5" color="error">
          Event Not Found
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Back to Events
        </Button>
      </Container>
    );
  }

  const seatData = event.seats || bookedSeats;

  const handleSeatSelection = (row, seatIndex) => {
    const isSelected = selectedSeats.some(
      (seat) => seat.row === row && seat.seatIndex === seatIndex
    );

    if (isSelected) {
      setSelectedSeats(
        selectedSeats.filter(
          (seat) => seat.row !== row || seat.seatIndex !== seatIndex
        )
      );
    } else {
      if (selectedSeats.length >= MAX_TICKETS) {
        return;
      }
      setSelectedSeats([...selectedSeats, { row, seatIndex }]);
    }
  };

  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat.");
      return;
    }

    if (selectedSeats.length > event.availableTickets) {
      toast.error("Not enough tickets available.");
      return;
    }

    dispatch(
      bookSeats({ eventId: event.id, selectedSeats, username: user.name })
    );
    toast.success("Seats booked successfully!");
    navigate("/");
  };

  return (
    <Container sx={{ marginTop: "40px" }}>
      <Button
        variant="contained"
        sx={{ marginBottom: "40px" }}
        onClick={() => navigate("/")}
      >
        Back to Events
      </Button>
      <Typography variant="h4">{event.name}</Typography>
      <Typography>
        {event.date} - {event.venue}
      </Typography>

      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Select Your Seats (Max {MAX_TICKETS})
      </Typography>

      <Box>
        {Object.keys(seatData).length > 0 ? (
          <div style={{ display: "grid", gap: "10px", marginTop: "10px" }}>
            {Object.keys(seatData).map((row) => (
              <div key={row} style={{ display: "flex", gap: "5px" }}>
                <Typography variant="body1" style={{ width: "20px" }}>
                  {row}
                </Typography>
                {seatData[row].map((seat, index) => {
                  const isBooked = seat.booked;
                  const isSelected = selectedSeats.some(
                    (s) => s.row === row && s.seatIndex === index
                  );

                  return (
                    <Button
                      key={`${row}${index}`}
                      variant="contained"
                      style={{
                        backgroundColor: isBooked
                          ? "gray"
                          : isSelected
                          ? "green"
                          : "white",
                        color: isSelected ? "white" : "black",
                        minWidth: "40px",
                        height: "40px",
                        border: "1px solid black",
                      }}
                      disabled={isBooked}
                      onClick={() => handleSeatSelection(row, index)}
                    >
                      {index + 1}
                    </Button>
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          <Typography color="error">Seats data is not available.</Typography>
        )}
      </Box>

      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
        disabled={selectedSeats.length === 0}
        onClick={handleConfirmBooking}
      >
        Confirm Booking
      </Button>
    </Container>
  );
};

export default EventDetails;
