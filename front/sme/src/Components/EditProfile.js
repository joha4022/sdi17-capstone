import './EditProfile.css';
import FooterBar from './FooterBar';
import Navbar from './Navbar';
import { Avatar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBriefcase, faNewspaper, faGear } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useContext } from 'react';
import { AppContext } from '../App';

export default function EditProfile() {
  const { currentUser, setCurrentUser } = useContext(AppContext);
  
  useEffect(()=>{
    if(sessionStorage.getItem('currentUser')!== null){
      fetch('http://localhost:3001/')
    }
  },[])

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
              <div className='side-menu-span'>Personal</div>
              <div></div>
            </div>
            <div className='editprofile-main-menu-bar'>
              <div className='side-menu-span'>Bio</div>
            </div>
            <div className='editprofile-main-menu-bar'>
              <div className='side-menu-span'>Work</div>
            </div>
            <div className='editprofile-main-menu-bar'>
              <div className='side-menu-span'>Settings</div>
            </div>
            <div className='editprofile-main-menu-bar'>
              <div className='side-menu-span'>Delete Account</div>
            </div>
          </div>
        </div>
      </div>
      <FooterBar />
    </>
  )
}