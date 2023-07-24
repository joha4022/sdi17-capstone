import {styled} from 'styled-components';
import { Paper, AppBar as MuiAppBar } from "@mui/material";

const Title = styled.h1`
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


export {
  Title,
  ProfileDetails,
  ProfileDetail,
  Background,
  AppBar,
  Bio,
  Notes,
}