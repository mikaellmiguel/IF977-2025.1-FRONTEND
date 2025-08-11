import {styled} from "styled-components";

export const Podio = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const PodioItem = styled.div`
  background: ${({ $destaque }) => $destaque ? '#fffbe6' : '#f0f0f0'};
  border: ${({ $destaque }) => $destaque ? '2px solid #d4af37' : '1px solid #eee'};
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 1.2rem 2rem;
  min-width: 16rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  transition: 0.3s;

  > img {
    height: 8rem;
    border-radius: 0.5rem;
  }

  &:hover {
    scale: 1.05;
    filter: brightness(0.9);
    cursor: pointer;
  }

  &:active {
    scale: 0.95;
    filter: brightness(1);
  }

`;

