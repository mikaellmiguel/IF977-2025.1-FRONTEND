import styled from "styled-components";
import theme from "../../styles/theme";

export const FiltersForm = styled.form`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  align-items: center;
  justify-content: center;
`;

export const Select = styled.select`
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 0.875rem;
`;

export const Input = styled.input`
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 0.875rem;
  width: 120px;
`;

export const Button = styled.button`
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  border: none;
  background: ${theme.COLORS.SECONDARY};
  color: #fff;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #005fa3;
  }
`;
