import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.button`
    background-color: #fff;
    color: ${theme.COLORS.PRIMARY};
    border: none;
    padding: 1rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    transition: 0.3s;
    width: fit-content;

    &:hover {
        filter: brightness(1.2);
        transform: scale(1.1);
    }

    &:active{
        transform: scale(0.9);
    }
`