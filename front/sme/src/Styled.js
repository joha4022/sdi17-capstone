import {styled} from 'styled-components';
import { Paper, AppBar as MuiAppBar } from "@mui/material";

const Home = styled.div`
  background-color: #D2C8C8;
  margin: 10px;
  border-radius: 5px;
`
const Footer = styled.footer`
  background-color: #A3816A;
  margin: 10px;
  border-radius: 5px;
  padding: 5px 0px 5px 0px;
`
const FooterDiv = styled.div`
  color: white;
  font-weight: ${props => props.theme === 'bold' ? 'bold' : ''};
  margin: 10px;
  display: flex;
  align-items: center;
  font-size: ${props => props.theme === 'bold' ? '' : '12px'};
`
const FooterA = styled.a`
  text-decoration: none;
  margin-left: 10px;
  color: white;
  font-size: 12px;
  font-weight: bold;
`
const ProfileDetails = styled.div`
  font-size: 1.2em;
  text-decoration: underline;
`;

const ProfileDetail = styled.p`
  margin-bottom: 0.5em;
  padding-left: 0.5em;
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
}