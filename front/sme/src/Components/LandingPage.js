import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import { Button } from '@mui/material';
import FooterBar from './FooterBar';

export default function LandingPage() { 
  const navigate = useNavigate();

  return (
    <>
      <div className='blue-section'>
        <div className='logo-section'>
          <img id='landingpage-logo' alt='login-logo' src='../images/SME-logos_transparent.png'></img>
          <div className='thankyou-section'>
            <h1 className='register-landing-h1'>Thank you</h1>
            <div className='register-landing-message'>Your account will be reviewed by the administrator and you will receive a notification email once your account has been approved.</div>
            <div className='register-landing-button'>
              <Button sx={{color: '#A3816A'}} className='loginpage-button' size='large' variant="contained" onClick={()=>{navigate('/', {replace: true})}}>Return Home</Button>
            </div>
          </div>
        </div>
      </div>
      <div className='sponsor-section'>
        <img alt='fake-sponsor' src='../images/fake-sponsors/navy.svg' className='fake-sponsor-img'></img>
        <img alt='fake-sponsor' src='../images/fake-sponsors/spaceforce.png' className='fake-sponsor-img'></img>
        <img alt='fake-sponsor' src='../images/fake-sponsors/usairforce.svg' className='fake-sponsor-img'></img>
        <img alt='fake-sponsor' src='../images/fake-sponsors/usarmy.svg' className='fake-sponsor-img'></img>
        <img alt='fake-sponsor' src='../images/fake-sponsors/usmarine.svg' className='fake-sponsor-img'></img>
        <img alt='fake-sponsor' src='../images/fake-sponsors/coastguard.png' className='fake-sponsor-img'></img>
        <img alt='fake-sponsor' src='../images/fake-sponsors/nationalguard.png' className='fake-sponsor-img'></img>
      </div>
      <FooterBar />
    </>
  )
}