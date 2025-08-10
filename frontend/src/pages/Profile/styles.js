import styled from "styled-components";
import Modal from "react-modal";
import theme from "../../styles/theme";

export const Container = styled.div`
    display: flex;
    min-height: 100vh;
    background-color: ${theme.COLORS.PRIMARY};
`

export const Content = styled.div`
    display: flex;
    gap: 3rem;
    padding: 4rem 5rem 0rem 5rem;
    width: 100%;
    max-width: 1366px;
    place-items: center;
    min-height: 100vh;
    margin: 0 auto;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 50%;
`;

export const Options = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem;
    flex-direction: column;
`;

// Styled Modal Component
export const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${theme.COLORS.PRIMARY};
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 40vw;
  outline: none;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;