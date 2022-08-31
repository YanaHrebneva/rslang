import {
  Button, Container, Grid, Pagination, Stack,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CardsBook from './CardsBook';
import useAuth from '../../hooks/useAuth';
import UserApi from '../../services/UserApi';
import noUserApi from '../../services/noUserApi';

export default function BookPage() {
  const [words, setWords] = useState([]);
  const [page, setPage] = useState(1);
  const [state, setToggleState] = useState(false);
  const [groups, setGroups] = useState(1);
  const { user } = useAuth();
  const filters = {
    filtersHard: { $and: [{ 'userWord.difficulty': 'hard' }] },
    filtersPageGroup: { $and: [{ page: page - 1, group: groups - 1 }] },
  };

  const toggleState = () => {
    setToggleState(!state);
  };

  useEffect(() => {
    if (user) {
      UserApi.getUserAggregatedWords(user.userId || user.id, 20, filters.filtersPageGroup)
        .then(({ data }) => {
          const { paginatedResults } = data[0];
          setWords(paginatedResults);
        });
      return;
    }
    noUserApi.getWords(groups, page).then(({ data }) => setWords(data));
  }, [page, groups, state]);

  useEffect(() => {
    if (groups === 7) {
      UserApi.getUserAggregatedWords(user.id, 40, filters.filtersHard)
        .then((resHardWords) => setWords(resHardWords.data[0].paginatedResults));
    }
  }, [groups === 7, state]);

  return (
    <Container>
      <Button onClick={() => { setGroups(1); setPage(1); }} variant="contained">group 1</Button>
      <Button onClick={() => { setGroups(2); setPage(1); }} variant="contained">group 2</Button>
      <Button onClick={() => { setGroups(3); setPage(1); }} variant="contained">group 3</Button>
      <Button onClick={() => { setGroups(4); setPage(1); }} variant="contained">group 4</Button>
      <Button onClick={() => { setGroups(5); setPage(1); }} variant="contained">group 5</Button>
      <Button onClick={() => { setGroups(6); setPage(1); }} variant="contained">group 6</Button>
      <Button onClick={() => { setGroups(7); }} disabled={!user} variant="contained">Hard words</Button>
      <Stack spacing={2}>
        {!!words && (
        <Pagination
          count={words.length !== 20 ? 1 : 30}
          size="large"
          page={page}
          onChange={(_, num) => setPage(num)}
          showLastButton
          showFirstButton
          sx={{ marginY: 3, marginX: 'auto' }}
        />
        )}
        <Container maxWidth="lg">
          <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
            <CardsBook groups={groups} toggleState={toggleState} user={user} words={words} />
          </Grid>
        </Container>

      </Stack>
    </Container>
  );
}
