import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";

const footerSections = [
  {
    heading: "What We Work",
    items: ["Plumbing Services", "Electrical Services", "Beauty & Wellness", "AC & Appliance Repair", "Cleaning Services"],
  },
  {
    heading: "Company",
    items: ["About Us", "Careers", "Blog", "Press", "Contact Us"],
  },
  {
    heading: "For Customers",
    items: ["Help Center", "Safety Center", "Reviews", "Terms of Service", "Privacy Policy"],
  },
  {
    heading: "Follow Us",
    items: ["Facebook", "Twitter", "Instagram", "LinkedIn", "YouTube"],
  },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1F1F1F",
        color: "#fff",
        pt: 6,
        pb: 3,
        mt: 8,
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 4,
            mb: 5,
          }}
        >
          {footerSections.map((section) => (
            <Box key={section.heading}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  fontSize: "16px",
                  color: "#fff",
                }}
              >
                {section.heading}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {section.items.map((item) => {
                  const isRoute =
                    item === "Terms of Service" ||
                    item === "Privacy Policy" ||
                    item === "Help Center" ||
                    item === "Contact Us" ||
                    item === "About Us";
                  const href =
                    item === "Terms of Service"
                      ? "/terms"
                      : item === "Privacy Policy"
                      ? "/privacy"
                      : item === "Help Center"
                      ? "/help"
                      : item === "Contact Us"
                      ? "/contact"
                      : item === "About Us"
                      ? "/about"
                      : "#";
                  if (isRoute) {
                    return (
                      <Link key={item} href={href} style={{ textDecoration: "none" }}>
                        <Typography
                          sx={{
                            color: "#B5B5B5",
                            fontSize: "14px",
                            transition: "color 0.2s ease",
                            "&:hover": { color: "#fff" },
                          }}
                        >
                          {item}
                        </Typography>
                      </Link>
                    );
                  }
                  return (
                    <Typography
                      key={item}
                      component="a"
                      href={href}
                      sx={{
                        color: "#B5B5B5",
                        fontSize: "14px",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                        "&:hover": { color: "#fff" },
                      }}
                    >
                      {item}
                    </Typography>
                  );
                })}
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            pt: 3,
            textAlign: "center",
          }}
        >
          <Typography sx={{ color: "#B5B5B5", fontSize: "14px" }}>
            © {new Date().getFullYear()} Shoptera. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
