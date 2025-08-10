import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: white;
  h1 {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1.5rem;
  }

  height: 100vh; 
`;

export const Content = styled.div`
  flex: 1;
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const GridDeputados = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`;
