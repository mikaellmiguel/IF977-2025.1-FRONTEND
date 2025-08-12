import styled from "styled-components";

export const medalColors = [
  '#FFD700', // ouro
  '#C0C0C0', // prata
  '#CD7F32'  // bronze
];
export const defaultColor = "#e0e0e0";

export const GridFornecedores = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
`;

export const CardFornecedor = styled.div`
  display: flex;
  align-items: center;
  background: #fafafa;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 1rem 1.5rem;
  gap: 1.5rem;
`;

export const Medal = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #333;
  font-size: 1.1rem;
`;
