import styled from 'styled-components';

export const LegendContainer = styled.div`
  max-height: 250px;
  overflow-y: auto;
  padding-right: 8px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  border: 1px solid #eee;
  font-family: 'Roboto', Arial, Helvetica, sans-serif;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  padding: 4px 0;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const ColorBox = styled.span`
  width: 14px;
  height: 14px;
  background: ${({ color }) => color};
  display: inline-block;
  margin-right: 10px;
  border-radius: 3px;
  border: 1px solid #ccc;
`;

export const LegendText = styled.span`
  font-size: 0.875rem;
  color: #222;
  font-weight: 600;
`;