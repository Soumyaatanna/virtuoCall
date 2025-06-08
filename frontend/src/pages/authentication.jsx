import * as React from 'react';
import {
  Avatar, Button, CssBaseline, TextField, Paper,
  Box, Grid, Typography, Snackbar
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';

const theme = createTheme();

export default function Authentication() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [formState, setFormState] = React.useState(0); // 0: login, 1: register
  const [open, setOpen] = React.useState(false);
  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  const handleAuth = async () => {
    try {
      if (formState === 0) {
        await handleLogin(username, password);
      } else {
        const result = await handleRegister(name, username, password);
        setUsername('');
        setPassword('');
        setFormState(0);
        setMessage(result);
        setOpen(true);
        setError('');
      }
    } catch (err) {
      const message = err?.response?.data?.message || 'Something went wrong';
      setError(message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
        backgroundImage: 'url("https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        {/* Black overlay */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          bgcolor: 'rgba(0,0,0,0.6)',
          zIndex: 1,
        }} />

        {/* Form Content */}
        <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%', position: 'relative', zIndex: 2 }}>
          <CssBaseline />
          <Paper elevation={6} sx={{
            padding: 4,
            width: { xs: '90%', sm: '70%', md: '400px' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 2
          }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>

            <Box display="flex" gap={1} mb={2}>
              <Button variant={formState === 0 ? "contained" : "outlined"} onClick={() => setFormState(0)}>
                Sign In
              </Button>
              <Button variant={formState === 1 ? "contained" : "outlined"} onClick={() => setFormState(1)}>
                Sign Up
              </Button>
            </Box>

            <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
              {formState === 1 && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <Typography color="error" variant="body2">{error}</Typography>}

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleAuth}
              >
                {formState === 0 ? "Login" : "Register"}
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={() => setOpen(false)}
          message={message}
        />
      </Box>
    </ThemeProvider>
  );
}
