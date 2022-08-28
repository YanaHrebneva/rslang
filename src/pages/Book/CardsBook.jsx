import { Grid } from '@mui/material';
import React from 'react';
import CardBook from './CardBook';

export default function CardsBook({ words, hasUser }) {
  return (
    words.map((word) => (
      <Grid item xs={2} sm={4} md={4} key={word.id}>
        <CardBook hasUser={hasUser} {...word} />
      </Grid>
    ))
  );
}
