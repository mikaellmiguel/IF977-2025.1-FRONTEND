export const GraficosGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 2rem 0;
`;

export const GraficoBox = styled.div`
  background: #f0f0f0;
  border-radius: 8px;
  padding: 1rem;
`;

import styled from 'styled-components';
import theme from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  font-family: Arial, sans-serif;
  color: white;
`;

export const Sidebar = styled.div`
  width: 25%;
  height: 100%;
  padding: 1.25rem;
  background-color: ${theme.COLORS.PRIMARY};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);

  img {
    width: 10rem;
    object-fit: cover;
    object-position: center;
    border-radius: 0.7rem;
  }
`;

export const BackButton = styled.button`
  align-self: flex-start;
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 2rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const DeputadoName = styled.h2`
  font-size: 1.5rem;
  margin: 1rem 0;
`;

export const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.60rem 0;
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;

export const InfoItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 1rem;
  margin-bottom: 0.5rem;

  & svg {
    font-size: 1.25rem;
    margin-right: 0.5rem;
  }
`;

export const MainContent = styled.div`
  flex: 1;
  padding: 1rem 2rem; 
  color: black;
  overflow-y: auto;
`;

export const SectionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
  border-bottom: 1px solid #000;
`;

export const ContactRow = styled.div`
  display: flex;
  width: 100%;
  gap: 2rem;
  flex-wrap: wrap;
`;

export const ContactCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.95rem;

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }

  a {
    color: #0077cc;
    text-decoration: none;
    word-break: break-all;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const PaginateWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0 1rem 0;
`;