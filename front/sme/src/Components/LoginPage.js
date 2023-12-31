import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { TextField, Button, IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl, Alert, Collapse, AlertTitle, Backdrop, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FooterBar from './FooterBar';
import Navbar from './Navbar';
import { AppContext } from '../App';

export default function LoginPage() {
  const {setCurrentUser} = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(false);
  // const [alert2, setAlert2] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [message, setMessage] = useState(false);
  const [username, setUsername] = useState(false);
  const [password, setPassword] = useState(false);
  const [usernameList, setUsernameList] = useState([]);

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
      }, 2500)
  }

  const signin = () => {
    if(!usernameList.includes(username)) {
      return alertDisplay('Username does not exist, please register for an account.')
    }
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
          if(data[0].userverified === 'pending' && data[0].sme === true) {
            return (alertDisplay('Your account is not verified. Please contact your supervisor for approval.'))
          }
          if(data[0].userverified === 'declined' && data[0].sme === true) {
            return (alertDisplay('Your account has been declined. Please contact your supervisor.'))
          }
          sessionStorage.setItem('currentUser', JSON.stringify({userid: data[0].userid}));
          sessionStorage.setItem('loggedInUser', JSON.stringify(data[0]));
          setCurrentUser(data[0]);
          setBackdrop(true);
          setTimeout(() => {
            setBackdrop(false);
            navigate(`profile/${data[0].userid}`);
          }, 2500)
        }
      })
  }

  useEffect(()=>{
    fetch('http://localhost:3001/getusers')
    .then(res=>res.json())
    .then(data=>{
      const users = [...usernameList];
      data.map(user=> {
        users.push(user.username);
      })
      setUsernameList(users);
    })
  },[])

  return (
    <>
      <Collapse in={alert} sx={{position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999}}>
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
              sx={{backgroundColor: '#F8F1F1', color: '#5A5A5A', ":hover" : {backgroundColor: '#F8F1F1'}}} 
            >Sign In</Button>
          </div>
          <div className='or-section'>OR</div>
          <div className='create-account-section'>
            <Button className='loginpage-button' size='large' variant='contained' onClick={() => {
              navigate('/register')
            }}
              sx={{backgroundColor: '#A3816A', color: 'white', ":hover" : {backgroundColor: '#A3816A'}}} 
            >Register</Button>
          </div>
        </div>
        <div className='logo-section'>
          <img id='loginpage-logo' alt='login-logo' src='./images/SME-logos_transparent.png'></img>
          <div className='reviews-section'>
            <h2 className='sme-h2'>Creating Solutions Together</h2>
            <p className='p1'>SME: Subject Matter Expert Military Enabler</p>
            <p className='p1'>SME is an exclusive professional networking platform designed to bridge the gap between the military, defense industry, and civilian sectors.This platform serves as a hub for professionals, veterans, defense contractors, and government agencies.</p>
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