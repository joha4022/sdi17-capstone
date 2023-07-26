import './Register.css'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl, Button, Collapse, Alert, Typography, AlertTitle, Box, Modal, MenuItem, Backdrop, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FooterBar from './FooterBar';
import Navbar from './Navbar';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  // required options
  const [userid, setUserid] = useState(false);
  const [firstname, setFirstname] = useState(false);
  const [lastname, setLastname] = useState(false);
  const [username, setUsername] = useState(false);
  const [branch, setBranch] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [password2, setPassword2] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(false);
  const [supEmail, setSupEmail] = useState(false);
  const [appEmail, setAppEmail] = useState(false);
  // alertdisplay
  const [message, setMessage] = useState(false);
  const [alert, setAlert] = useState(false);
  // baseForm
  const [baseForm, setBaseForm] = useState(false);
  const [currentBases, setCurrentBases] = useState(false);
  const [existingBaseName, setExistingBaseName] = useState(false);
  const [baseName, setBaseName] = useState(false);
  const [baseCity, setBaseCity] = useState(false);
  const [baseState, setBaseState] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('Add Base *');
  // backdrop
  const [backdrop, setBackdrop] = useState(false);

  const navigate = useNavigate();
  const militaryBranches = ['Army', 'Navy', 'Air Force', 'Marines Corps', 'Space Force', 'Coast Guard', 'National Guard']

  useEffect(() => {
    fetch('http://localhost:3001/base')
      .then(res => res.json())
      .then(data => {
        setCurrentBases(data)
      })
    fetch('http://localhost:3001/')
      .then(res => res.json())
      .then(data => {
        setUserid(data.length + 1)
      })
  }, [])


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const alertDisplay = (message) => {
    setMessage(message);
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 2500)
  }

  const register = () => {
    if (!firstname || !lastname || !username || !email || !password || !password2 || !phoneNumber || !supEmail || !appEmail || !baseName) {
      alertDisplay('Please complete all the required fields!');
    } else if (password !== password2) {
      alertDisplay('Please make sure the passwords match.');
    } else if (!email.includes('@') || !appEmail.includes('@') || !supEmail.includes('@')) {
      alertDisplay('Please include @ and type in an approriate email.')
    } else {
      const body = JSON.stringify({
        userid: userid,
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
        email: email,
        supervisoremail: supEmail,
        approveremail: appEmail,
        phonenumber: phoneNumber,
        branch: branch
      })
      const option = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      }
      // adding a user
      fetch('http://localhost:3001/createuser', option)
        .then(res => res.json())
        .then(data => {
          if (data.code === 404) {
            alertDisplay(data.message)
          } else if (data.code === 500) {
            alertDisplay(data.message)
          } else if (data.code === 201) {
            setBackdrop(true);
            setTimeout(() => {
              setBackdrop(false);
              navigate(`profile/${userid}`);
            }, 2500)
          }
        })
      // adding a new base that has been inputted as it's registering an account
      if (existingBaseName.name === '+ Add a new base') {
        const baseBody = JSON.stringify({
          userid: userid,
          firstname: firstname,
          lastname: lastname,
          username: username,
          password: password,
          email: email,
          supervisoremail: supEmail,
          approveremail: appEmail,
          phonenumber: phoneNumber,
          branch: branch
        })
        const baseOption = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: baseBody
        }
        fetch('http://localhost:3001/createbase', baseOption)
          .then(res => res.json())
          .then(data => {
            if (data.code === 404) {
              alertDisplay(data.message)
            } else if (data.code === 500) {
              alertDisplay(data.message)
            } else if (data.code === 201) {
              setBackdrop(true);
              setTimeout(() => {
                setBackdrop(false);
                navigate(`profile/${userid}`);
              }, 2500)
            }
          })
      }
    }

  }

  const handleOpen = () => setBaseForm(true);
  const handleClose = () => setBaseForm(false);
  const statesArray = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
  };

  const addBase = () => {
    if (existingBaseName.name === '+ Add a new base') {
      if (!baseName || !baseCity || !baseState) {
        alertDisplay('Please complete all the required fields!');
      } else {
        setButtonLabel('Change Base');
        setBaseForm(false);
      }
    } else {
      if (!existingBaseName) {
        alertDisplay('Please complete all the required fields!');
      } else {
        setBaseName(currentBases[existingBaseName.baseid - 1].basename);
        setBaseCity(currentBases[existingBaseName.baseid - 1].basecity);
        setBaseState(currentBases[existingBaseName.baseid - 1].basestate);
        setButtonLabel('Change Base');
        setBaseForm(false);
      }
    }
  }

  if (currentBases) {
    return (
      <>
        <Collapse in={alert} sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}>
          <Alert severity="warning">
            <AlertTitle>Error</AlertTitle>
            Registration Error — <strong>{message}</strong>
          </Alert>
        </Collapse>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Navbar />
        <div className='top-section'>
          <div className="register-section">
            <div className='register-title'>
              <img id='registration-logo' alt='login-logo' src='./images/SME-logos_transparent.png'></img>
              <h1 className='register-h1'>Registration</h1>
            </div>
            <table>
              <tbody>
                <tr className='register-row'>
                  <td>
                    <div className='register-category'>First Name</div>
                    <TextField error={!firstname ? true : false} required sx={{ width: '28ch' }} id="outlined-basic-firstname" label="First Name" variant="outlined" onKeyUp={(e) => { setFirstname(e.target.value) }} />
                  </td>
                  <td>
                    <div className='register-category'>Last Name</div>
                    <TextField error={!lastname ? true : false} required sx={{ width: '28ch' }} id="outlined-basic-lastname" label="Last Name" variant="outlined" onKeyUp={(e) => { setLastname(e.target.value) }} />
                  </td>
                </tr>
                <tr className='register-row'>
                  <td>
                    <div className='register-category'>Branch</div>
                    <TextField error={!branch ? true : false} sx={{ width: '28ch' }} required select id="outlined-select-branch" label="Branch" variant="outlined" defaultValue='' onClick={(e) => { setBranch(e.target.dataset.value) }}>
                      {militaryBranches.map((branch) => (
                        <MenuItem key={branch} value={branch}>
                          {branch}
                        </MenuItem>
                      ))}
                    </TextField>
                  </td>
                </tr>
                <tr className='register-row'>
                  <td>
                    <div className='register-category'>Username</div>
                    <TextField error={!username ? true : false} required sx={{ width: '28ch' }} id="outlined-basic-username" label="Username" variant="outlined" onKeyUp={(e) => {
                      setUsername(e.target.value);
                    }} />
                  </td>
                </tr>
                <tr className='register-row'>
                  <td>
                    <div className='register-category'>Password</div>
                    <FormControl sx={{ width: '28ch' }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                      <OutlinedInput
                        error={!password ? true : false}
                        onKeyUp={(e) => { setPassword(e.target.value) }}
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
                      <InputLabel htmlFor="outlined-adornment-password2">Confirm Password</InputLabel>
                      <OutlinedInput
                        error={password === password2 ? true : false}
                        onKeyUp={(e) => { setPassword2(e.target.value) }}
                        id="outlined-adornment-password2"
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
                    <TextField error={!email ? true : false} required id="outlined-basic-email" sx={{ width: '28ch' }} label="E-mail" variant="outlined" helperText='DoD or Personal E-mail' onKeyUp={(e) => { setEmail(e.target.value) }} />
                  </td>
                  <td>
                    <div className='register-category'>Phone Number</div>
                    <TextField id="outlined-basic-phonenumber" label="Phone Number" variant="outlined" sx={{ width: '28ch' }} helperText='Provide valid 10 digit phone number' onKeyUp={(e) => { setPhoneNumber(e.target.value) }} />
                  </td>
                </tr>
                <tr className='register-row'>
                  <td>
                    <div className='register-category'>Supervisor's E-mail</div>
                    <TextField error={!supEmail ? true : false} required id="outlined-basic-supemail" sx={{ width: '28ch' }} label="Supervisor's E-mail" variant="outlined" onKeyUp={(e) => { setSupEmail(e.target.value) }} />
                  </td>
                  <td>
                    <div className='register-category'>Approver's E-mail</div>
                    <TextField error={!appEmail ? true : false} required id="outlined-basic-appemail" sx={{ width: '28ch' }} label="Approver's E-mail" variant="outlined" onKeyUp={(e) => { setAppEmail(e.target.value) }} />
                  </td>
                </tr>
                <tr className='register-row'>
                  {/* list out bases from the database */}
                  <td>
                    <div className='register-category'>Base</div>
                    <Button className='loginpage-button' size='large' variant='contained' onClick={handleOpen}>{buttonLabel}</Button>
                    <Modal
                      open={baseForm}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h5" component="h2">
                          Add Base
                        </Typography>
                        <table>
                          <tr>
                            <td>
                              <div className='register-category'>Select a Base</div>
                              <TextField error={!existingBaseName ? true : false} required select id="outlined-select-base" label="Select a base" variant="outlined" defaultValue={existingBaseName ? existingBaseName.name : ''} helperText="Please select a base or add one if it does not exist" onClick={(e) => { setExistingBaseName({ name: e.target.dataset.value, baseid: e.target.id }) }}>
                                {currentBases.map((base) => (
                                  <MenuItem key={base.basename} value={base.basename} id={base.baseid}>
                                    {base.basename}
                                  </MenuItem>
                                ))}
                                <MenuItem value={'+ Add a new base'}>+ Add a new base</MenuItem>
                              </TextField>
                            </td>
                          </tr>
                        </table>
                        <table className='base-add-table' style={{ display: `${existingBaseName.name === '+ Add a new base' ? 'block' : 'none'}` }}>
                          <tbody>
                            <tr className='register-row'>
                              <td>
                                <div className='register-category'>Base Name</div>
                                <TextField error={!baseName ? true : false} required sx={{ width: '28ch' }} id="outlined-basic-basename" label="Base Name" variant="outlined" defaultValue={baseName ? baseName : ''} onKeyUp={(e) => { setBaseName(e.target.value) }} />
                              </td>
                            </tr>
                            <tr className='register-row'>
                              <td>
                                <div className='register-category'>City</div>
                                <TextField error={!baseCity ? true : false} required sx={{ width: '28ch' }} id="outlined-basic-basecity" label="City" variant="outlined" defaultValue={baseCity ? baseCity : ''} onKeyUp={(e) => { setBaseCity(e.target.value) }} />
                              </td>
                            </tr>
                            <tr className='register-row'>
                              <td>
                                <div className='register-category'>State</div>
                                <TextField error={!baseState ? true : false} required select id="outlined-select-basestate" label="State" variant="outlined" defaultValue={baseState ? baseState : ''} helperText="Please select a state" onClick={(e) => { setBaseState(e.target.dataset.value) }}>
                                  {statesArray.map((state) => (
                                    <MenuItem key={state} value={state}>
                                      {state}
                                    </MenuItem>
                                  ))}</TextField>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <Button className='loginpage-button' size='large' variant='contained' onClick={() => { addBase() }}>Add Base</Button>
                      </Box>
                    </Modal>
                  </td>
                </tr>
              </tbody>
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
}