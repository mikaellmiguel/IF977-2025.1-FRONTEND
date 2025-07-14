import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
    display: flex;
    gap: 0.5rem;
    border-radius: 12px;
    padding: 0 1rem;
    width: 70vw;

    background-color: ${theme.COLORS.BLUE_500};

    align-items: center;

    input {
        width: 100%;
        padding: 0.5rem;
        border: none;
        background-color: transparent;

        &:active, &:focus {
            outline: none;
        }

        font-size: 1.2rem;
        color: white;

        &::placeholder {
            color: rgba(255, 255, 255, 0.8);
        }
    }

    svg {
        font-size: 1.5rem;
        color: white;
    }

    &:active, &:focus-within{
        border: 2px solid black;
    }
`;