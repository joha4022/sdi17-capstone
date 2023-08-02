import {styled} from 'styled-components';
import { Card, CardContent, Paper, AppBar as MuiAppBar, Box as MuiBox  } from "@mui/material";
import Autosuggest from 'react-autosuggest';

const Home = styled.div`
  background-color: #D2C8C8;
  margin: 10px;
  border-radius: 5px;
`;
const Footer = styled.footer`
  background-color: #A3816A;
  margin: 10px;
  border-radius: 5px;
  padding: 5px 0px 5px 0px;
`;
const FooterDiv = styled.div`
  color: white;
  font-weight: ${props => props.theme === 'bold' ? 'bold' : ''};
  margin: 10px;
  display: flex;
  align-items: center;
  font-size: ${props => props.theme === 'bold' ? '' : '12px'};
`;
const FooterA = styled.a`
  text-decoration: none;
  margin-left: 10px;
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

const ProfileDetail = styled.p`
  text-decoration: none;  
  margin-bottom: 0.9em;
  padding-left: 0.5em;
  `;

const ProfileDetails = styled.div`
  font-size: 1.2em; 
`;

const Background = styled.div`
  background-color: #F8F1F1;
  min-height: 100vh;
`;

const AppBar = styled(MuiAppBar)`
  background-color: #D2C8C8 !important;
  color: black !important;
`;

const Bio = styled(Paper)`
  flex-grow: 3;
  overflow: auto;
  margin: 20px;
  padding: 20px;
`;

const Notes = styled(Paper)`
  flex-grow: 2;
  overflow: auto;
  margin: 20px;
  padding: 20px;
`;

const FooterGit = styled.img`
  height: 20px;
  margin-left: 10px;
`;

const AvatarAndDetails = styled(MuiBox)`
  flex-shrink: 0;
  flex-basis: 100px;
`;

const StyledAutosuggest = styled(Autosuggest)`
  & input {
    width: 100% !important;
    box-sizing: border-box !important;
  }
`;

const Meetings = styled(Paper)`
  flex-grow: 3;
  overflow: auto;
  margin: 20px;
  padding: 20px;

  .MuiCard-root {
    margin-bottom: 10px;
  }

  .MuiCardContent-root {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    alignitems: center;
    padding: 16px;
  }

  .MuiTypography-root {
    margin-bottom:5px;
  }

  .MuiButton-root {
    float: "right";
    width: "65px";
    height: "20px";
    fontSize: "0.6em";
    borderColor: "red";
    color: "red";
    borderWidth: "2px";
    borderRadius: "2px";
    padding: 0;
    transition: "0.3s";

    "&:hover": {
      backgroundColor: "red";
      color: "white";
    }
  }
`;



export {
  Home,
  Footer,
  FooterDiv,
  FooterA,
  FooterGit,
  ProfileDetails,
  ProfileDetail,
  Background,
  AppBar,
  Bio,
  Notes,
  Meetings,
  AvatarAndDetails,
  StyledAutosuggest,
}