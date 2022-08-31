import { Grid } from '@mui/material';
import React from 'react';
import CardBook from './CardBook';

export default function CardsBook({ words, user, toggleState }) {
  return (
    words.map((word) => {
      // eslint-disable-next-line no-underscore-dangle
      const wordWithId = { ...word, id: (word.id || word._id) };

      return (
        <Grid item xs={2} sm={4} md={4} key={wordWithId.id}>
          <CardBook toggleState={toggleState} user={user} {...wordWithId} />
        </Grid>
      );
    })
  );
}
