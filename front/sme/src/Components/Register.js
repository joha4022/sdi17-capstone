import './Register.css'
import { Home } from '../Styled';
import React, { useState } from 'react';
import { TextField, IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl, Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FooterBar from './FooterBar';
import Navbar from './Navbar';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState(false);
  const [username, setUsername] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [password2, setPassword2] = useState(false);
  const [supEmail, setSupEmail] = useState(false);
  const [appEmail, setAppEmail] = useState(false);
  const [base, setBase] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const register = () => {
    console.log('registering')
  }

  return (
    <>
      <Navbar />
      <div className='top-section'>
        <div className="register-section">
          <div className='register-title'>
            <img id='registration-logo' alt='login-logo' src='./images/SME-logos_transparent.png'></img>
            <h1 className='register-h1'>Registration</h1>
          </div>
          <table>
            <tr className='register-row'>
              <td>
                <div className='register-category'>First Name</div>
                <TextField required id="outlined-basic" label="First Name" variant="outlined" />
              </td>
              <td>
                <div className='register-category'>Last Name</div>
                <TextField required id="outlined-basic" label="Last Name" variant="outlined" />
              </td>
            </tr>
            <tr className='register-row'>
              <td>
                <div className='register-category'>Username</div>
                <TextField required id="outlined-basic" label="Username" variant="outlined" />
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
                  <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
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
                    label="Confirm Password"
                  />
                </FormControl>
              </td>
            </tr>
            <tr className='register-row'>
              <td>
                <div className='register-category'>E-mail</div>
                <TextField required id="outlined-basic" label="E-mail" variant="outlined" />
              </td>
              <td>
                <div className='register-category'>Phone Number</div>
                <TextField required id="outlined-basic" label="Phone Number" variant="outlined" />
              </td>
            </tr>
            <tr className='register-row'>
              <td>
                <div className='register-category'>Supervisor's E-mail</div>
                <TextField required id="outlined-basic" label="Supervisor's E-mail" variant="outlined" />
              </td>
              <td>
                <div className='register-category'>Approver's E-mail</div>
                <TextField required id="outlined-basic" label="Approver's E-mail" variant="outlined" />
              </td>
            </tr>
            <tr className='register-row'>
              {/* list out bases from the database */}
              <td>
                <div className='register-category'>Base</div>
                <Button className='loginpage-button' size='large' variant='contained' onClick={() => {
                  register();
                }}>Add Base *</Button>
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
        <img alt='fake-sponsor' src='./images/fake-sponsors/coastguard.png' className='fake-sponsor-img'></img>
        <img alt='fake-sponsor' src='./images/fake-sponsors/nationalguard.png' className='fake-sponsor-img'></img>
      </div>
      <FooterBar />
    </>
  )
}