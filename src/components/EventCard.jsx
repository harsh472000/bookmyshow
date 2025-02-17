import React from "react";
import { Card, CardContent, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const EventCard = ({ event, availableTickets }) => {
  return (
    <Card
      sx={{
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
        },
      }}
    >
      <CardContent>
        <Typography variant="h4" sx={{ paddingBottom: "10px" }}>
          {event.name}
        </Typography>
        <Typography>Date: {event.date}</Typography>
        <Typography>Venue: {event.venue}</Typography>
        <Typography>
          Tickets Left:{" "}
          {availableTickets[event.id] === 0 ? (
            <Typography color="error" variant="body1">
              Sold Out
            </Typography>
          ) : availableTickets[event.id] !== undefined ? (
            availableTickets[event.id]
          ) : (
            event.availableTickets
          )}
        </Typography>
        <Button
          sx={{ marginTop: "20px" }}
          component={Link}
          to={`/event/${event.id}`}
          variant="contained"
          color="primary"
          disabled={availableTickets[event.id] === 0}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;
