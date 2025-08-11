export const EmptyMessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  width: 100%;
`;
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background: white;
`;

export const Content = styled.div`
  flex: 1;
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  >h1 {
    text-align: center;
    margin-bottom: 2rem;
  }
`;

