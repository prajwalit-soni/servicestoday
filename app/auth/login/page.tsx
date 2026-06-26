'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  IconButton,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff, Google } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/useAuthStore';

// Validation Schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    // .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export default function Login() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const [showPassword, setShowPassword] = useState(false);

  // Formik Configuration
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const result = await login(values.email, values.password);
      if (result.success) {
        toast.success('Logged in successfully');
        if (result.role === 'admin') {
          router.push('/admin');
        } else if (result.role === 'vendor' || result.role === 'partner') {
          router.push('/vendor');
        } else {
          // Dynamic redirect for user role: stay on the current page or go back
          const searchParams = new URLSearchParams(window.location.search);
          const redirectParam = searchParams.get('redirect');

          if (redirectParam) {
            router.push(redirectParam);
          } else {
            const referrer = typeof document !== 'undefined' ? document.referrer : '';
            if (referrer && referrer.includes(window.location.host) && !referrer.includes('/auth/')) {
              try {
                const url = new URL(referrer);
                router.push(url.pathname + url.search);
              } catch (e) {
                router.push('/');
              }
            } else {
              router.push('/');
            }
          }
        }
      } else {
        toast.error(result.error || 'Invalid credentials');
      }
    },
  });

  return (
    <>
      {/* Heading */}
      <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#111827', mb: 0.5 }}>
          Welcome Back!
        </Typography>
        <Typography variant="caption" sx={{ color: '#9CA3AF', fontWeight: 500 }}>
          Enter Your Details Below
        </Typography>
      </Box>

      {/* Input Fields */}
      <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          placeholder="Example@gmail.com"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{ mb: 3, '& .MuiInputLabel-root': { color: '#9CA3AF', fontWeight: 600, fontSize: '14px' } }}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          id="password"
          placeholder="At least 8 characters"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Visibility sx={{ fontSize: 18, color: '#9CA3AF' }} /> : <VisibilityOff sx={{ fontSize: 18, color: '#9CA3AF' }} />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2, '& .MuiInputLabel-root': { color: '#9CA3AF', fontWeight: 600, fontSize: '14px' } }}
        />

        {/* Options Row */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <FormControlLabel
            control={
              <Checkbox
                name="remember"
                checked={formik.values.remember}
                onChange={formik.handleChange}
                sx={{ color: '#D1D5DB', '&.Mui-checked': { color: 'black' } }}
              />
            }
            label={<Typography sx={{ fontSize: '12px', fontWeight: 500, color: '#6B7280' }}>Remember me</Typography>}
            sx={{ flexGrow: 1 }}
          />
          <Link href="/auth/forgot-password" underline="none" sx={{ fontSize: '12px', color: '#D1D5DB', '&:hover': { color: '#9CA3AF' } }}>
            Forgot password?
          </Link>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading || formik.isSubmitting}
            sx={{
              backgroundColor: '#1A1A1A',
              color: 'white',
              py: 1.5,
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '14px',
              boxShadow: 'none',
              '&:hover': { backgroundColor: 'black', boxShadow: 'none' }
            }}
          >
            {(isLoading || formik.isSubmitting) ? <CircularProgress size={20} color="inherit" /> : "Log in"}
          </Button>

          {/* <Button
            type="button"
            fullWidth
            variant="contained"
            startIcon={<Google sx={{ color: '#4285F4' }} />}
            sx={{
              backgroundColor: '#F3F4F6',
              color: '#374151',
              py: 1.5,
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '14px',
              boxShadow: 'none',
              '&:hover': { backgroundColor: '#E5E7EB', boxShadow: 'none' }
            }}
          >
            Log in with Google
          </Button> */}
        </Box>
      </Box>

      {/* Footer Text */}
      <Typography variant="body2" sx={{ textAlign: 'center', color: '#9CA3AF', mt: 5, fontSize: '12px', fontWeight: 500 }}>
        Don't have an account?{' '}
        <Link href="/auth/signup" underline="none" sx={{ color: 'black', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}>
          Sign up for free
        </Link>
      </Typography>
    </>
  );
}
