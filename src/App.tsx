import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from './utils/Themes';
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import HeroSection from './components/sections/HeroSection';
import Skills from './components/sections/Skills';
import StyledStarsCanvas from './components/canvas/Stars';
import { AnimatePresence } from 'framer-motion';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import ProjectDetails from './components/sections/ProjectDetails';
import styled from 'styled-components';

// Define the theme interface for type safety
interface Theme {
  bg: string;
}

interface Project {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  github: string;
  webapp: string;
  member?: Array<{ img: string }>;
}

// Define the OpenModal type
interface OpenModal {
  state: boolean;
  project: Project | null;
}

// Styled components with TypeScript
const Body = styled.div<{ $theme: Theme }>`
  background-color: ${({ $theme }) => $theme.bg};
  width: 100%;
  overflow-x: hidden;
  position: relative; // Ensure the stars canvas is positioned correctly
`;

const Wrapper = styled.div`
  background: linear-gradient(
      38.73deg,
      rgba(204, 0, 187, 0.15) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(0, 70, 209, 0) 50%,
      rgba(0, 70, 209, 0.15) 100%
    );
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(
    () =>
      localStorage.getItem('theme') === 'dark' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [openModal, setOpenModal] = useState<OpenModal>({
    state: false,
    project: null,
  });

  return (
    <ThemeProvider theme={darkMode ? darkTheme: darkTheme}>
      <Router>
        <Navbar />
        <Body $theme={darkMode ? darkTheme: darkTheme}>
          {/* Render the starry background */}
          <StyledStarsCanvas />
          <AnimatePresence>
            {/* Add unique keys for every component */}
            {openModal.state && (
              <ProjectDetails
                key="project-details"
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
            )}
            <HeroSection key="hero-section" />
            <Wrapper key="skills-wrapper">
              <Skills key="skills" />
              <Experience key="experience" />
            </Wrapper>
            <Projects
              key="projects"
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
            <Wrapper key="contact-wrapper">
              <Education key="education" />
              <Contact key="contact" />
            </Wrapper>
            <Footer key="footer" />
          </AnimatePresence>
        </Body>
      </Router>
    </ThemeProvider>
  );
};

export default App;