import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.nav`
    width: 20rem;
    height: 100vh;
    background-color: ${theme.COLORS.SECONDARY};
    color: white;
    display: grid;
    grid-template-rows: auto 1fr auto;
`

export const LogoImage = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    padding: 1rem;
    
    > p {
        font-size: 0.875rem;
        font-family: "Poppins", sans-serif;
        color: white;
        text-align: center;
    }

    > img {
        width:50%;
        filter: invert(100%);
    }
`;


export const MainMenu = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1rem 0;

    > p {
        font-size: 1.25rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
        display: block;
        width: 100%;
        text-align: center;
        position: relative;

        &::before {
            content: '';
            position: absolute;
            left: 0;
            bottom: -4px;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, rgba(255, 255, 255,0) 0%, rgba(248, 248, 248, 1) 50%, rgba(255, 255, 255, 0) 100%);
        }
    }
`;


export const MenuItem = styled.a`
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: white;
    font-size: 1rem;
    border-radius: 12px;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
        filter: brightness(1.5);
    }

    svg {
        margin-right: 0.5rem;
        font-size: 1.5rem;
        color: white;
    }

    &:active {
        transform: scale(0.9);
    }

`;

export const BottomMenu = styled.div`
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        left: 0;
        top: -0.5rem;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, rgba(255, 255, 255,0) 0%, rgba(248, 248, 248, 1) 50%, rgba(255, 255, 255, 0) 100%);
    }

    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 0;
    margin-bottom: 2rem;
`

