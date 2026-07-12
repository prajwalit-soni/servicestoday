'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AuthGraphics from './components/AuthGraphics';
import AuthLogo from './components/AuthLogo';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        width: '100%', 
        backgroundColor: '#E2D9F3', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        p: 2,
        fontFamily: 'sans-serif'
      }}
    >
      {/* Back Button Outside Card */}
      <Box 
        onClick={handleBack}
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          cursor: 'pointer', 
          alignSelf: 'center',
          width: '100%',
          maxWidth: '960px',
          mb: 2, 
          color: '#5B21B6', // Beautiful purple color to match layout
          transition: 'color 0.2s',
          '&:hover': { color: '#4C1D95' }
        }}
      >
        <ArrowBackIcon sx={{ fontSize: '20px', mr: 0.5 }} />
        <Typography sx={{ fontSize: '15px', fontWeight: 600 }}>
          Back
        </Typography>
      </Box>

      {/* Main Card Wrapper */}
      <Box 
        sx={{ 
          width: '100%', 
          maxWidth: '960px', 
          backgroundColor: 'white', 
          borderRadius: '32px', 
          p: 3, 
          boxShadow: '0px 20px 40px rgba(0,0,0,0.08)', 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: 4, 
          alignItems: 'stretch',
          minHeight: '580px'
        }}
      >
        
        {/* Left Side: 3D Graphics Container */}
        <AuthGraphics />

        {/* Right Side: Form Content */}
        <Box 
          sx={{ 
            width: { xs: '100%', md: '50%' }, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            px: { xs: 2, md: 6 }, 
            py: 3 
          }}
        >
          <AuthLogo />
          {children}
        </Box>
      </Box>
    </Box>
  );
}
