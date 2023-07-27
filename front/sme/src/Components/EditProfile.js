import './EditProfile.css';
import FooterBar from './FooterBar';
import Navbar from './Navbar';
import { TextField,Collapse, Avatar, List, ListItemText, ListItemButton, ListItemIcon } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBriefcase, faNewspaper, faGear } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useContext, useState } from 'react';
import { AppContext } from '../App';

export default function EditProfile() {
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const [open, setOpen] = useState(true);

  // required options
  const [userid, setUserid] = useState(false);
  const [firstname, setFirstname] = useState(false);
  const [lastname, setLastname] = useState(false);
  const [username, setUsername] = useState(false);
  const [branch, setBranch] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState(false);
  const [newPassword2, setNewPassword2] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(false);
  const [supEmail, setSupEmail] = useState(false);
  const [appEmail, setAppEmail] = useState(false);
  const [worklocation, setWorklocation] = useState(false);
  const [bio, setBio] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (sessionStorage.getItem('currentUser') !== null) {
      const userid = JSON.parse(sessionStorage.getItem('currentUser')).userid;

      fetch('http://localhost:3001/')
        .then(res => res.json())
        .then(data => {
          const user = data[userid - 1]
          setCurrentUser(user);
          setUserid(user.userid);
          setFirstname(user.firstname);
          setLastname(user.lastname);
          setUsername(user.username);
          setEmail(user.email);
          setBranch(user.branch);
          setPassword(user.password);
          setPhoneNumber(user.phoneNumber);
          setSupEmail(user.supervisoremail);
          setAppEmail(user.approveremail);
          setWorklocation(user.worklocation);
          setBio(user.bio);
        })
    }
  }, [])

  if (currentUser) {
    return (
      <>
        <Navbar />
        <div className='editprofile-body-section'>
          <div className='editprofile-side-menu'>
            <div className='side-menu-title'>Edit Profile</div>
            <div className='editprofile-side-menu-div'><FontAwesomeIcon className='side-menu-icon' icon={faUser} /><span className='side-menu-span'>Personal</span></div>
            <div className='editprofile-side-menu-div'><FontAwesomeIcon className='side-menu-icon' icon={faNewspaper} /><span className='side-menu-span'>Bio</span></div>
            <div className='editprofile-side-menu-div'><FontAwesomeIcon className='side-menu-icon' icon={faBriefcase} /><span className='side-menu-span'>Work</span></div>
            <div className='editprofile-side-menu-div'><FontAwesomeIcon className='side-menu-icon' icon={faGear} /><span className='side-menu-span'>Settings</span></div>
          </div>
          <div className='editprofile-main-section'>
            <div className='editprofile-main-menus'>
              <div className='editprofile-main-photo'>
                <Avatar sx={{ width: 100, height: 100 }} className='editprofile-avatar' alt="Remy Sharp" src="../images/Blank_Avatar.jpg" />
              </div>
              <div className='editprofile-main-menu-bar'>
                <div className='editprofile-category'>Personal</div>
                <List>
                  <ListItemButton onClick={handleClick}>
                    <ListItemText primary='Name, branch, email, phone number'></ListItemText>
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <table>
                        <tbody>
                          <tr className='register-row'>
                            <td>
                              <div className='dropdown-category'>First Name</div>
                              <TextField required sx={{ width: '20ch' }} id="outlined-basic-firstname" size='small' label="First Name" variant="outlined" defaultValue={currentUser.firstname}/>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </List>
                  </Collapse>
                </List>
              </div>
              <div className='editprofile-main-menu-bar'>
                <div className='editprofile-category'>Bio</div>
                <List>
                  <ListItemButton onClick={handleClick}>
                    <ListItemText primary='Name, branch, email, phone number'></ListItemText>
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>

                      </ListItemButton>
                    </List>
                  </Collapse>
                </List>
              </div>
              <div className='editprofile-main-menu-bar'>
                <div className='editprofile-category'>Work</div>
                <List>
                  <ListItemButton onClick={handleClick}>
                    <ListItemText primary='Name, branch, email, phone number'></ListItemText>
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>

                      </ListItemButton>
                    </List>
                  </Collapse>
                </List>
              </div>
              <div className='editprofile-main-menu-bar'>
                <div className='editprofile-category'>Settings</div>
                <List>
                  <ListItemButton onClick={handleClick}>
                    <ListItemText primary='Name, branch, email, phone number'></ListItemText>
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>

                      </ListItemButton>
                    </List>
                  </Collapse>
                </List>
              </div>
              <div className='editprofile-main-menu-bar'>
                <div className='editprofile-category'>Delete Account</div>
                <List>
                  <ListItemButton onClick={handleClick}>
                    <ListItemText primary='Name, branch, email, phone number'></ListItemText>
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>

                      </ListItemButton>
                    </List>
                  </Collapse>
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