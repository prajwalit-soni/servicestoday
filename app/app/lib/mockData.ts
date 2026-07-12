export type UserRecord = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  country: string;
};

export const mockUsers: UserRecord[] = [
  { id: 1, name: "Ava Roberts", email: "ava.roberts@example.com", role: "Admin", status: "Active", country: "USA" },
  { id: 2, name: "Noah Patel", email: "noah.patel@example.com", role: "Editor", status: "Inactive", country: "Canada" },
  { id: 3, name: "Mia Chen", email: "mia.chen@example.com", role: "Viewer", status: "Active", country: "UK" },
  { id: 4, name: "Ethan Kim", email: "ethan.kim@example.com", role: "Admin", status: "Active", country: "India" },
  { id: 5, name: "Sophia Garcia", email: "sophia.garcia@example.com", role: "Editor", status: "Pending", country: "Spain" },
  { id: 6, name: "Liam Wang", email: "liam.wang@example.com", role: "Viewer", status: "Active", country: "South Korea" },
  { id: 7, name: "Isabella Adams", email: "isabella.adams@example.com", role: "Editor", status: "Inactive", country: "Australia" },
  { id: 8, name: "Lucas Brown", email: "lucas.brown@example.com", role: "Viewer", status: "Active", country: "Germany" },
  { id: 9, name: "Amelia Singh", email: "amelia.singh@example.com", role: "Admin", status: "Active", country: "Singapore" },
  { id: 10, name: "Mason Wilson", email: "mason.wilson@example.com", role: "Editor", status: "Active", country: "France" }
];
