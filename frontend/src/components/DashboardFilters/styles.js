import styled from "styled-components";

export const Filtros = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 2rem;
`;

export const FiltroLabel = styled.label`
  font-weight: 500;
  margin-right: 0.5rem;
`;

export const FiltroSelect = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #fff;
  font-size: 1rem;
`;
