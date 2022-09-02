import React from 'react';
import { Grid, Typography, Button } from '@mui/material';

export default function LevelPick({ title, description, onSelect }) {
  return (
    <>
      <Typography variant="h3" mt={10}>
        {title}
      </Typography>
      <Typography variant="subtitle1" mt={6}>
        {description}
      </Typography>
      <Typography variant="h4" mt={16}>
        Выберите уровень
      </Typography>
      <Grid container mt={6} justifyContent="center" spacing={2}>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <Grid item key={n}>
            <Button variant="outlined" onClick={() => onSelect(n)}>
              {n}
            </Button>
          </Grid>
        ))}
      </Grid>
    </>

  );
}
