import styled from "styled-components";
import theme from "../../styles/theme";

export const Card = styled.div`
    background-color: ${theme.COLORS.PRIMARY};
    color: white;
    
    display: flex;
    flex-direction: row;
    gap: 1rem;
    
    padding: 1rem;
    
    width: 20rem;
    height: 8rem;

    border-radius: 0.5rem;

    transition: 300ms;

    &:hover {
        filter: brightness(0.85);
        transform: scale(1.02);
        cursor: pointer;
    }
`

export const CardData = styled.div`
    display: flex;
    flex: 1.25;
    flex-direction: column;

    margin: auto 0;

    h2 {
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
    }

    p {
        font-size: 0.80rem;
        font-family: "Poppins", sans-serif;
    }
`

export const CardImage = styled.img`
    display: flex;
    flex: 0.50;
    object-fit: scale-down;
    width: 100%;
`