import React from 'react';
import './style.scss';
import { Grid, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import LoginForm from '../../components/LoginForm';
import { mainTheme } from '../../utils/theme';

export default function Login() {
  return (
    <ThemeProvider theme={mainTheme}>

      <Grid
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={7}>
          <Box
            component="img"
            sx={{
              maxWidth: { xs: 550, md: 450 },
            }}
            src="/assets/images/login-img.jpg"
            alt="tet"
          />
          <Typography variant="h2">
            Изучать слова удобнее, если у вас есть профиль
            {/* Продолжай свое путешествие в мире английского языка вместе с нами! */}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <LoginForm />
        </Grid>
      </Grid>
    </ThemeProvider>

  );
}
