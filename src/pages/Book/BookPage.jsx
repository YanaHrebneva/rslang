import {
  Button, Container, Grid, Pagination, Stack,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CardsBook from './CardsBook';
import useAuth from '../../hooks/useAuth';
import UserApi from '../../services/GetUserWords';

export default function BookPage() {
  const [words, setWords] = useState([]);
  const [page, setPage] = useState(1);
  const [groups, setGroups] = useState(1);
  const [pageQty, setPageQty] = useState(0);
  const baseUrl = 'https://rslang-yanahrebneva.herokuapp.com/words?';

  const { user } = useAuth();
  const hasUser = !!user;

  // WordService.addWordToUser(wordId, user.userId)
  UserApi.getUserWords();
  useEffect(() => {
    axios.get(`${baseUrl}group=${groups - 1}&page=${page - 1}`).then(({ data }) => {
      const allWords = data;
      setWords(allWords);
      const pageQtyLength = allWords.length;
      setPageQty(pageQtyLength);
    }).catch((error) => error.message);
  }, [page, groups]);

  return (
    <Container>
      <Button onClick={() => { setGroups(1); setPage(1); }} variant="contained">group 1</Button>
      <Button onClick={() => { setGroups(2); setPage(1); }} variant="contained">group 2</Button>
      <Button onClick={() => { setGroups(3); setPage(1); }} variant="contained">group 3</Button>
      <Button onClick={() => { setGroups(4); setPage(1); }} variant="contained">group 4</Button>
      <Button onClick={() => { setGroups(5); setPage(1); }} variant="contained">group 5</Button>
      <Button onClick={() => { setGroups(6); setPage(1); }} variant="contained">group 6</Button>

      <Stack spacing={2}>
        {!!pageQty && (
          <Pagination
            count={30}
            page={page}
            onChange={(_, num) => setPage(num)}
            showLastButton
            showFirstButton
            sx={{ marginY: 3, marginX: 'auto' }}
          />
        )}
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {console.log(hasUser) }
          <CardsBook hasUser={hasUser} words={words} />
        </Grid>
      </Stack>
    </Container>
  );
}
