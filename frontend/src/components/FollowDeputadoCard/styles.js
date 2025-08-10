import styled from "styled-components";
import theme from "../../styles/theme";

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${theme.COLORS.PRIMARY};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 1rem;
  height: 10rem;
  transition: 0.3s;

  &:hover {
    filter: brightness(0.9);
    cursor: pointer;
    scale: 1.02;
  }

`;

export const FotoArea = styled.div`
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
`;

export const InfoArea = styled.div`
  flex: 2;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  font-size: 0.875rem;
  color: #fff;
  b {
    font-size: 0.875rem;
  }
`;

export const DespesasArea = styled.div`
  flex: 1;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid #fff;
  border-right: 1px solid #fff;
  font-size: 1rem;
  color: #fff;
`;

export const TotalArea = styled.div`
  flex: 1;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  color: #fff;
  b {
    font-size: 1rem;
    color: #fff;
  }
`;
