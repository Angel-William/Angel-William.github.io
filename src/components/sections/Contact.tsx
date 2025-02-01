import React from 'react';
import styled from 'styled-components';
import { Snackbar, Alert } from '@mui/material';

// Define the theme interface for type safety
interface Theme {
  text_primary: string;
  text_secondary: string;
  card: string;
  primary: string;
}

// Styled components with TypeScript
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div<{ theme: Theme }>`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div<{ theme: Theme }>`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const ContactButton = styled.a<{ theme: Theme }>`
  width: 95%;
  max-width: 600px;
  text-decoration: none;
  text-align: center;
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  padding: 13px 16px;
  margin-top: 28px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const Contact: React.FC = () => {
  const [open, setOpen] = React.useState(false); // Manage Snackbar state

  const handleEmailClick = () => {
    window.location.href = 'mailto:eng.angelawilliam@gmail.com?subject=New%20Message&body=';
    setOpen(true);
    // Auto-hide alert after 1 second
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  return (
    <Container>
      <Wrapper>
        <Title>Contact</Title>
        <Desc>Feel free to reach out to me for any questions or opportunities!</Desc>
        <ContactButton
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleEmailClick();
          }}
        >
          Send Email
        </ContactButton>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
        >
          <Alert onClose={() => setOpen(false)} severity="success">
            Email client opened!
          </Alert>
        </Snackbar>
      </Wrapper>
    </Container>
  );
};

export default Contact;