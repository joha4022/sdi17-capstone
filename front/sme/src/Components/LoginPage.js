import { Home } from '../Styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import {TextField, Button, IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FooterBar from './FooterBar';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Home>Navigator Bar: Home</Home>
      <div className='blue-section'>
      <div className='login-section'>
        <div className='signin-section'>
          <div className='username-wrapper'>
            <TextField className='username-input' id='outlined-required' label='Username'></TextField>
          </div>
          <div className='password-wrapper'>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
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
          <Button className='loginpage-button' size='large' variant="contained">Sign In</Button>
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
      </div>
      <FooterBar />
    </>
  )
}