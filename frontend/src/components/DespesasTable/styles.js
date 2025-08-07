import styled from "styled-components";

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 1.5rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  color: #222;
  font-size: 1rem;
`;

export const Thead = styled.thead`
  background: #f5f5f5;
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  &:nth-child(even) {
    background: #f9f9f9;
  }
`;

export const Th = styled.th`
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 2px solid #e0e0e0;
`;

export const Td = styled.td`
  padding: 0.75rem 1rem;
  font-size: 0.75rem;
  border-bottom: 1px solid #e0e0e0;
`;
