'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axiosClient from '../../lib/api';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
});

export default function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const response = await axiosClient.post('/auth/forgot-password', {
          email: values.email,
        });
        toast.success(response.data?.message || 'If this email is registered, you will receive a reset link shortly.');
        setSubmitted(true);
      } catch (err: any) {
        if (err.message === 'Network Error' || !err.response) {
          toast.success('If this email is registered, you will receive a reset link shortly.');
          setSubmitted(true);
        } else {
          toast.error(err.response?.data?.message || err.response?.data?.detail || 'Failed to request password reset link.');
        }
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <>
      <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#111827', mb: 0.5 }}>
          Forgot password?
        </Typography>
        <Typography variant="caption" sx={{ color: '#9CA3AF', fontWeight: 500 }}>
          Enter your email and we&apos;ll send password reset instructions.
        </Typography>
      </Box>

      {submitted ? (
        <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mt: 2 }}>
          <Typography variant="body1" sx={{ color: '#111827', mb: 3, fontWeight: 600 }}>
            Check your inbox.
          </Typography>
          <Typography variant="body2" sx={{ color: '#6B7280', mb: 4 }}>
            If an account exists with that email, you will receive a link to reset your password shortly.
          </Typography>
          <Link href="/auth/login" underline="hover" sx={{ fontSize: '14px', color: '#7C3AED', fontWeight: 600 }}>
            Back to login
          </Link>
        </Box>
      ) : (
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            placeholder="example@gmail.com"
            variant="standard"
            InputLabelProps={{ shrink: true }}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ mb: 3, '& .MuiInputLabel-root': { color: '#9CA3AF', fontWeight: 600, fontSize: '14px' } }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting}
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
            {isSubmitting ? 'Sending...' : 'Send reset link'}
          </Button>

          <Typography variant="body2" sx={{ textAlign: 'center', color: '#9CA3AF', mt: 4, fontSize: '12px', fontWeight: 500 }}>
            Remembered your password?{' '}
            <Link href="/auth/login" underline="none" sx={{ color: 'black', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}>
              Log in
            </Link>
          </Typography>
        </Box>
      )}
    </>
  );
}
