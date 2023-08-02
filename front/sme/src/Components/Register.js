import './Register.css'
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControlLabel, TextField, IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl, Button, Collapse, Alert, Typography, AlertTitle, Box, Modal, MenuItem, Backdrop, CircularProgress, FormHelperText, Checkbox, Autocomplete } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FooterBar from './FooterBar';
import Navbar from './Navbar';
import { AppContext } from '../App';

export default function Register() {
  const {setCurrentUser} = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const [usernameList, setUsernameList] = useState([]);
  // required options
  const [userid, setUserid] = useState(false);
  const [firstname, setFirstname] = useState(false);
  const [lastname, setLastname] = useState(false);
  const [username, setUsername] = useState(false);
  const [branch, setBranch] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(false);
  const [supEmail, setSupEmail] = useState(false);
  const [appEmail, setAppEmail] = useState('admin@sme.com');
  const [sme, setSme] = useState(false);
  const [categories, setCategories] = useState(false);
  const [smeCategory, setSmeCategory] = useState('');
  const [userverified, setUserverified] = useState('verified');
  const [supName, setSupName] = useState(false);
  // alertdisplay
  const [message, setMessage] = useState(false);
  const [alert, setAlert] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  // baseForm
  const [baseForm, setBaseForm] = useState(false);
  const [currentBases, setCurrentBases] = useState(false);
  const [existingBaseName, setExistingBaseName] = useState(false);
  const [baseid, setBaseid] = useState(false);
  const [baseName, setBaseName] = useState('Not Selected');
  const [baseCity, setBaseCity] = useState(false);
  const [baseLat, setBaseLat] = useState(false);
  const [baseLon, setBaseLon] = useState(false);
  const [baseState, setBaseState] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('Add Base *');


  const navigate = useNavigate();
  const militaryBranches = ['Army', 'Navy', 'Air Force', 'Marines Corps', 'Space Force', 'Coast Guard', 'National Guard']

  useEffect(() => {
    fetch('http://localhost:3001/base')
      .then(res => res.json())
      .then(data => {
        setCurrentBases(data);
      })
    fetch('http://localhost:3001/')
      .then(res => res.json())
      .then(data => {
        const lastuser = [];
        data.map(user=>{
          lastuser.push(user.userid);
        })
        // console.log(lastuser.sort((a,b)=>{return a-b})[lastuser.length-1]+1)
        setUserid(lastuser.sort((a,b)=>{return a-b})[lastuser.length-1]+1);
        const usernames = [...usernameList];
        data.map(user => {
          usernames.push(user.username);
        })
        // console.log(usernames);
        setUsernameList(usernames);
      })
    fetch('http://localhost:3001/categories')
      .then(res => res.json())
      .then(data => {
        const cat = [];
        data.map(category => cat.push(category.categoryname));
        setCategories(cat);
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

  // console.log(sme)

  const register = () => {
    if (!firstname || !lastname || !username || !email || !supEmail || !password || !password2 || !baseName) {
      alertDisplay('Please complete all the required fields!');
    } else if (!(/\d/).test(password) || !(/[A-Z]/).test(password) || password.length < 5) {
      alertDisplay('Password does not meet the minimum requirement.');
    } else if (password !== password2) {
      alertDisplay('Please make sure the passwords match.');
    } else if (!email.includes('@') || !supEmail.includes('@')) {
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
        branch: branch,
        sme: sme,
        photo: './photos/Blank_Avatar.jpg',
        base_id: baseid,
        userverified: userverified,
        photo: './photos/Blank_Avatar.jpg'
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
              if (sme) {
                navigate(`/register/${data.code}`, { replace: true });
              } else {
                setCurrentUser({userid: userid,
                  firstname: firstname,
                  lastname: lastname,
                  username: username,
                  password: password,
                  email: email,
                  supervisoremail: supEmail,
                  approveremail: appEmail,
                  phonenumber: phoneNumber,
                  branch: branch,
                  sme: sme,
                  base_id: baseid,
                  userverified: userverified,
                  photo: './photos/Blank_Avatar.jpg'});
                sessionStorage.setItem('currentUser', JSON.stringify({ userid: userid }));
                sessionStorage.setItem('loggedInUser', JSON.stringify({ userid: userid, firstname: firstname, lastname: lastname, sme: sme, admin: false }));
                navigate(`/profile/${userid}`, { replace: true });
              }
              if (categories.includes(smeCategory) && sme === true) {
                fetch('http://localhost:3001/smes', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    user_id: userid,
                    category_id: categories.indexOf(smeCategory) + 1
                  })
                })
              } else if (sme === true && !categories.includes(smeCategory)) {
                // adds a new category to the sme category table
                fetch('http://localhost:3001/createcategory', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    categoryname: smeCategory
                  })
                })
                  .then(res => res.json())
                  .then(data => {
                    // even though the sme is pending the sme is still added to the sme table
                    fetch('http://localhost:3001/smes', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        user_id: userid,
                        category_id: data.categoryid
                      })
                    })
                  })
              }
            }, 2500)
          }
        })
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
        setBaseid(currentBases.length + 1);
        setButtonLabel('Change Base');
        setBaseForm(false);
        // adding a new base that has been inputted as it's registering an account
        const baseBody = JSON.stringify({
          baseid: baseid,
          basename: baseName,
          basecity: baseCity,
          basestate: baseState,
          baselat: baseLat,
          baselon: baseLon
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
              }, 1000)
            }
          })
      }
    } else {
      if (existingBaseName.name !== '+ Add a new base') {
        setBaseName(currentBases[existingBaseName.baseid - 1].basename);
        setBaseCity(currentBases[existingBaseName.baseid - 1].basecity);
        setBaseState(currentBases[existingBaseName.baseid - 1].basestate);
        setBaseLat(currentBases[existingBaseName.baseid - 1].baselat);
        setBaseLon(currentBases[existingBaseName.baseid - 1].baselon);
        setBaseid(currentBases[existingBaseName.baseid - 1].baseid);
        setBackdrop(true);
        setTimeout(() => {
          setBackdrop(false);
        }, 1000)
        setButtonLabel('Change Base');
        setBaseForm(false);
      }
    }
  }
  const testString = `Must include at least 5 characters \nMust include at least one number \nMust include one uppercase letter`

  const smeHandler = (smeState) => {
    if (smeState === true) {
      setSme(true);
      setUserverified('pending');
    } else {
      setSme(false);
      setUserverified('verified');
    }
  }

  const supEmailHandler = (supervisorEmail) => {
    fetch('http://localhost:3001')
      .then(res => res.json())
      .then(data => {
        data.map(user => {
          if (user.email === supervisorEmail) {
            setSupName(user.lastname + ', ' + user.firstname);
          }
        })
      })
  }

  // console.log(smeCategory);


  if (currentBases && categories) {
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
                    <div className='register-category'>Account Type</div>
                    <FormControlLabel control={<Checkbox onClick={(e) => { smeHandler(e.target.checked) }} />} label="SME" />
                    <FormHelperText sx={{ width: '250px' }}>SME account will need to be verified before it can be used.</FormHelperText>
                  </td>
                  <td style={{ display: `${!sme ? 'none' : 'block'}` }}>
                    <div className='register-category'>SME Category</div>
                    <Autocomplete sx={{ width: '28ch' }}
                      id="outlined-select-smeCategory"
                      label="SmeCateogry"
                      variant="outlined"
                      defaultValue=''
                      freeSolo
                      options={categories}
                      renderInput={(params) => <TextField {...params} label='SME Category' />}
                      onKeyUp={(e) => { setSmeCategory(e.target.value) }}
                      // onClose={(e) => { setSmeCategory(e.target.textContent); setSmeCategory(document.querySelector('#outlined-select-smeCategory').value); }}
                      onChange={(e)=> { setSmeCategory(document.querySelector('#outlined-select-smeCategory').value); setSmeCategory(e.target.textContent)}}
                      onKeyDown={(e) => { if (e.key === 'Enter') { setSmeCategory(e.target.dataset.value) } }}>
                    </Autocomplete>
                  </td>
                </tr>
                <tr className='register-row'>
                  <td>
                    <div className='register-category'>Branch</div>
                    <TextField sx={{ width: '28ch' }} select id="outlined-select-branch" label="Branch" variant="outlined" defaultValue='' onClick={(e) => { setBranch(e.target.dataset.value) }}>
                      {militaryBranches.map((branch) => (
                        <MenuItem key={branch} value={branch} onKeyDown={(e) => { if (e.key === 'Enter') { setBranch(e.target.dataset.value) } }}>
                          {branch}
                        </MenuItem>
                      ))}
                    </TextField>
                  </td>
                </tr>
                <tr className='register-row'>
                  <td>
                    <div className='register-category'>Username</div>
                    <TextField error={!username || usernameList.includes(username) ? true : false} required sx={{ width: '28ch' }} id="outlined-basic-username" label="Username" variant="outlined"
                      onKeyUp={(e) => {
                        setUsername(e.target.value);
                      }} />
                    <div className='checkmarks-username'>
                      {!username || usernameList.includes(username) ? <WarningAmberIcon fontSize='small' sx={{ color: 'red' }} /> : <CheckCircleOutlineIcon fontSize='small' sx={{ color: 'green' }} />}
                    </div>
                    <FormHelperText sx={{ margin: '0px 0px 0px 25px' }}>{usernameList.includes(username) || !username ? 'Username not available' : 'Available username'}</FormHelperText>
                  </td>
                </tr>
                <tr className='register-row'>
                  <td>
                    <div className='register-category'>Password</div>
                    <FormControl sx={{ width: '28ch' }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                      <OutlinedInput
                        error={(/\d/).test(password) && (/[A-Z]/).test(password) && password.length > 4 ? false : true}
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
                      <div className='checkmarks'>
                        {password.length > 4 ? <CheckCircleOutlineIcon fontSize='small' sx={{ color: 'green' }} /> : <WarningAmberIcon fontSize='small' sx={{ color: 'red' }} />}
                        {(/\d/).test(password) ? <CheckCircleOutlineIcon fontSize='small' sx={{ color: 'green' }} /> : <WarningAmberIcon fontSize='small' sx={{ color: 'red' }} />}
                        {(/[A-Z]/).test(password) ? <CheckCircleOutlineIcon fontSize='small' sx={{ color: 'green' }} /> : <WarningAmberIcon fontSize='small' sx={{ color: 'red' }} />}
                      </div>
                      <FormHelperText sx={{ width: '29ch', margin: '0px 0px 0px 25px' }} id="outlined-confirmpassword-helper-text">{testString}</FormHelperText>
                    </FormControl>
                  </td>
                  <td className='special-td'>
                    <div className='register-category'>Confirm Password</div>
                    <FormControl sx={{ width: '28ch' }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password2">Confirm Password</InputLabel>
                      <OutlinedInput
                        error={password !== password2 || password2 === false ? true : false}
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
                      <div className='checkmarks-confirmpassword'>
                        {password === password2 ? <CheckCircleOutlineIcon fontSize='small' sx={{ color: 'green' }} /> : <WarningAmberIcon fontSize='small' sx={{ color: 'red' }} />}
                      </div>
                      <FormHelperText sx={{ width: '29ch', margin: '0px 0px 0px 25px' }} id="outlined-confirmpassword-helper-text">{password !== password2 || password2 === false ? 'Please cofirm your password' : 'Password match confirmed'}</FormHelperText>
                    </FormControl>
                  </td>
                </tr>
                <tr className='register-row'>
                  <td>
                    <div className='register-category'>E-mail</div>
                    <TextField error={!email || !email.includes('@') ? true : false} required id="outlined-basic-email" sx={{ width: '28ch' }} label="E-mail" variant="outlined" helperText='DoD or Personal E-mail' onKeyUp={(e) => { setEmail(e.target.value) }} />
                  </td>
                  <td>
                    <div className='register-category'>Phone Number</div>
                    <TextField id="outlined-basic-phonenumber" label="Phone Number" variant="outlined" sx={{ width: '28ch' }} helperText='Provide valid 10 digit phone number' onKeyUp={(e) => { setPhoneNumber(e.target.value) }} />
                  </td>
                </tr>
                <tr className='register-row'>
                  <td>
                    <div className='register-category'>Supervisor's E-mail</div>
                    <TextField error={!supName ? true : false} id="outlined-basic-supemail" sx={{ width: '28ch' }} required label="Supervisor's E-mail" variant="outlined"
                      onKeyUp={(e) => {
                        if (e.key === 'Backspace') {
                          setSupName(false);
                        } else { setSupEmail(e.target.value); supEmailHandler(e.target.value) }
                      }} />
                  </td>
                  <td>
                    <FormHelperText sx={{ width: '28ch' }} >{supName ? 'Supervisor : ' + supName : 'Supervisor not found.'}</FormHelperText>
                  </td>
                </tr>
                <tr className='register-row'>
                  {/* list out bases from the database */}
                  <td>
                    <div className='register-category'>Base</div>
                    <TextField
                      disabled
                      size='large'
                      sx={{ width: '28ch', marginRight: '10px' }}
                      id="outlined-disabled"
                      value={baseName !== false ? `${baseName === 'Not Selected' ? baseName : baseName + ','} ${baseCity === false ? '' : baseCity} ${baseState === false ? '' : baseState}` : 'Add Base *'}
                    />
                  </td>
                  <td>
                    <Button sx={{ margin: '23px 0px 0px 0px' }} className='loginpage-button' size='large' variant='contained' onClick={handleOpen}>{buttonLabel}</Button>
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
                          <tbody>
                            <tr>
                              <td>
                                <div className='register-category'>Select a Base</div>
                                <TextField error={!existingBaseName ? true : false} required select id="outlined-select-base" label="Select a base" variant="outlined" value={existingBaseName ? existingBaseName.name : ''} helperText="Please select a base or add one if it does not exist" onClick={(e) => { setExistingBaseName({ name: e.target.dataset.value, baseid: e.target.id }) }}>
                                  {currentBases.map((base) => (
                                    <MenuItem key={base.basename} value={base.basename} id={base.baseid} onKeyDown={(e) => { if (e.key === 'Enter') { setExistingBaseName({ name: e.target.dataset.value, baseid: e.target.id }) } }}>
                                      {base.basename}
                                    </MenuItem>
                                  ))}
                                  <MenuItem value={'+ Add a new base'}>+ Add a new base</MenuItem>
                                </TextField>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table className='base-add-table' style={{ display: `${existingBaseName.name === '+ Add a new base' ? 'block' : 'none'}` }}>
                          <tbody>
                            <tr className='register-row'>
                              <td>
                                <div className='register-category'>Base Name</div>
                                <TextField error={!baseName ? true : false} required sx={{ width: '28ch' }} id="outlined-basic-basename" label='Base Name' variant="outlined" defaultValue={baseName ? baseName : ''} onKeyUp={(e) => { setBaseName(e.target.value) }} />
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
                                    <MenuItem key={state} value={state} onKeyDown={(e) => { if (e.key === 'Enter') { setBaseState(e.target.dataset.value) } }}>
                                      {state}
                                    </MenuItem>
                                  ))}</TextField>
                              </td>
                            </tr>
                            <tr className='register-row'>
                              <td>
                                <div className='register-category'>Latitude</div>
                                <TextField error={!baseLat ? true : false} required sx={{ width: '28ch' }} id="outlined-basic-baselat" label="Latitude" variant="outlined" defaultValue={baseLat ? baseLat : ''} onKeyUp={(e) => { setBaseLat(e.target.value) }} />
                              </td>
                            </tr>
                            <tr className='register-row'>
                              <td>
                                <div className='register-category'>Longitude</div>
                                <TextField error={!baseLon ? true : false} required sx={{ width: '28ch' }} id="outlined-basic-baselon" label="Longitude" variant="outlined" defaultValue={baseLon ? baseLon : ''} onKeyUp={(e) => { setBaseLon(e.target.value) }} />
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
              <Button sx={{ marginTop: '20px' }} className='loginpage-button' size='large' variant='contained' onClick={() => {
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