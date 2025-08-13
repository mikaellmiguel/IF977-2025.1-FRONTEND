import styled from "styled-components";

export const EmptyMessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  width: 100%;
`;

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
  gap: 1rem;

  >h1 {
    text-align: center;
    margin-bottom: 2rem;
  }
`;

export const MetricsCardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
`;

export const GraphicsContainer = styled.div`
    display: grid;
    grid-template-areas:
      "ano ranking"
      "estado estado"
      "partido partido"
      "tipo tipo";

    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    width: 100%;
`;
