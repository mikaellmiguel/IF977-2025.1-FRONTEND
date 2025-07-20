import {StyledPaginate} from "./styles";

export function Paginate({ pageCount, onPageChange }) {

    return (
        <StyledPaginate 
            pageCount={pageCount}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            onPageChange={({selected}) => onPageChange(selected+1)}
            containerClassName="pagination"
            activeClassName="active"
            previousLabel="«"
            nextLabel="»"
        />
    )
}