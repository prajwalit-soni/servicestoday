# Shoptera Frontend - Pages & Routes Catalog

This file documents the routing structure, page names, and file paths for the Shoptera Frontend Next.js application.

---

## 🌐 Public Routes (User Facing)

| Page Name | Routing URL | Component | Filesystem Path | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Root/Redirect** | `/` | `Page` | [app/page.tsx](file:///d:/Dooj/Shoptera%20Frontend/shoptera/app/page.tsx) | Application entrypoint redirecting to Dashboard or Homepage |
| **User Home** | `/user/home` | `ServicesPage` | [app/user/home/page.tsx](file:///d:/Dooj/Shoptera%20Frontend/shoptera/app/user/home/page.tsx) | Homepage listing category search grids, banners, and noteworthy services |
| **Services Listing** | `/services` | `ServicesPage` | [app/services/page.tsx](file:///d:/Dooj/Shoptera%20Frontend/shoptera/app/services/page.tsx) | Directory list of all available service types and categories |
| **Service Details** | `/services/[id]` | `ServiceDetailPage` | [app/services/\[id\]/page.tsx](file:///d:/Dooj/Shoptera%20Frontend/shoptera/app/services/%5Bid%5D/page.tsx) | Dynamic category-specific services detail (e.g. AC repair, electrician) |
| **Provider Details** | `/providers/[id]` | `ProviderDetailPage` | [app/providers/\[id\]/page.tsx](file:///d:/Dooj/Shoptera%20Frontend/shoptera/app/providers/%5Bid%5D/page.tsx) | Dynamic detailed information page for a specific service partner |
| **About Us** | `/about` | `AboutUs` | [app/about/page.tsx](file:///d:/Dooj/Shoptera%20Frontend/shoptera/app/about/page.tsx) | Core company stats, values, mission, and company overview page |
| **Contact Us** | `/contact` | `ContactUs` | [app/contact/page.tsx](file:///d:/Dooj/Shoptera%20Frontend/shoptera/app/contact/page.tsx) | Customer queries form and support contact options |
| **Help Center** | `/help` | `HelpCenter` | [app/help/page.tsx](file:///d:/Dooj/Shoptera%20Frontend/shoptera/app/help/page.tsx) | FAQ dashboard, topics search, and user guides |
| **Cart** | `/cart` | `CartPage` | [app/cart/page.tsx](file:///d:/Dooj/Shoptera%20Frontend/shoptera/app/cart/page.tsx) | Booking summary checkout, slot selection, and billing details |
| **User Profile** | `/profile` | `ProfilePage` | [app/profile/page.tsx](file:///d:/Dooj/Shoptera%20Frontend/shoptera/app/profile/page.tsx) | Customer details view, account settings, and addresses manager |
| **Privacy Policy** | `/privacy` | `PrivacyPolicy` | [app/privacy/page.tsx](file:///d:/Dooj/Shoptera%20Frontend/shoptera/app/privacy/page.tsx) | Standard guidelines regarding legal privacy rules |
| **Terms of Service** | `/terms` | `TermsOfService` | [app/terms/page.tsx](file:///d:/Dooj/Shoptera%20Frontend/shoptera/app/terms/page.tsx) | Terms, agreements, and booking conditions of Shoptera |

---

## 🔑 Authentication Routes

| Page Name | Routing URL | Component | Filesystem Path | Description |
| :--- | :--- | :--- | :--- | :--- |
| **User Login** | `/auth/login` | `Login` | [app/auth/login/page.tsx](file:///d:/Dooj/Shoptera%20Frontend/shoptera/app/auth/login/page.tsx) | Standard login page for customers |
| **User Signup** | `/auth/signup` | `Signup` | [app/auth/signup/page.tsx](file:///d:/Dooj/Shoptera%20Frontend/shoptera/app/auth/signup/page.tsx) | Signup page to register customer accounts |
| **Forgot Password** | `/auth/forgot-password` | `ForgotPassword` | [app/auth/forgot-password/page.tsx](file:///d:/Dooj/Shoptera%20Frontend/shoptera/app/auth/forgot-password/page.tsx) | Forgot password flow page sending OTP to reset |
| **Vendor Registration** | `/auth-vendor/register` | `VendorRegister` | [app/auth-vendor/register/page.tsx](file:///d:/Dooj/Shoptera%20Frontend/shoptera/app/auth-vendor/register/page.tsx) | Multistep onboarding form for service partners |

---

## 🛠️ Admin Dashboard Portal (`/admin/*`)

| Page Name | Routing URL | Component | Filesystem Path | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Admin Home** | `/admin` | `DashboardHome` | [app/admin/page.tsx](file:///d:/Dooj/Shoptera%20Frontend/shoptera/app/admin/page.tsx) | Core admin stats metrics overview charts and overview dashboard |
| **Website Config** | `/admin/website` | `WebsiteDashboard` | [app/admin/website/page.tsx](file:///d:/Dooj/Shoptera%20Frontend/shoptera/app/admin/website/page.tsx) | CRUD managers for Banners, Categories, and Subcategories |
| **Vendors List** | `/admin/vendors` | `DashboardHome` | [app/admin/vendors/page.tsx](file:///d:/Dooj/Shoptera%20Frontend/shoptera/app/admin/vendors/page.tsx) | Table listing all onboarded vendors and verification status controls |
| **Vendor Details** | `/admin/vendors/details` | `VendorDetailsPage` | [app/admin/vendors/details/page.tsx](file:///d:/Dooj/Shoptera%20Frontend/shoptera/app/admin/vendors/details/page.tsx) | Detailed profile inspect view for a selected vendor |
| **Locations Dashboard** | `/admin/vendors/locations` | `LocationsDashboard` | [app/admin/vendors/locations/page.tsx](file:///d:/Dooj/Shoptera%20Frontend/shoptera/app/admin/vendors/locations/page.tsx) | Geographical master database of States, Districts, Blocks, Panchayats, Villages, and Wards |

---

## 👷 Vendor Portal (`/vendor/*`)

| Page Name | Routing URL | Component | Filesystem Path | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Vendor Portal Home** | `/vendor` | `VendorPage` | [app/vendor/page.tsx](file:///d:/Dooj/Shoptera%20Frontend/shoptera/app/vendor/page.tsx) | Main dashboard for onboarded service partners |
| **Booking Requests** | `/vendor/requests` | `VendorRequestsPage` | [app/vendor/requests/page.tsx](file:///d:/Dooj/Shoptera%20Frontend/shoptera/app/vendor/requests/page.tsx) | Booking invitations list, accept/decline actions page |
| **Settings** | `/vendor/settings` | `VendorSettings` | [app/vendor/settings/page.tsx](file:///d:/Dooj/Shoptera%20Frontend/shoptera/app/vendor/settings/page.tsx) | Partner profiles, working fields, address update, and availability settings |

---

## 🧬 Helper & Testing Sub-pages

| Page Name | Routing URL | Component | Filesystem Path | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Vendor Table Sandbox** | `/components/table` | `VendorTable` | [app/components/table/page.tsx](file:///d:/Dooj/Shoptera%20Frontend/shoptera/app/components/table/page.tsx) | Isolated custom datatable component developer test page |
| **Alternative Cart Reg** | `/user/cart` | `VendorRegister` | [app/user/cart/page.tsx](file:///d:/Dooj/Shoptera%20Frontend/shoptera/app/user/cart/page.tsx) | Auxiliary vendor signup / register checkout redirection placeholder |

---

## ⚙️ Running the Project

To run the development server locally:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.
