import {
  Container, Grid, Pagination, Stack, ThemeProvider,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
// import styles from './bookPage.module.css';

import CardsBook from './CardsBook';
import useAuth from '../../hooks/useAuth';
import UserApi from '../../services/UserApi';
import noUserApi from '../../services/noUserApi';
import ButtonsNavGroups from './ButtonsNavGroups';
import { mainTheme } from '../../utils/theme';
import GameMenu from './GameMenu';

export default function BookPage() {
  const [words, setWords] = useState([]);
  const [page, setPage] = useState((() => (JSON.parse(localStorage.getItem('userSessionPageGroup')) ? JSON.parse(localStorage.getItem('userSessionPageGroup'))[1] : 1)));
  const [state, setToggleState] = useState(false);
  const [groups, setGroups] = useState(() => (JSON.parse(localStorage.getItem('userSessionPageGroup')) ? JSON.parse(localStorage.getItem('userSessionPageGroup'))[0] : 1));
  const { user } = useAuth();

  const userId = user?.userId || user?.id;
  const filters = {
    filtersHard: { $and: [{ 'userWord.difficulty': 'hard' }] },
    filtersPageGroup: { $and: [{ page: page - 1, group: groups - 1 }] },
  };

  const stateDifficultyWords = () => words.every((word) => word?.userWord?.difficulty);
  const toggleState = () => setToggleState(!state);

  useEffect(() => localStorage.setItem('userSessionPageGroup', JSON.stringify([groups, page])), [page, groups]);

  useEffect(() => {
    if (user) {
      UserApi.getUserAggregatedWords(userId, 20, filters.filtersPageGroup)
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
      UserApi.getUserAggregatedWords(userId, 40, filters.filtersHard)
        .then((resHardWords) => setWords(resHardWords.data[0].paginatedResults));
    }
  }, [groups === 7, state]);

  return (
    <ThemeProvider theme={mainTheme}>
      <Container sx={{ padding: '50px' }} style={stateDifficultyWords() ? { boxShadow: '-2px -7px 88px 2px rgba(219, 7, 244, 0.2)' } : { backgroundColor: 'transparent' }}>
        <ButtonsNavGroups user={userId} groups={groups} setGroups={setGroups} setPage={setPage} />
        <GameMenu page={page} groups={groups} />
        <Stack spacing={2}>
          {!!words && (
          <Pagination
            count={groups === 7 ? 1 : 30}
            color={stateDifficultyWords() ? 'primary' : 'secondary'}
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
              <CardsBook
                groups={groups}
                toggleState={toggleState}
                userId={userId}
                words={words}
              />
            </Grid>
          </Container>
        </Stack>
      </Container>
    </ThemeProvider>

  );
}
