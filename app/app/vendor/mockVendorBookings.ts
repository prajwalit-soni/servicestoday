export type BookingStatus = "pending" | "accepted" | "cancelled";

// export interface VendorBooking {
//   id: string;
//   serviceType: string;
//   customerName: string;
//   amount: number;
//   location: string;
//   status: BookingStatus;
//   date: string;
// }
export interface VendorBooking {
  id: string;
  serviceType: string;
  amount: number;
  status: string;
  [key: string]: any; // <--- This is the index signature
}

export const vendorBookings: VendorBooking[] = [
  {
    id: "B001",
    serviceType: "Parlour",
    customerName: "Priya Sharma",
    amount: 1200,
    location: "Delhi, India",
    status: "pending",
    date: "2026-04-19 10:30 AM",
  },
  {
    id: "B002",
    serviceType: "Plumber",
    customerName: "Amit Verma",
    amount: 800,
    location: "Noida, India",
    status: "pending",
    date: "2026-04-19 11:00 AM",
  },
  {
    id: "B003",
    serviceType: "Electrician",
    customerName: "Sunita Singh",
    amount: 950,
    location: "Gurgaon, India",
    status: "accepted",
    date: "2026-04-18 03:00 PM",
  },
  {
    id: "B004",
    serviceType: "Parlour",
    customerName: "Rohit Kumar",
    amount: 1500,
    location: "Delhi, India",
    status: "cancelled",
    date: "2026-04-17 01:00 PM",
  },
  {
    id: "B005",
    serviceType: "Plumber",
    customerName: "Meena Joshi",
    amount: 700,
    location: "Ghaziabad, India",
    status: "accepted",
    date: "2026-04-16 09:30 AM",
  },
];
