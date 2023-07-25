import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { TextField, Button, IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl, Alert, Collapse, AlertTitle, Backdrop, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FooterBar from './FooterBar';
import Navbar from './Navbar';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [message, setMessage] = useState(false);
  const [username, setUsername] = useState(false);
  const [password, setPassword] = useState(false);

  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const usernameInput = (value) => {
    setUsername(value.toLowerCase());
  }

  const passwordInput = (value, key) => {
    setPassword(value);
    if(key === 'Enter') {
      signin();
    }
  }

  const alertDisplay = (message) => {
      setMessage(message);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000)
    

  }

  const signin = () => {
    const body = JSON.stringify({
      user: username,
      pw: password
    })
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    }
    fetch('http://localhost:3001/login/', option)
      .then(res => res.json())
      .then(data => {
        if(data.code === 404) {
          alertDisplay(data.message)
        } else if(data.code === 500) {
          alertDisplay(data.message)
        } else if(data.length === 1) {
          sessionStorage.setItem('userid', data[0].userid);
          setBackdrop(true);
          setTimeout(() => {
            setBackdrop(false);
            navigate(`profile/${data[0].userid}`);
          }, 2000)
        }
      })
  }

  return (
    <>
      <Collapse in={alert}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Login Error — <strong>{message}</strong>
        </Alert>
      </Collapse>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Navbar />
      <div className='blue-section'>
        <div className='login-section'>
          <div className='signin-section'>
            <div className='username-wrapper'>
              <TextField className='username-input' id='outlined-required' label='Username'
                onKeyUp={(e) => usernameInput(e.target.value)}
              ></TextField>
            </div>
            <div className='password-wrapper'>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  onKeyUp={(e) => passwordInput(e.target.value, e.key)}
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </div>
            <Button className='loginpage-button' size='large' variant="contained"
              onClick={() => {
                signin();
              }}
            >Sign In</Button>
          </div>
          <div className='or-section'>OR</div>
          <div className='create-account-section'>
            <Button className='loginpage-button' size='large' variant='contained' onClick={() => {
              navigate('/register')
            }}>Register</Button>
          </div>
        </div>
        <div className='logo-section'>
          <img id='loginpage-logo' alt='login-logo' src='./images/SME-logos_transparent.png'></img>
          <div className='reviews-section'>
            <h2 className='sme-h2'>Creating Solutions Together</h2>
            <p className='p1'>SME: Subject Matter Expert Military Enabler</p>
            <p className='p1'>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
          </div>
        </div>
      </div>
      <div className='sponsor-section'>
        <img alt='fake-sponsor' src='./images/fake-sponsors/navy.svg' className='fake-sponsor-img'></img>
        <img alt='fake-sponsor' src='./images/fake-sponsors/spaceforce.png' className='fake-sponsor-img'></img>
        <img alt='fake-sponsor' src='./images/fake-sponsors/usairforce.svg' className='fake-sponsor-img'></img>
        <img alt='fake-sponsor' src='./images/fake-sponsors/usarmy.svg' className='fake-sponsor-img'></img>
        <img alt='fake-sponsor' src='./images/fake-sponsors/usmarine.svg' className='fake-sponsor-img'></img>
        <img alt='fake-sponsor' src='./images/fake-sponsors/coastguard.png' className='fake-sponsor-img'></img>
        <img alt='fake-sponsor' src='./images/fake-sponsors/nationalguard.png' className='fake-sponsor-img'></img>
      </div>
      <FooterBar />
    </>
  )
}