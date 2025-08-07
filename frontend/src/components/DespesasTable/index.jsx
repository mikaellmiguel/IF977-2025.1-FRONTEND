import React from "react";
import PropTypes from "prop-types";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "./styles";

export function DespesasTable({ despesas }) {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Descrição</Th>
            <Th>Valor</Th>
            <Th>Data</Th>
            <Th>Fornecedor</Th>
            <Th>UF</Th>
          </Tr>
        </Thead>
        <Tbody>
          {despesas.map((despesa) => (
            <Tr key={despesa.id}>
              <Td>{despesa.descricao}</Td>
              <Td>R$ {despesa.valor_documento.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</Td>
              <Td>{new Date(despesa.data_emissao).toLocaleDateString("pt-BR")}</Td>
              <Td>{despesa.fornecedor}</Td>
              <Td>{despesa.sigla_uf}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

DespesasTable.propTypes = {
  despesas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      descricao: PropTypes.string.isRequired,
      valor_documento: PropTypes.number.isRequired,
      data_emissao: PropTypes.string.isRequired,
      fornecedor: PropTypes.string.isRequired,
      sigla_uf: PropTypes.string.isRequired,
    })
  ).isRequired,
};
