import styled from "styled-components";

export const Card = styled.div`
  background: #f0f0f0;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-width: 220px;
  min-height: 120px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
`;

export const Label = styled.div`
  font-size: 1rem;
  color: #555;
  margin-bottom: 0.5rem;
`;

export const Value = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #222;
`;
