import styled from "styled-components";

export const Container = styled.div`
    height: 100vh;
    display: flex;
    overflow: hidden;
`

export const Content = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    justify-content: center;
    align-items: center;
`

export const GridDeputados = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    grid-auto-rows: 10rem;
    padding: 1rem;
    gap: 0.5rem; 
    width: 100%;
    overflow-y: auto;
`;


