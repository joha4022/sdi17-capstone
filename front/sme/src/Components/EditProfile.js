import './EditProfile.css';
import FooterBar from './FooterBar';
import Navbar from './Navbar';
import { Autocomplete, Alert, AlertTitle, Backdrop, CircularProgress, Typography, Modal, Box, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, FormHelperText, Button, MenuItem, TextField, Collapse, Avatar, List, ListItemText, ListItemButton } from '@mui/material';
import { ExpandMore, ExpandLess, Visibility, VisibilityOff } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBriefcase, faNewspaper, faGear, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useContext, useState } from 'react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';


export default function EditProfile() {
  const testString = `Must include at least 5 characters \nMust include at least one number \nMust include one uppercase letter`

  const { currentUser, setCurrentUser } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const [row1, setRow1] = useState(false);
  const [row2, setRow2] = useState(false);
  const [row3, setRow3] = useState(false);
  const [row4, setRow4] = useState(false);
  // required options
  const [userid, setUserid] = useState(false);
  const [firstname, setFirstname] = useState(false);
  const [lastname, setLastname] = useState(false);
  const [username, setUsername] = useState(false);
  const [deleteUsername, setDeleteUsername] = useState(false);
  const [branch, setBranch] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState(false);
  const [newPassword2, setNewPassword2] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(false);
  const [supEmail, setSupEmail] = useState(false);
  const [appEmail, setAppEmail] = useState(false);
  const [worklocation, setWorklocation] = useState(false);
  const [bio, setBio] = useState(false);
  const [photo, setPhoto] = useState(false);
  const [changePhoto, setChangePhoto] = useState(false);
  const [categories, setCategories] = useState(false);
  const [smeCategory, setSmeCategory] = useState(false);
  // baseForm
  const [baseForm, setBaseForm] = useState(false);
  const [currentBases, setCurrentBases] = useState(false);
  const [existingBaseName, setExistingBaseName] = useState(false);
  const [baseid, setBaseid] = useState(false);
  const [baseName, setBaseName] = useState(false);
  const [baseCity, setBaseCity] = useState(false);
  const [baseState, setBaseState] = useState(false);
  // username list
  const [usernameList, setUsernameList] = useState([]);
  // alert & backdrop
  const [message, setMessage] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  // profile image
  const [image, setImage] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const militaryBranches = ['Army', 'Navy', 'Air Force', 'Marines Corps', 'Space Force', 'Coast Guard', 'National Guard']

  const handleRow1 = () => { setRow1(!row1) };
  const handleRow2 = () => { setRow2(!row2) };
  const handleRow3 = () => { setRow3(!row3) };
  const handleRow4 = () => { setRow4(!row4) };


  const save = (row) => {
    if (newPassword) {
      if (newPassword !== newPassword2 || password !== confirmPassword) {
        return alertDisplay('Please check your old password and/or new password!');
      } else if (password === newPassword) {
        return alertDisplay('Your new password cannot be same as your current password!');
      }
    }
    if (username === '') {
      return alertDisplay('Your username cannot be blank!')
    }
    row();
    const body = JSON.stringify({
      userid: userid,
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: `${newPassword ? newPassword : password}`,
      email: email,
      supervisoremail: supEmail,
      approveremail: appEmail,
      phonenumber: phoneNumber,
      branch: branch,
      base_id: baseid,
      bio: bio
    })
    const option = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    }
    // adding a user
    fetch('http://localhost:3001/updateuser', option)
      .then(res => res.json())
      .then(data => {
        if (data.code === 500) {
          alertDisplay(data.message)
        } else {
          setBackdrop(true);
          setTimeout(() => {
            setBackdrop(false);
            alertDisplay2('Your profile has been updated!');
          }, 1500)
        }
      })
  }

  const openDeleteForm = () => setDeleteForm(true);
  const closeDeleteForm = () => setDeleteForm(false);
  const deleteAccount = () => {
    if (username === deleteUsername) {
      const deleteBody = JSON.stringify({
        userid: userid
      })
      const deleteOption = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: deleteBody
      }
      fetch(`http://localhost:3001/deleteuser/${userid}`, deleteOption)
        .then()
      setBackdrop(true);
      setDeleteForm(false);
      alertDisplay2('Your account has been deleted and you will be redirected to the login page.');
      sessionStorage.clear();
      setTimeout(() => {
        setBackdrop(false);
        navigate('/', { replace: true })
      }, 3000)
    } else {
      alertDisplay('Please provide the correct username!')
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem('currentUser') !== null) {
      const userid = JSON.parse(sessionStorage.getItem('currentUser')).userid;
      // fetch sme categories
      fetch('http://localhost:3001/categories')
      .then(res => res.json())
      .then(data => {
        const cat = [];
        data.map(category => cat.push(category.categoryname));
        setCategories(cat);
      })
      // fetch the existing user
      fetch('http://localhost:3001/')
        .then(res => res.json())
        .then(data => {
          let user;
          data.map(individual => {
            if (individual.userid === userid) {
              user = individual;
            }
          })
          // console.log(user);
          setCurrentUser(user);
          setUserid(user.userid);
          setFirstname(user.firstname);
          setLastname(user.lastname);
          setUsername(user.username);
          setEmail(user.email);
          setBranch(user.branch);
          setPassword(user.password);
          setPhoneNumber(user.phonenumber);
          setSupEmail(user.supervisoremail);
          setAppEmail(user.approveremail);
          setWorklocation(user.worklocation);
          setBio(user.bio);
          setBaseid(user.base_id);
          // fetch photo
          fetch('http://localhost:3001/getphoto', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ photopath: user.photo })
          })
            .then(res => res.blob())
            .then(data => setPhoto(URL.createObjectURL(data)))
          // fetch the usernames
          fetch('http://localhost:3001/getusers')
            .then(res => res.json())
            .then(data => {
              const list = [...usernameList]
              data.map(existingUsers => {
                if (existingUsers.username !== user.username) {
                  list.push(existingUsers.username);
                }
              })
              setUsernameList(list);
            })
          fetch('http://localhost:3001/base')
            .then(res => res.json())
            .then(data => {
              setCurrentBases(data);
              setExistingBaseName({ name: data[user.base_id - 1].basename, id: data[user.base_id - 1].baseid });
              // setBaseName(data[user.base_id - 1].basename);
              // setBaseCity(data[user.base_id - 1].basecity);
              // setBaseState(data[user.base_id - 1].basestate);
            })
        })
    }
  }, [])

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
        setBaseForm(false);
        // adding a new base that has been inputted as it's registering an account
        const baseBody = JSON.stringify({
          baseid: baseid,
          basename: baseName,
          basecity: baseCity,
          basestate: baseState
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
      setBaseName(existingBaseName.name);
      setBaseCity(currentBases[existingBaseName.id - 1].basecity);
      setBaseState(currentBases[existingBaseName.id - 1].basestate);
      setBaseid(currentBases[existingBaseName.id - 1].baseid);
      setBackdrop(true);
      setTimeout(() => {
        setBackdrop(false);
      }, 1000)
      setBaseForm(false);
    }
  }

  const alertDisplay = (message) => {
    setMessage(message);
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 2500)
  }

  const alertDisplay2 = (message) => {
    setMessage(message);
    setAlert2(true);
    setTimeout(() => {
      setAlert2(false);
    }, 2500)
  }

  const changeProfilePic = () => {
    const formData = new FormData();
    formData.append("uploadFile", photo, photo.name)
    const option = {
      method: 'POST',
      body: formData
    }
    fetch('http://localhost:3001/upload', option)
      .then(res => res.text())
      .then(data => {
        const body = JSON.stringify({
          userid: userid,
          photo: `./photos/${photo.name}`
        })
        const option = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: body
        }
        // adding a user
        fetch('http://localhost:3001/updateuser', option)
          .then(res => res.json())
          .then(data => {
            if (data.code === 500) {
              alertDisplay(data.message)
            } else {
              setBackdrop(true);
              setTimeout(() => {
                setBackdrop(false);
                alertDisplay2('Your profile has been updated!');
              }, 1500)
            }
          })
      })
  }

  if (currentUser && currentBases) {
    return (
      <>
        <Collapse in={alert} sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Base Error — <strong>{message}</strong>
          </Alert>
        </Collapse>
        <Collapse in={alert2} sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Success — <strong>{message}</strong>
          </Alert>
        </Collapse>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Navbar />
        <div className='editprofile-body-section'>
          <div className='editprofile-main-section'>
            <div className='editprofile-main-menus'>
              <div className='main-menu-title'>Edit Profile</div>
              <div className='editprofile-main-photo'>
                <Avatar sx={{ width: 200, height: 200 }} className='editprofile-avatar' alt="Remy Sharp"
                  src={changePhoto ? changePhoto : photo}
                  onClick={() => { document.querySelector('#image-upload').click() }}
                />
                {/* File to be uploaded:  */}
                <input type="file"
                  name="uploadFile"
                  id='image-upload'
                  onChange={(e) => {
                    setPhoto(e.target.files[0]);
                    setChangePhoto(URL.createObjectURL(e.target.files[0]));
                  }} />
                <div className='editprofile-username-display'>{username}
                  <div className='editprofile-email-display'>{email}</div>
                  <div className='editprofile-user-type'>{currentUser.admin ? 'Admin' : ''} {currentUser.sme ? 'SME' : ''}</div>
                  <Button className='loginpage-button' size='large'
                    sx={{
                      marginTop: '2.5rem',
                      display: `${changePhoto ? 'block' : 'none'}`,
                    }}
                    onClick={() => { changeProfilePic() }}
                    variant='contained'
                    type='submit'>Save</Button>
                </div>
              </div>
              <div className='editprofile-main-menu-bar'>
                <div className='editprofile-category'><FontAwesomeIcon className='side-menu-icon' icon={faUser} />Personal</div>
                <List>
                  <ListItemButton onClick={handleRow1}>
                    <ListItemText primary='Edit name, branch, phone number, email'></ListItemText>
                    {row1 ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={row1} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <table>
                          <tbody>
                            <tr className='register-row'>
                              <td>
                                <div className='dropdown-category'>First Name</div>
                                <TextField defaultValue={firstname} error={!firstname ? true : false} required sx={{ width: '26ch' }} size='small' id="outlined-basic-firstname" label="First Name" variant="outlined" onKeyUp={(e) => { setFirstname(e.target.value) }} />
                              </td>
                              <td>
                                <div className='dropdown-category'>Last Name</div>
                                <TextField error={!lastname ? true : false} required sx={{ width: '26ch' }} id="outlined-basic-lastname" size='small' label="Last Name" variant="outlined" defaultValue={lastname} onKeyUp={(e) => { setLastname(e.target.value) }} />
                              </td>
                              <td>
                                <div className='dropdown-category'>Branch</div>
                                <TextField sx={{ width: '26ch' }} select id="outlined-select-branch" label="Branch" size='small' variant="outlined" defaultValue={branch} onClick={(e) => { setBranch(e.target.dataset.value) }}>
                                  {militaryBranches.map((branch) => (
                                    <MenuItem key={branch} value={branch} onKeyDown={(e) => { if (e.key === 'Enter') { setBranch(e.target.dataset.value) } }}>
                                      {branch}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className='dropdown-category'>Phone Number</div>
                                <TextField helperText='xxx-xxx-xxxx' onKeyUp={(e) => { setPhoneNumber(e.target.value) }} sx={{ width: '26ch' }} id="outlined-basic-phonenumber" size='small' label="Phone Number" variant="outlined" defaultValue={phoneNumber} />
                              </td>
                              <td>
                                <div className='register-category'>E-mail</div>
                                <TextField defaultValue={email} size='small' error={!email ? true : false} required id="outlined-basic-email" sx={{ width: '26ch' }} label="E-mail" variant="outlined" helperText='DoD or Personal E-mail' onKeyUp={(e) => { setEmail(e.target.value) }} />
                              </td>
                            </tr>
                            <Button className='loginpage-button' size='medium' variant='contained' onClick={() => { save(handleRow1) }}>Save</Button>
                          </tbody>
                        </table>
                      </ListItemButton>
                    </List>
                  </Collapse>
                </List>
              </div>
              <div className='editprofile-main-menu-bar'>
                <div className='editprofile-category'><FontAwesomeIcon className='side-menu-icon' icon={faNewspaper} />Bio</div>
                <List>
                  <ListItemButton onClick={handleRow2}>
                    <ListItemText primary='Edit biography'></ListItemText>
                    {row2 ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={row2} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                <div className='register-category'>Biography / Work Experience</div>
                                <TextField
                                  sx={{ width: '45rem' }}
                                  id="outlined-multiline-static"
                                  size=''
                                  label="Biography / Work Experience"
                                  multiline
                                  rows={5}
                                  defaultValue={bio}
                                  onKeyUp={(e) => { setBio(e.target.value) }}
                                />
                              </td>
                            </tr>
                            <Button className='loginpage-button' size='medium' variant='contained' onClick={() => { save(handleRow2) }}>Save</Button>
                          </tbody>
                        </table>
                      </ListItemButton>
                    </List>
                  </Collapse>
                </List>
              </div>
              <div className='editprofile-main-menu-bar'>
                <div className='editprofile-category'><FontAwesomeIcon className='side-menu-icon' icon={faBriefcase} />Work</div>
                <List>
                  <ListItemButton onClick={handleRow3}>
                    <ListItemText primary='Edit work location, base, supervisor email, and approver email'></ListItemText>
                    {row3 ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={row3} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                <div className='dropdown-category'>Work Location</div>
                                <TextField defaultValue={worklocation} sx={{ width: '28ch' }} size='small' id="outlined-basic-worklocation" label="Work Location" variant="outlined" onKeyUp={(e) => { setWorklocation(e.target.value) }} />
                              </td>
                              <td>
                                <div className='register-category'>Base</div>
                                <TextField
                                  disabled
                                  size='small'
                                  sx={{ width: '28ch', marginRight: '10px' }}
                                  id="outlined-disabled"
                                  label="Base"
                                  value={existingBaseName.name !== '+ Add a new base' ? existingBaseName.name : baseName}
                                />
                                <Button className='loginpage-button' size='medium' variant='contained' onClick={handleOpen}>Change Base</Button>
                                <Modal
                                  open={baseForm}
                                  onClose={handleClose}
                                  aria-labelledby="modal-modal-title"
                                  aria-describedby="modal-modal-description"
                                >
                                  <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h5" component="h2">
                                      Change Base
                                    </Typography>
                                    <table>
                                      <tbody>
                                        <tr>
                                          <td>
                                            <div className='register-category'>Select a base</div>
                                            <TextField error={!existingBaseName ? true : false} required select id="outlined-select-base" label="Select a base" variant="outlined" value={existingBaseName ? existingBaseName.name : ''} helperText="Please select another base or add one if it does not exist" onClick={(e) => { setExistingBaseName({ name: e.target.dataset.value, id: e.target.id }) }}>
                                              {currentBases.map((base) => (
                                                <MenuItem key={base.basename} value={base.basename} id={base.baseid} onKeyDown={(e) => { if (e.key === 'Enter') { setExistingBaseName({ name: e.target.dataset.value, id: e.target.id }) } }}>
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
                                      </tbody>
                                    </table>
                                    <Button className='loginpage-button' size='large' variant='contained' onClick={() => { addBase() }}>Change Base</Button>
                                    <Button className='loginpage-button' size='large' sx={{ marginLeft: '6.5rem' }} variant='contained' onClick={handleClose}>Close</Button>
                                  </Box>
                                </Modal>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className='dropdown-category'>Supervisor Email</div>
                                <TextField defaultValue={supEmail} sx={{ width: '28ch' }} size='small' id="outlined-basic-suppEmail" label="Supervisor Email" variant="outlined" onKeyUp={(e) => { setSupEmail(e.target.value) }} />
                              </td>
                              <td>
                                <div className='dropdown-category'>Approver Email</div>
                                <TextField error={!appEmail || !appEmail.includes('@') ? true : false} required defaultValue={appEmail} sx={{ width: '28ch' }} size='small' id="outlined-basic-appEmail" label="Approver Email" variant="outlined" onKeyUp={(e) => { setAppEmail(e.target.value) }} />
                              </td>
                            </tr>
                            {/* {currentUser.sme ?
                              <tr>
                                <td>
                                  <div className='dropdown-category'>SME Category</div>
                                  <Autocomplete sx={{ width: '28ch' }}
                                    id="outlined-select-smeCategory"
                                    label="SmeCateogry"
                                    variant="outlined"
                                    defaultValue={}
                                    freeSolo
                                    options={categories}
                                    renderInput={(params) => <TextField {...params} label='SME Category' />}
                                    onKeyUp={(e) => { setSmeCategory(e.target.value) }}
                                    onClose={(e) => { setSmeCategory(e.target.textContent) }}
                                    onKeyDown={(e) => { if (e.key === 'Enter') { setSmeCategory(e.target.dataset.value) } }}>
                                  </Autocomplete>
                                </td>
                              </tr> : <></>} */}
                            <Button className='loginpage-button' size='medium' variant='contained' onClick={() => { save(handleRow3) }}>Save</Button>
                          </tbody>
                        </table>
                      </ListItemButton>
                    </List>
                  </Collapse>
                </List>
              </div>
              <div className='editprofile-main-menu-bar'>
                <div className='editprofile-category'><FontAwesomeIcon className='side-menu-icon' icon={faGear} />Account Settings</div>
                <List>
                  <ListItemButton onClick={handleRow4}>
                    <ListItemText primary='Edit username and password'></ListItemText>
                    {row4 ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={row4} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                <div className='dropdown-category'>Username</div>
                                <TextField
                                  error={usernameList.includes(username) || !username ? true : false}
                                  required
                                  defaultValue={username}
                                  sx={{ width: '26ch' }}
                                  size='small'
                                  id="outlined-basic-username"
                                  label="Username"
                                  variant="outlined"
                                  onKeyUp={(e) => { setUsername(e.target.value) }} />
                                <div className='checkmarks-username'>
                                  {!username || usernameList.includes(username) ? <WarningAmberIcon fontSize='small' sx={{ color: 'red' }} /> : <CheckCircleOutlineIcon fontSize='small' sx={{ color: 'green' }} />}
                                </div>
                                <FormHelperText sx={{ margin: '0px 0px 0px 25px' }}>{usernameList.includes(username) || !username ? 'Username not available' : 'Available username'}</FormHelperText>
                              </td>
                            </tr>
                            <tr className='register-row'>
                              <td className='special-td'>
                                <div className='register-category'>Current Password</div>
                                <FormControl sx={{ width: '26ch' }} size='small' variant="outlined">
                                  <InputLabel htmlFor="outlined-adornment-password">Current Password</InputLabel>
                                  <OutlinedInput
                                    color={password === confirmPassword ? 'success' : ''}
                                    error={confirmPassword.length > 0 && password !== confirmPassword ? true : false}
                                    onKeyUp={(e) => { setConfirmPassword(e.target.value) }}
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
                                    label="Current Password"
                                  />
                                  <FormHelperText id="outlined-confirmpassword-helper-text">{'Provide your current PW'}</FormHelperText>
                                </FormControl>
                              </td>
                              <td>
                                <div className='register-category'>New Password</div>
                                <FormControl sx={{ width: '26ch' }} size='small' variant="outlined">
                                  <InputLabel htmlFor="outlined-adornment-password2">New Password</InputLabel>
                                  <OutlinedInput
                                    error={(/\d/).test(newPassword) && (/[A-Z]/).test(newPassword) && newPassword.length > 4 ? false : true}
                                    onKeyUp={(e) => { setNewPassword(e.target.value) }}
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
                                    label="New Password"
                                  />
                                  <div className='checkmarks'>
                                    {newPassword.length > 4 ? <CheckCircleOutlineIcon fontSize='small' sx={{ color: 'green' }} /> : <WarningAmberIcon fontSize='small' sx={{ color: 'red' }} />}
                                    {(/\d/).test(newPassword) ? <CheckCircleOutlineIcon fontSize='small' sx={{ color: 'green' }} /> : <WarningAmberIcon fontSize='small' sx={{ color: 'red' }} />}
                                    {(/[A-Z]/).test(newPassword) ? <CheckCircleOutlineIcon fontSize='small' sx={{ color: 'green' }} /> : <WarningAmberIcon fontSize='small' sx={{ color: 'red' }} />}
                                  </div>
                                  <FormHelperText sx={{ width: '29ch', margin: '0px 0px 0px 25px' }} id="outlined-confirmpassword-helper-text">{testString}</FormHelperText>
                                </FormControl>
                              </td>
                              <td className='special-td'>
                                <div className='register-category'>Confirm New Password</div>
                                <FormControl sx={{ width: '26ch' }} size='small' variant="outlined">
                                  <InputLabel htmlFor="outlined-adornment-password2">Confirm New Password</InputLabel>
                                  <OutlinedInput
                                    error={newPassword !== newPassword2 && newPassword !== '' ? true : false}
                                    onKeyUp={(e) => { setNewPassword2(e.target.value) }}
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
                                    label="Confirm New Password"
                                  />
                                  <div className='checkmarks-confirmpassword'>
                                    {newPassword === newPassword2 && newPassword2 !== false ? <CheckCircleOutlineIcon fontSize='small' sx={{ color: 'green' }} /> : <WarningAmberIcon fontSize='small' sx={{ color: 'red' }} />}
                                  </div>
                                  <FormHelperText sx={{ width: '29ch', margin: '0px 0px 0px 25px' }} id="outlined-confirmpassword-helper-text">{newPassword !== newPassword2 || newPassword2 === false ? 'Please cofirm your password' : 'Password match confirmed'}</FormHelperText>
                                </FormControl>
                              </td>
                            </tr>
                            <Button className='loginpage-button' size='medium' variant='contained' onClick={() => { save(handleRow4) }}>Save</Button>
                          </tbody>
                        </table>
                      </ListItemButton>
                    </List>
                  </Collapse>
                </List>
              </div>
              <div className='editprofile-main-menu-bar'>
                <div className='editprofile-category'><FontAwesomeIcon className='side-menu-icon' icon={faUserXmark} />Delete Account</div>
                <List>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <Button color='error' className='loginpage-button' size='medium' variant='contained' onClick={openDeleteForm}>Delete</Button>
                    </ListItemButton>
                  </List>
                  <Modal
                    open={deleteForm}
                    onClose={closeDeleteForm}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h5" component="h2">
                        Delete Account
                      </Typography>
                      <div className='delete-question'>
                        Are you sure you want to permanently delete your account?
                      </div>
                      <div className='delete-statement'>
                        By typing in your <strong>username</strong> and pressing <strong>DELETE ACCOUNT</strong>, you are agreeing to have your account deleted permanently from the SME network.
                      </div>
                      <TextField
                        helperText={username === deleteUsername ? `${deleteUsername} will be deleted from SME` : ''}
                        error={username === deleteUsername ? true : false}
                        required
                        sx={{ width: '26ch', margin: '10px 0px 10px 0px' }}
                        size='small'
                        id="outlined-basic-username"
                        label="Username"
                        variant="outlined"
                        onKeyUp={(e) => { setDeleteUsername(e.target.value) }} />
                      <Button className='loginpage-button' color='error' size='large' variant='contained' onClick={() => { deleteAccount() }}>Delete Account</Button>
                      <Button className='loginpage-button' size='large' sx={{ marginLeft: '6.5rem' }} variant='contained' onClick={closeDeleteForm}>Close</Button>
                    </Box>
                  </Modal>
                </List>
              </div>
            </div>
          </div>
        </div>
        <FooterBar />
      </>
    )
  }
}