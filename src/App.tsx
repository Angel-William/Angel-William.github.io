
// src/App.tsx
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from './utils/Themes';
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/sections/HeroSection';
import Skills from './components/sections/Skills';
import StyledStarsCanvas from './components/canvas/Stars';
import { AnimatePresence } from 'framer-motion';
import Projects from './components/sections/Projects';
import Certifications from './components/sections/Certification';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import Experience from './components/sections/Experience';
// import CertificationsPage from './components/pages/Certification'; // not needed now
import Education from './components/sections/Education';
import ProjectDetails from './components/sections/ProjectDetails';
import styled from 'styled-components';

// ✅ Import the certifications data (adjust the path if your constants live elsewhere)
import { certificationsData } from './components/data/constants';

interface Theme {
  bg: string;
}

const Body = styled.div<{ $theme: Theme }>`
  background-color: ${({ $theme }) => $theme.bg};
  width: 100%;
  overflow-x: hidden;
  position: relative;
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

import { OpenModal } from './types';

const App: React.FC = () => {
  const [darkMode] = useState(
    () =>
      localStorage.getItem('theme') === 'dark' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const [openModal, setOpenModal] = useState<OpenModal>({
    state: false,
    project: null,
  });

  return (
    <ThemeProvider theme={darkMode ? darkTheme : darkTheme}>
      <Router>
        <Navbar />
        <Body $theme={darkMode ? darkTheme : darkTheme}>
          {/* Global starry background */}
          <StyledStarsCanvas />

          <AnimatePresence>
            {/* Project modal (global so it can overlay any route) */}
            {openModal.state && (
              <ProjectDetails
                key="project-details"
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
            )}

            {/* Define routes */}
            <Routes>
              {/* Home / Landing */}
              <Route
                path="/"
                element={
                  <>
                    <HeroSection key="hero-section" />
                    <Wrapper key="skills-wrapper">
                      <Skills key="skills" />
                      <Experience key="experience" experiences={[]} />
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
                  </>
                }
              />

              {/* Certifications page (opens in a new tab from the hero button) */}
              <Route
                path="/certifications"
                element={
                  <main className="min-h-screen bg-white">
                    <div className="mx-auto max-w-6xl px-4 py-10">
                      <h1 className="text-3xl font-bold tracking-tight mb-6">
                        Certifications
                      </h1>
                      <p className="text-slate-600 mb-8">
                        Proof of learning and accomplishments—each certificate opens in a clean PDF view.
                      </p>

                      {/* Reuse your existing component and data */}
                      <Certifications certificates={certificationsData} />
                    </div>
                  </main>
                }
              />
            </Routes>
          </AnimatePresence>
        </Body>
      </Router>
    </ThemeProvider>
   );
};

export default App;