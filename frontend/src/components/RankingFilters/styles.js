import {styled} from "styled-components";

export const Filtros = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const FiltroLabel = styled.label`
  font-size: 1rem;
  color: #555;
  font-weight: 500;
`;

export const FiltroInput = styled.input`
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
  min-width: 60px;
`;

export const FiltroSelect = styled.select`
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;
