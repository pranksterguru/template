import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import properties from '../properties';


const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isDemo = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('demo') === 'true';
  }, [location.search]);
const { demoValues } = properties;


  const [form, setForm] = useState({
    username: isDemo ? demoValues.username : '',
    password: isDemo ? demoValues.password : '',
    account: isDemo ? demoValues.account : '',
    role: isDemo ? demoValues.role : '',
  });

  const [error, setError] = useState('');

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

const handleLogin = async () => {
  try {
    // const res = await fetch(properties.api_login, {
    //   method: 'POST',
    //   headers: {
    //     'username': form.username,
    //     'password': form.password
    //   }
    // });

    // const result = await res.json();
    // if (result.status === 'success') {
      if (1 == 1) {
      sessionStorage.setItem('username', form.username);
      sessionStorage.setItem('password', form.password);
      sessionStorage.setItem('account', form.account);
      sessionStorage.setItem('role', form.role);

      navigate('/dashboard');
    } else {
      setError('Login failed. Please check your credentials.');
    }
  } catch (err) {
    setError('Unable to connect to login service.');
  }
};

  return (
    <Box>
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 400,
          mx: 'auto',
          mt: 8,
          p: 4,
          borderRadius: 'md',
          boxShadow: 'sm',
        }}
      >
        <Typography level="h4" sx={{ mb: 2, textAlign: 'center', color: 'primary.900' }}>
          AI-Mind Login
        </Typography>
        <Stack spacing={2}>
          <Input placeholder="AWS User Name" name="username" value={form.username} onChange={handleChange('username')} />
          <Input placeholder="AWS Password" type="password" name="password" value={form.password} onChange={handleChange('password')} />
          <Input placeholder="AWS Account" name="account" value={form.account} onChange={handleChange('account')} />
          <Input placeholder="AWS Role" name="role" value={form.role} onChange={handleChange('role')} />
          {error && (
            <Typography level="body-sm" sx={{ color: 'danger.600' }}>
              {error}
            </Typography>
          )}
          <Button variant="solid" color="primary" onClick={handleLogin}>
            Sign In
          </Button>
        </Stack>
      </Sheet>
    </Box>
  );
};

export default LoginPage;
