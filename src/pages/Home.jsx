import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Container, Grid, Typography } from "@mui/material";

import { setEvents, setLoading, setError } from "../store/slices/eventSlice";
import { fetchEvents } from "../utils/api";
import EventCard from "../components/EventCard";

const Home = () => {
  const dispatch = useDispatch();
  const { events, loading, error, availableTickets } = useSelector(
    (state) => state.events
  );

  useEffect(() => {
    const loadEvents = async () => {
      dispatch(setLoading(true));
      try {
        const eventData = await fetchEvents(); // Mock API call
        dispatch(setEvents(eventData));
      } catch (err) {
        dispatch(setError("Failed to fetch events"));
      } finally {
        dispatch(setLoading(false));
      }
    };
    loadEvents();
  }, [dispatch]);

  return (
    <Container sx={{ marginTop: "40px" }}>
      <Typography variant="h4" gutterBottom>
        Upcoming Events
      </Typography>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <EventCard event={event} availableTickets={availableTickets} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
