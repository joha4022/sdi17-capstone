import { Footer, FooterDiv, FooterA, FooterGit } from '../Styled';

export default function FooterBar() {
  return (
    <>
      <Footer>
          <FooterDiv theme='bold'>SME: Subject Matter Expert Military Enabler
            <a href='https://github.com/joha4022/sdi17-capstone' target='_blank'><FooterGit alt='gitlogo' src='./images/25231.png'></FooterGit></a>
          </FooterDiv>
          <FooterDiv>This website was created for SME's working with U.S. Armed Forces across the nation to connect and communicate.</FooterDiv>
          <FooterDiv>&copy; 2023 Galvanize SDI-17 Group 5 Capstone
            <FooterA className='github-user' href='https://github.com/athuro' target='_blank'>@athuro</FooterA>
            <FooterA className='github-user' href='https://github.com/jgibb062' target='_blank'>@jgibb062</FooterA>
            <FooterA className='github-user' href='https://github.com/kjlarocca' target='_blank'>@kjlarocca</FooterA>
            <FooterA className='github-user' href='https://github.com/pikasnuu1' target='_blank'>@pikasnuu1</FooterA>
            <FooterA className='github-user' href='https://github.com/Sauljm1' target='_blank'>@Sauljm1</FooterA>
            <FooterA className='github-user' href='https://github.com/joha4022' target='_blank'>@joha4022</FooterA>
          </FooterDiv>
      </Footer>
    </>
  )
}