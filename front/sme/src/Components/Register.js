import './Register.css'
import { Home } from '../Styled';
import React, { useState } from 'react';
import { TextField, IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl, Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FooterBar from './FooterBar';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const register = () => {
    console.log('registering')
  }

  return (
    <>
      <Home>Navigator Bar: Home</Home>
      <div className='top-section'>
        <div className="register-section">
          <div className='register-title'>
            <img id='registration-logo' alt='login-logo' src='./images/SME-logos_transparent.png'></img>
            <h1 className='register-h1'>Registration</h1>
          </div>
          <table>
            <tr className='register-row'>
              <td>
                <div className='register-category'>Full Name</div>
                <TextField id="outlined-basic" label="Full Name" variant="outlined" />
              </td>
              <td>
                <div className='register-category'>Username</div>
                <TextField id="outlined-basic" label="Username" variant="outlined" />
              </td>
            </tr>
            <tr className='register-row'>
              <td>
                <div className='register-category'>Email</div>
                <TextField id="outlined-basic" label="Email" variant="outlined" />
              </td>
              <td>
                <div className='register-category'>Phone Number</div>
                <TextField id="outlined-basic" label="Phone Number" variant="outlined" />
              </td>
            </tr>
            <tr className='register-row'>
              <td>
                <div className='register-category'>Password</div>
                <FormControl sx={{ width: '28ch' }} variant="outlined">
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
              </td>
              <td>
                <div className='register-category'>Confirm Password</div>
                <FormControl sx={{ width: '28ch' }} variant="outlined">
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
              </td>
            </tr>
            <tr className='register-row'> 
              <td>
                <div className='register-category'>Approver Email</div>
                <TextField id="outlined-basic" label="Approver Email" variant="outlined" />
              </td>
            </tr>
          </table>
          <div className='register-button-row'>
          <Button className='loginpage-button' size='large' variant='contained' onClick={() => {
            register();
          }}>Register</Button>
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