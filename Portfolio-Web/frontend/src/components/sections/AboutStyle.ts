import styled from 'styled-components';
import _default from '../../themes/default';

// Define the theme interface for type safety
interface Theme {
  text_primary: string;
  primary: string;
}

// Styled components with TypeScript
export const SocialMediaIcons = styled.div`
  display: flex;
  margin-top: 1rem;
`;

export const SocialMediaIcon = styled.a<{ theme: Theme }>`
  display: inline-block;
  margin: 0 1rem;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text_primary};
  transition: color 0.2s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;