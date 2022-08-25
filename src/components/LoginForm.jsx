import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate, Link } from 'react-router-dom';
import UserService from '../services/UserService';
import { isValidEmail } from '../utils/validator';
import errorMessages from '../constants/errorMessages';

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!isValidEmail(data.get('email'))) {
      return setErrorMessage(errorMessages.INVALID_EMAIL);
    }

    const result = await UserService.login(data.get('email'), data.get('password'));
    if (result.successful) {
      localStorage.setItem('auth-token', result.data.token);
      localStorage.setItem('refresh-token', result.data.refreshToken);
      navigate('/home');
    } else {
      switch (result.code) {
        case 403:
          setErrorMessage(errorMessages.INCORRECT_CREDENTIALS);
          break;
        case 404:
          setErrorMessage(errorMessages.USER_NOT_FOUND);
          break;
        default:
          setErrorMessage(errorMessages.SERVER_ERROR);
      }
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 5,
          padding: 2,
          borderRadius: 3,
        }}
      >
        <Typography component="h1" variant="h5" color="primary">
          Вход в аккаунт
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Typography variant="error">
            {errorMessage}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="secondary"
          >
            Войти
          </Button>

          <Link to="/registration" className="link">
            Нет аккаунта? Регистрация
          </Link>

        </Box>
      </Box>
    </Container>
  );
}
