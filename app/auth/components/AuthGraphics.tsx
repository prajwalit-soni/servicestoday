import React from 'react';
import { Box } from '@mui/material';

export default function AuthGraphics() {
  return (
    <Box 
      sx={{ 
        width: { xs: '100%', md: '50%' }, 
        position: 'relative', 
        backgroundColor: '#F3F4F6', 
        borderRadius: '24px', 
        overflow: 'hidden', 
        display: { xs: 'none', md: 'flex' }, 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: { xs: '350px', md: 'auto' }
      }}
    >
      {/* Main Character */}
      <Box 
        sx={{ 
          position: 'absolute', 
          zIndex: 2, 
          width: 176, 
          height: 176, 
          background: 'linear-gradient(to top right, #c084fc, #818cf8)', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          boxShadow: 3
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '12px solid #e9d5ff', opacity: 0.6, filter: 'blur(2px)' }} />
      </Box>

      {/* Background Floating 3D Shapes */}
      <Box sx={{ position: 'absolute', top: '24px', left: '48px', width: 128, height: 128, borderRadius: '50%', background: 'radial-gradient(circle at top, #fef08a, #f59e0b, #b45309)' }} />
      <Box sx={{ position: 'absolute', top: '40px', right: '32px', width: 160, height: 160, borderRadius: '50%', backgroundColor: '#2563eb', opacity: 0.9 }} />
      <Box sx={{ position: 'absolute', bottom: '24px', left: '64px', width: 144, height: 144, borderRadius: '50%', backgroundColor: '#fef08a', transform: 'rotate(12deg)' }} />
      <Box sx={{ position: 'absolute', bottom: '16px', right: '48px', width: 112, height: 112, borderRadius: '50%', backgroundColor: '#a855f7', opacity: 0.7 }} />
    </Box>
  );
}
