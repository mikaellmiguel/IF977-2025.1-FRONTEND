
import styled from "styled-components";

export const GridDeputados = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`;


export const CardRanking = styled.div`
  display: flex;
  align-items: center;
  background: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 1rem;
  min-height: 6rem;
  gap: 1.5rem;
  border: 1px solid #eee;
  transition: 0.3s;

  &:hover {
    scale: 1.02;
    filter: brightness(0.9);
    cursor: pointer;
  }

  &:active {
    scale: 0.95;
    filter: brightness(1);
  }
`;

export const FotoArea = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
  }
`;

export const InfoArea = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const TotalArea = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  color: #222;
  margin-left: auto;
`;




