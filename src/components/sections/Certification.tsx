import React, { useState } from "react";
import styled from "styled-components";
import { certificationsData } from "../data/constants";
import { ExternalLink, Award, Calendar, X } from "lucide-react";

// Create a type that matches both your interface and the data
type CertificationType = {
  id?: number;
  title: string;
  issuer: string;
  skills?: string[];
  instructor?: string;
  date?: string;
  imageUrl: string;
  certificateId?: string;
  credentialUrl?: string;
  thumbnailColor?: string;
};

interface Props {
  openModal: any;
  setOpenModal: React.Dispatch<React.SetStateAction<any>>;
}

const Container = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  padding: 0 16px;
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

const CertificationsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 50px;
  justify-content: center;
`;

// Updated to look like Experience section cards - no tilt effect
const CertificationCard = styled.div`
  width: 100%;
  max-width: 500px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.primary + "20"};
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  border-radius: 16px;
  padding: 24px 36px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  // Subtle hover effect instead of tilt
  &:hover {
    transform: translateY(-2px);
    box-shadow: rgba(23, 92, 230, 0.25) 0px 8px 32px;
    border-color: ${({ theme }) => theme.primary + "40"};
  }

  @media (max-width: 768px) {
    max-width: 400px;
    padding: 20px 30px;
  }

  @media (max-width: 500px) {
    max-width: 330px;
    padding: 16px 24px;
  }
`;

// Optional: Add a subtle gradient border like Experience section
const CardBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.primary + "80"} 0%,
    ${({ theme }) => theme.secondary + "80"} 100%
  );
`;

const CertificationImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 20px;
  border: 1px solid ${({ theme }) => theme.text_primary + "20"};
`;

const CertificationTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
`;

const CertificationIssuer = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CertificationDate = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary + "99"};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CertificationId = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary + "99"};
  font-family: monospace;
  background: ${({ theme }) => theme.text_primary + "10"};
  padding: 4px 8px;
  border-radius: 6px;
  display: inline-block;
`;

const ViewAllButton = styled.button`
  margin-top: 30px;
  padding: 12px 24px;
  background: ${({ theme }) => theme.primary + "10"};
  border: 1px solid ${({ theme }) => theme.primary + "50"};
  border-radius: 12px;
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary + "20"};
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

// Modal styles - fixed with higher z-index and proper positioning
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  // Prevent scrolling when modal is open
  overflow: hidden;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.primary + "20"};
  border-radius: 20px;
  padding: 40px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: rgba(23, 92, 230, 0.25) 0px 20px 60px;
  z-index: 1001;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: ${({ theme }) => theme.text_primary + "10"};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.text_primary};
  transition: all 0.3s ease;
  z-index: 1002;

  &:hover {
    background: ${({ theme }) => theme.text_primary + "20"};
  }
`;

const ModalImage = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: contain;
  border-radius: 12px;
  margin-bottom: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + "10"};
`;

const ModalTitle = styled.h2`
  font-size: 32px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 12px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const ModalDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 24px;
`;

const ModalDetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
`;

const CredentialLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: ${({ theme }) => theme.primary + "10"};
  border: 1px solid ${({ theme }) => theme.primary + "30"};
  border-radius: 8px;
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  margin-top: 16px;

  &:hover {
    background: ${({ theme }) => theme.primary + "20"};
    transform: translateY(-2px);
  }
`;

const Certification: React.FC<Props> = ({ openModal, setOpenModal }) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedCert, setSelectedCert] = useState<CertificationType | null>(null);

  // Use certificationsData from your constants
  const displayedCerts = showAll ? certificationsData : certificationsData.slice(0, 2);

  const handleCardClick = (cert: CertificationType) => {
    setSelectedCert(cert);
  };

  const closeModal = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setSelectedCert(null);
  };

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCert]);

  return (
    <Container id="Certifications">
      <Wrapper>
        <Title>Certifications</Title>
        <Desc style={{ marginBottom: "40px" }}>
          Professional certifications and courses I've completed to enhance my skills.
        </Desc>

        <CertificationsContainer>
          {displayedCerts.map((cert: CertificationType, index: number) => (
            // Removed Tilt component for static look
            <CertificationCard key={`cert-${cert.id || index}`} onClick={() => handleCardClick(cert)}>
              <CardBorder />
              {cert.imageUrl && (
                <CertificationImage
                  src={cert.imageUrl}
                  alt={cert.title}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              )}
              <CertificationTitle>{cert.title}</CertificationTitle>
              <CertificationIssuer>
                <Award size={16} />
                {cert.issuer}
              </CertificationIssuer>
              <CertificationDate>
                <Calendar size={14} />
                {cert.date || "Completed"}
              </CertificationDate>
              {cert.certificateId && (
                <CertificationId>ID: {cert.certificateId}</CertificationId>
              )}
            </CertificationCard>
          ))}
        </CertificationsContainer>

        {certificationsData.length > 2 && (
          <ViewAllButton onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Less" : `View All (${certificationsData.length})`}
          </ViewAllButton>
        )}

        {/* Certificate Modal - Only render if selectedCert exists */}
        {selectedCert && (
          <ModalOverlay onClick={closeModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <CloseButton onClick={closeModal}>
                <X size={24} />
              </CloseButton>

              {selectedCert.imageUrl && (
                <ModalImage
                  src={selectedCert.imageUrl}
                  alt={selectedCert.title}
                />
              )}

              <ModalTitle>{selectedCert.title}</ModalTitle>

              <ModalDetails>
                <ModalDetailItem>
                  <Award size={18} />
                  <strong>Issuer:</strong> {selectedCert.issuer}
                </ModalDetailItem>
                {selectedCert.instructor && (
                  <ModalDetailItem>
                    <strong>Instructor:</strong> {selectedCert.instructor}
                  </ModalDetailItem>
                )}
                {selectedCert.skills && selectedCert.skills.length > 0 && (
                  <ModalDetailItem>
                    <strong>Skills:</strong> {selectedCert.skills.join(", ")}
                  </ModalDetailItem>
                )}
                {selectedCert.certificateId && (
                  <ModalDetailItem>
                    <strong>Credential ID:</strong> {selectedCert.certificateId}
                  </ModalDetailItem>
                )}
              </ModalDetails>

              {selectedCert.certificateId && (
                <CredentialLink
                  href={`https://verify.certifier.io/verify/${selectedCert.certificateId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Verify Credential <ExternalLink size={16} />
                </CredentialLink>
              )}
            </ModalContent>
          </ModalOverlay>
        )}
      </Wrapper>
    </Container>
  );
};

export default Certification;