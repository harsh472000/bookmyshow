# 🎟️ BookMyShow Event Booking System

## 📌 Overview

BookMyShow Event Booking System is a simplified ticket booking application built with **React**, **Redux**, and **Material-UI (MUI)**. Users can view available events, book seats, and manage their reservations seamlessly.

## 🚀 Features

- **Event Listing Page**: Displays events with name, date, time, venue, and available tickets.
- **Event Details Page**: Allows users to book seats and view event details.
- **Booking System**: Updates available tickets in real-time.
- **Authentication**: Users must log in to book seats.
- **Seat Selection**: Users can select a maximum of 6 seats per booking.
- **Error Handling**: Displays meaningful messages when booking fails.
- **Persist Data**: Uses **localStorage** for maintaining booking data.
- **Modern UI/UX**: Uses **Material-UI (MUI)** for a responsive and elegant design.

---

## 🛠️ Installation & Setup

### **1️⃣ Clone the Repository**

```bash
 git clone https://github.com/YOUR_USERNAME/bookmyshow.git
 cd bookmyshow
```

### **2️⃣ Install Dependencies**

```bash
npm install
# or
yarn install
```

### **3️⃣ Set Up Environment Variables**

Create a `.env` file in the root directory and add:

```env
VITE_APP_MAX_SEATS=6
```

This sets the maximum number of seats a user can book.

### **4️⃣ Start the Development Server**

```bash
npm run dev
# or
yarn dev
```

The app will be available at: [http://localhost:5173](http://localhost:5173)

---

## 📌 Usage

### **Home Page**

- Displays a list of upcoming events.
- Click **"View Details"** to see more information and book tickets.

### **Event Details Page**

- Displays event name, date, venue, and seat selection.
- Users can select seats (max **6** per booking).
- Click **"Confirm Booking"** to reserve seats.

### **Authentication**

- Users must log in to book seats.
- Authentication is handled using **Redux & localStorage**.

---

## 🏗️ Technologies Used

- **React**: Frontend framework.
- **Redux Toolkit**: State management.
- **React Router**: Navigation between pages.
- **Material-UI (MUI)**: UI components.
- **Redux Persist**: Persists state between refreshes.
- **Toastify**: Displays notifications.
- **LocalStorage**: Stores booking data.

---

## 🔥 Error Handling & Edge Cases

### **Handled Scenarios:**

✅ **Max Seat Selection:** Users can't book more than `VITE_APP_MAX_SEATS` (default: **6**). Toast notification appears if exceeded.

✅ **Seats Already Booked:** Booked seats are **disabled (gray)** to prevent double booking.

✅ **Login Required:** If a user isn't logged in, a message appears: **"Please log in to book tickets"**.

✅ **Invalid Event ID:** If an event doesn't exist, a **"Event Not Found"** error appears.

✅ **Not Enough Tickets:** If the selected number of seats exceeds the available tickets, an **error toast** appears.

✅ **Persistent State:** Booked seats and user authentication persist using **localStorage**.

---

## 📜 API & State Management

### **Event API (`fetchEvents`)**

Mock API call to fetch event data:

```javascript
export const fetchEvents = async () => {
  return [
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
};
```

---

## 👨‍💻 Contributing

1. **Fork** the repository.
2. **Create** a new branch: `git checkout -b feature-branch`
3. **Commit** your changes: `git commit -m "Add feature"`
4. **Push** to the branch: `git push origin feature-branch`
5. Open a **Pull Request**.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🚀 Future Enhancements

- ✅ **User Profile Page** – Show booked tickets.
- ✅ **Admin Panel** – Manage events.
- ✅ **Firebase Authentication** – Secure user logins.
- ✅ **Payment Integration** – Stripe or Razorpay.

> **Need Help?** Feel free to open an [issue](https://github.com/YOUR_USERNAME/bookmyshow/issues) or contribute! 🚀
