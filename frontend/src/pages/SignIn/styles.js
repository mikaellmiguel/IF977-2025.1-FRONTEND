import styled from "styled-components";
import theme from "../../styles/theme";
import sign from "../../assets/sigin.png";

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const Left = styled.div`
  display: flex;
  flex: 0.8;
  flex-direction: column;

  justify-content: center;
  height: 100vh;

  color: white;
  gap: 3rem;
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
  background-image: url(${sign});
  background-size: cover;
  background-position: center;
  filter: brightness(0.8);
`;

export const GoogleAuth = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  
  
  

  > div {
    width: 100%;
    transition: 0.3s;
    color: ${theme.COLORS.PRIMARY};
    border-radius: 0.5rem;

    &:hover {
        filter: brightness(1.2);
        transform: scale(1.1);
    }

    &:active{
        transform: scale(0.9);
    }

    div {
      color: ${theme.COLORS.PRIMARY};
      border-radius: 0.5rem;
    }
  }

  > div > div > div > div > div {
      display: flex;
      padding: 1rem;

      > span {
        font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        color: ${theme.COLORS.PRIMARY};
        font-size: 1rem;
      }

      div > svg {
        width: 1rem;
      }
  }

`;
