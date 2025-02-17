export const fetchEvents = async () => {
  const storedEvents = localStorage.getItem("events");

  if (storedEvents) {
    return JSON.parse(storedEvents);
  }

  const defaultEvents = [
    {
      id: 1,
      name: "Music Concert",
      date: "2025-03-15",
      venue: "Stadium A",
      availableTickets: 50,
    },
    {
      id: 2,
      name: "Comedy Show",
      date: "2025-04-20",
      venue: "Theater B",
      availableTickets: 50,
    },
    {
      id: 3,
      name: "Tech Conference",
      date: "2025-05-10",
      venue: "Expo Center",
      availableTickets: 50,
    },
    {
      id: 4,
      name: "Amir Mir Concert",
      date: "2025-03-20",
      venue: "Stadium A",
      availableTickets: 50,
    },
    {
      id: 5,
      name: "Anubhav singh bassi",
      date: "2025-04-21",
      venue: "Theater B",
      availableTickets: 50,
    },
    {
      id: 6,
      name: "Mind Relax session",
      date: "2025-05-26",
      venue: "Theater Room",
      availableTickets: 50,
    },
  ];

  localStorage.setItem("events", JSON.stringify(defaultEvents));
  return defaultEvents;
};
