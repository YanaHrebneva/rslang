import React from 'react';
import './style.scss';
import { TextField, Button, Box } from '@mui/material';

export default function Login() {
  return (
    <Box component="form">
      <TextField type="text" />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>
    </Box>

  );
}
