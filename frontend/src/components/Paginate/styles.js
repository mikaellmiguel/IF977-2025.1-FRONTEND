import styled from "styled-components";
import ReactPaginate from "react-paginate";
import theme from "../../styles/theme";

export const StyledPaginate = styled(ReactPaginate)`
    display: flex;
    list-style: none;
    gap: 8px;
    padding: 0;

    li {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 36px;
        min-height: 36px;
        padding: 0 12px;
        border: 1px solid #ccc;
        cursor: pointer;
        border-radius: 8px;
        user-select: none;
        transition: background 0.2s, box-shadow 0.2s;
        font-size: 1.1rem;
        position: relative;
        z-index: 1;
    }

    li.previous,
    li.next {
        min-width: 3rem;
        padding: 0 1.5rem;
        font-weight: 500;
        color: ${theme.COLORS.PRIMARY};
    }

    li > a,
    li > span {
        position: absolute;
        inset: 0;
        min-width: 0;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 2;
        background: transparent;
        border-radius: 8px;
        text-decoration: none;
        color: inherit;
    }

    li:hover {
        background: #e0e0e0;
        box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    }

    li.active {
        background-color: ${theme.COLORS.BLUE_500};
        color: white;
        font-weight: bold;
        box-shadow: 0 2px 8px rgba(30,144,255,0.10);
    }
`;