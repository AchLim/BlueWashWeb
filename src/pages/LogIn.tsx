import { useState } from 'react';
import { Lock } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { SignIn } from "../axios";
import { useNavigate } from 'react-router-dom';

interface ILoginProp {
  setToken: React.Dispatch<React.SetStateAction<string | null>>
}

const LogIn = ({setToken}: ILoginProp) => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let login = data.get('login')?.toString();
    let password = data.get('password')?.toString();

    const fetchUser = async () => {
        var response = await SignIn({login, password});
        if (response.status == 200) {
          var data = response.data;

          localStorage.setItem('token', data);
          setToken(data);
          navigate('/');
        }
    };

    fetchUser().catch(() => {
      setError(true);
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingInline: 5,
          paddingBlock: 3,
          borderRadius: 3,
        }}
        className="box-soft-shadow"
      >

        {
          error &&
          <Alert variant='outlined' severity='error' sx={{ m: 1 }}>Akun tidak valid.</Alert>
        }
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <Lock />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="login"
            label="Login"
            name="login"
            autoComplete="login"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LogIn;
