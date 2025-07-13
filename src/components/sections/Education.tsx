import React from "react";
import styled from "styled-components";
import { education, EducationType } from "../data/constants"; // Make sure EducationType is defined
import EducationCard from "../cards/EducationCard";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import EarthCanvas from "../canvas/Earth";

// Define styled components
const Container = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Education: React.FC = () => {
  return (
    <Container id="Education">
      <Wrapper>
        <Title>Education</Title>
        <Desc style={{ marginBottom: "40px" }}>
        My education has been a journey of personal evolution and purposeful learning, shaping my skills and perspective. Below are the key details of my academic path.
        </Desc>

        <VerticalTimeline>
          {education.map((edu: EducationType, index: number) => (
            <EducationCard key={`education-${index}`} education={edu} />
          ))}
        </VerticalTimeline>
        
        <EarthCanvas /> {/* Your Earth component */}
      </Wrapper>
    </Container>
  );
};

export default Education;
