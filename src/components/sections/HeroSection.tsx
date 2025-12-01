import React from 'react';
import HeroBgAnimation from './HeroBgAnimation';
import StyledStarsCanvas from '../canvas/Stars';
import {
  HeroContainer,
  HeroBg,
  HeroLeftContainer,
  Img,
  HeroRightContainer,
  HeroInnerContainer,
  TextLoop,
  Title,
  Span,
  SubTitle,
  ResumeButton,
  ButtonsRow, // <-- import new wrapper
} from './HeroStyle';
import HeroImg from '/HeroImage.jpg';
import Typewriter from 'typewriter-effect';
import { Bio } from '../data/constants';

const HeroSection: React.FC = () => {
  return (
    <div id="about">
      <HeroContainer>
      <StyledStarsCanvas />
        <HeroBg>
          <HeroBgAnimation />
        </HeroBg>
        <HeroInnerContainer>
          <HeroLeftContainer id="Left">
            <Title>
              Hi, I am <br /> {Bio.name}
            </Title>
            <TextLoop>
              I am a
              <Span>
                <Typewriter
                  options={{
                    strings: Bio.roles,
                    autoStart: true,
                    loop: true,
                  }}
                />
              </Span>
            </TextLoop>
            <SubTitle>{Bio.description}</SubTitle>
            <ButtonsRow>
              <ResumeButton href={Bio.resume} target="_blank" rel="noopener noreferrer">
                Check Resume
              </ResumeButton>
              <ResumeButton
                href={Bio.Certifications} target="_blank" rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('certifications');
                  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                aria-label="Scroll to Certifications"
              >
                Check Certifications
              </ResumeButton>
            </ButtonsRow>
          </HeroLeftContainer>

          <HeroRightContainer id="Right">
            <Img src={HeroImg} alt="hero-image" />
          </HeroRightContainer>
        </HeroInnerContainer>
      </HeroContainer>
    </div>
  );
};

export default HeroSection;