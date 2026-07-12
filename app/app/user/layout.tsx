import { Box, Container } from "@mui/material";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthGuard from "../components/AuthGuard";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard role={["user", "consumer"]} allowUnauthenticated={true}>
      <Box sx={{ minHeight: "100vh", backgroundColor: "#fafafa" }}>
        <Navbar />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4, minHeight: "100vh" }}>
          {children}
        </Container>
        <Footer />
      </Box>
    </AuthGuard>
  );
}
