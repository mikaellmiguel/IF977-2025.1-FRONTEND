import styled from 'styled-components';
import theme from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  label {
    color: white;
    margin-bottom: 0.5rem;
    font-weight: bold;
    font-size: 1rem;
  }

  input {
    background-color: white;
    border: 2px solid white;
    color: ${theme.COLORS.SECONDARY};
    border-radius: 8px;
    padding: 0.5rem;
    font-size: 1rem;

    &::placeholder {
      color: ${theme.COLORS.BG_400};
    }
  }
`;	