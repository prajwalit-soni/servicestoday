"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  CircularProgress,
  TextField,
  InputAdornment,
  MenuItem,
  FormControl,
  Select,
  Pagination,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Rating,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axiosClient from "../../lib/api";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface ProviderListing {
  id: number;
  provider_id: number;
  business_name: string;
  category_name: string;
  cover_image_path: string;
  rating: number;
  address: string;
  phone: string;
  is_verified: boolean;
}

function ProvidersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const categoryParam = searchParams.get("category") || "All";

  const [providers, setProviders] = useState<ProviderListing[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  
  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9;

  // Sync category param
  useEffect(() => {
    setSelectedCategory(categoryParam);
    setPage(1);
  }, [categoryParam]);

  // Fetch categories
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await axiosClient.get("/public/categories");
        if (res.data?.success && Array.isArray(res.data?.data)) {
          setCategories(res.data.data);
        }
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };
    fetchCats();
  }, []);

  // Fetch listings
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        let catId: number | undefined = undefined;
        if (selectedCategory !== "All") {
          const matched = categories.find(
            (c) => c.name.toLowerCase() === selectedCategory.toLowerCase()
          );
          if (matched) catId = matched.id;
        }

        const res = await axiosClient.get("/public/listings", {
          params: {
            page,
            limit,
            search: searchQuery || undefined,
            category_id: catId,
          },
        });

        if (res.data?.success && Array.isArray(res.data?.data)) {
          setProviders(res.data.data);
          const totalCountHeader = res.headers?.["x-total-count"] || res.headers?.["X-Total-Count"];
          if (totalCountHeader) {
            const totalCount = parseInt(totalCountHeader, 10);
            setTotalPages(Math.ceil(totalCount / limit) || 1);
          } else {
            if (res.data.data.length < limit) {
              setTotalPages(page);
            } else {
              setTotalPages(page + 1);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [selectedCategory, searchQuery, page, categories]);

  const handleCategoryChange = (catName: string) => {
    setSelectedCategory(catName);
    setPage(1);
    router.push(`/user/providers?category=${catName}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cleanAssetUrl = (url: string) => {
    if (!url) return "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400";
    if (url.startsWith("http")) return url;
    const base = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    return `${base.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9fafb", pb: 8 }}>
      
      {/* Banner / Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          py: 6,
          textAlign: "center",
          mb: 5,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, letterSpacing: "-0.5px" }}>
            Our Service Experts
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "rgba(255, 255, 255, 0.8)", fontWeight: 500 }}>
            Find & hire top-rated local professionals for any task
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Search & Filters block */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            mb: 4,
            p: 3,
            bgcolor: "white",
            borderRadius: "16px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)",
            border: "1px solid #f1f1f1",
          }}
        >
          {/* Search bar */}
          <TextField
            fullWidth
            placeholder="Search provider name, description..."
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                bgcolor: "#fafafa",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#9ca3af" }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Category Dropdown */}
          <FormControl sx={{ minWidth: { xs: "100%", md: 240 } }}>
            <Select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              displayEmpty
              sx={{ borderRadius: "12px", bgcolor: "#fafafa" }}
            >
              <MenuItem value="All">All Categories</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.name}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Results grid */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress sx={{ color: "#667eea" }} />
          </Box>
        ) : providers.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" sx={{ color: "#4b5563", fontWeight: 600 }}>
              No service providers found matching your search.
            </Typography>
            <Typography variant="body2" sx={{ color: "#9ca3af", mt: 1 }}>
              Try selecting a different category or clearing search keywords.
            </Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {providers.map((p) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "16px",
                      overflow: "hidden",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.08)",
                      },
                      border: "1px solid #f1f1f1",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="180"
                      image={cleanAssetUrl(p.cover_image_path)}
                      alt={p.business_name}
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 2.5 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                        <Chip
                          label={p.category_name}
                          size="small"
                          sx={{
                            bgcolor: "#eef2ff",
                            color: "#4f46e5",
                            fontWeight: 600,
                            fontSize: "0.75rem",
                          }}
                        />
                        {p.is_verified && (
                          <Chip
                            label="Verified"
                            size="small"
                            color="success"
                            variant="outlined"
                            sx={{ fontWeight: 600, fontSize: "0.7rem", height: 20 }}
                          />
                        )}
                      </Box>

                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#111827", lineHeight: 1.3 }}>
                        {p.business_name}
                      </Typography>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1.5 }}>
                        <Rating value={p.rating || 4.5} precision={0.1} readOnly size="small" />
                        <Typography variant="caption" sx={{ fontWeight: 700, color: "#4b5563" }}>
                          {(p.rating || 4.5).toFixed(1)}
                        </Typography>
                      </Box>

                      <Typography variant="body2" sx={{ color: "#6b7280", mb: 2, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", flexGrow: 1 }}>
                        📍 {p.address || "Hyderabad"}
                      </Typography>

                      <Box sx={{ display: "flex", gap: 1.5, mt: "auto" }}>
                        <Button
                          fullWidth
                          variant="outlined"
                          size="small"
                          href={`tel:${p.phone || "8234567890"}`}
                          sx={{ textTransform: "none", borderRadius: "8px", fontWeight: 600 }}
                        >
                          Call
                        </Button>
                        <Button
                          fullWidth
                          variant="contained"
                          size="small"
                          onClick={() => router.push(`/providers/${p.provider_id}`)}
                          sx={{
                            textTransform: "none",
                            borderRadius: "8px",
                            fontWeight: 600,
                            bgcolor: "#667eea",
                            "&:hover": { bgcolor: "#5568d3" },
                          }}
                        >
                          View Details
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Pagination Controls */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                sx={{
                  "& .MuiPaginationItem-root": {
                    fontWeight: 600,
                    borderRadius: "8px",
                  },
                }}
              />
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}

export default function UserProvidersPage() {
  return (
    <Suspense fallback={
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress sx={{ color: "#667eea" }} />
      </Box>
    }>
      <ProvidersContent />
    </Suspense>
  );
}
