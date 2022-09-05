import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import StatisticsService from '../../services/StatisticsService';

function StatisticPage() {
  const [statistics, setStatistics] = useState(0);
  const { user } = useAuth();
  console.log(statistics);
  useEffect(() => {
    if (user) {
      StatisticsService.getStatistics(user.id)
        .then(({ data }) => {
          const { learnedWords, optional } = data;
          const newStatistics = { learnedWords, ...optional };
          setStatistics(newStatistics);
        });
    }
  }, []);

  return (
    <>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Статистика за сегодня
        </Typography>
        <Stack direction="row" justifyContent="space-around">
          <Box>
            <Typography variant="h2" color="text.primary" component="p">
              {statistics.learnedWords}
            </Typography>
            <Typography variant="h5" color="text.secondary" component="p">
              слов изучено
            </Typography>
          </Box>
          <Box>
            <Typography variant="h2" color="text.primary" component="p">
              {/* { (statistics.learnedWords
              / (statistics.audioCallAll + sprint))*100 }% */}
            </Typography>
            <Typography variant="h5" color="text.secondary" component="p">
              правильных ответов
            </Typography>
          </Box>
        </Stack>

      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container sx={{ display: 'flex', justifyContent: 'center' }} spacing={5} alignItems="flex-center">
          <Grid
            item
            xs={12}
            md={4}
          >
            <Card>
              <CardHeader
                title="Аудиовызов"
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{
                  align: 'center',
                }}
                sx={{
                  backgroundColor: (theme) => (theme.palette.mode === 'light'
                    ? theme.palette.grey[200]
                    : theme.palette.grey[700]),
                }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'baseline',
                    mb: 2,
                  }}
                />
                <ul>
                  <Typography
                    component="li"
                    variant="subtitle1"
                    align="left"
                  >
                    изучено слов :
                    {statistics.audioCallRight}
                  </Typography>
                  <Typography
                    component="li"
                    variant="subtitle1"
                    align="left"
                  >
                    правильных ответов:
                    {statistics.audioCallRight}
                  </Typography>
                  <Typography
                    component="li"
                    variant="subtitle1"
                    align="left"
                  >
                    длинная серия ответов : 0
                  </Typography>

                </ul>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <Card>
              <CardHeader
                title="Cпринт"
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{
                  align: 'center',
                }}
                sx={{
                  backgroundColor: (theme) => (theme.palette.mode === 'light'
                    ? theme.palette.grey[200]
                    : theme.palette.grey[700]),
                }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'baseline',
                    mb: 2,
                  }}
                />
                <ul>
                  <Typography
                    component="li"
                    variant="subtitle1"
                    align="left"
                  >
                    изучено слов :
                  </Typography>
                  <Typography
                    component="li"
                    variant="subtitle1"
                    align="left"
                  >
                    правильных ответов:
                  </Typography>
                  <Typography
                    component="li"
                    variant="subtitle1"
                    align="left"
                  >
                    длинная серия ответов : 0
                  </Typography>
                </ul>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default StatisticPage;
