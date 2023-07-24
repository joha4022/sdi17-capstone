import {styled} from 'styled-components';

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
const FooterGit = styled.img`
  height: 20px;
  margin-left: 10px;
`

export {
  Home,
  Footer,
  FooterDiv,
  FooterA,
  FooterGit
}