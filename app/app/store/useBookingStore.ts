"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface Booking {
  id: string;
  serviceType: string;
  customerName: string;
  amount: number;
  status: string;
  date: string;
}

interface BookingStore {
  bookings: Booking[];
  updateStatus: (id: string, newStatus: string) => void;
}

const initialBookings: Booking[] = [
  { id: "BK-101", serviceType: "AC Repair", customerName: "Rahul Sharma", amount: 1500, status: "pending", date: "2023-10-25 10:00 AM" },
  { id: "BK-102", serviceType: "Deep Cleaning", customerName: "Anjali Gupta", amount: 2500, status: "scheduled", date: "2023-10-26 11:30 AM" },
  { id: "BK-103", serviceType: "Plumbing", customerName: "Vikram Singh", amount: 800, status: "completed", date: "2023-10-24 02:00 PM" },
  { id: "BK-104", serviceType: "Pest Control", customerName: "Sonia Verma", amount: 1200, status: "cancelled", date: "2023-10-23 09:00 AM" },
  { id: "BK-105", serviceType: "Electrician", customerName: "Amit Patel", amount: 500, status: "en-route", date: "2023-10-25 09:30 AM" },
  { id: "BK-106", serviceType: "Car Wash", customerName: "Pooja Hegde", amount: 600, status: "scheduled", date: "2023-10-27 04:00 PM" },
  { id: "BK-107", serviceType: "Painting", customerName: "Rajesh Kumar", amount: 5000, status: "completed", date: "2023-10-22 10:00 AM" },
];

export const useBookingStore = create<BookingStore>()(
  devtools(
    (set) => ({
      bookings: initialBookings,
      updateStatus: (id, newStatus) => set((state) => ({
        bookings: state.bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      })),
    }),
    { name: "BookingStore" }
  )
);
