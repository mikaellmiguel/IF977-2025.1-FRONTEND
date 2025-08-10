import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const Left = styled.div`
  display: flex;
  flex: 0.8;
  flex-direction: column;
  color: white;

  justify-content: center;
  height: 100vh;
  
  gap: 2rem;
  padding: 3rem;
  color: ${theme.COLORS.BG_600};

  img {
    width: 5rem;
    filter: brightness(0) invert(1);
  }

  background: ${theme.COLORS.PRIMARY};
  background: linear-gradient(90deg, rgba(47, 121, 88, 1) 50%, rgba(71, 194, 139, 1) 100%);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.50);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Img = styled.div`
  flex: 1;
  background-image: url("src/assets/sigin.png");
  background-size: cover;
  background-position: center;
  filter: brightness(0.8);
`;