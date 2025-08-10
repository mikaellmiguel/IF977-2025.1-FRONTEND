import styled from 'styled-components';
import theme from '../../styles/theme';

export const Container = styled.div`
  min-height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;

export const BackButton = styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;
  background: none;
  border: none;
  color: ${theme.COLORS.PRIMARY};
  font-size: 1rem;
  cursor: pointer;
`;

export const Card = styled.div`
  margin-top: 4rem;
  background: ${theme.COLORS.BG_600};
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  border-radius: 1rem;
  padding: 2rem 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 340px;
`;

export const Title = styled.h2`
  color: ${theme.COLORS.PRIMARY};
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  color: ${theme.COLORS.BG_200};
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const CodeInputs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const CodeInput = styled.input`
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  border: 2px solid
    ${props => props.$invalid
      ? '#e53e3e'
      : props.$active
        ? theme.COLORS.SECONDARY
        : theme.COLORS.PRIMARY};
  background: ${theme.COLORS.BG_100};
  color: ${theme.COLORS.PRIMARY};
  font-size: 2rem;
  text-align: center;
  outline: none;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  transition: border-color 0.2s;
`;

export const ResendText = styled.div`
  color: ${theme.COLORS.BG_200};
  font-size: 0.95rem;
  margin-top: 0.5rem;
  text-align: center;
  span {
    color: ${theme.COLORS.PRIMARY};
    cursor: pointer;
    font-weight: 600;
  }
`;
