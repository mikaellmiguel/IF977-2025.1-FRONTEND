import React from "react";
import { render } from "@testing-library/react";
import { DespesasTable } from "./index";

describe("DespesasTable", () => {
  const despesas = [
    {
      id: 1,
      descricao: "DIVULGAÇÃO DA ATIVIDADE PARLAMENTAR.",
      valor_documento: 16142.9,
      data_emissao: "2025-07-01T00:00:00",
      fornecedor: "ELIEZER CONCEIÇÃO LIMA",
      sigla_uf: "AP"
    },
    {
      id: 2,
      descricao: "LOCAÇÃO DE VEÍCULOS.",
      valor_documento: 5000.0,
      data_emissao: "2025-07-10T00:00:00",
      fornecedor: "LOCADORA XPTO LTDA",
      sigla_uf: "MT"
    }
  ];

  it("renderiza todas as colunas e linhas corretamente", () => {
    const { getByText } = render(<DespesasTable despesas={despesas} />);
    expect(getByText("Descrição")).toBeInTheDocument();
    expect(getByText("Valor")).toBeInTheDocument();
    expect(getByText("Data")).toBeInTheDocument();
    expect(getByText("Fornecedor")).toBeInTheDocument();
    expect(getByText("UF")).toBeInTheDocument();
    expect(getByText("DIVULGAÇÃO DA ATIVIDADE PARLAMENTAR.")).toBeInTheDocument();
    expect(getByText("LOCAÇÃO DE VEÍCULOS.")).toBeInTheDocument();
    expect(getByText("R$ 16.142,90")).toBeInTheDocument();
    expect(getByText("R$ 5.000,00")).toBeInTheDocument();
    expect(getByText("01/07/2025")).toBeInTheDocument();
    expect(getByText("10/07/2025")).toBeInTheDocument();
    expect(getByText("ELIEZER CONCEIÇÃO LIMA")).toBeInTheDocument();
    expect(getByText("LOCADORA XPTO LTDA")).toBeInTheDocument();
    expect(getByText("AP")).toBeInTheDocument();
    expect(getByText("MT")).toBeInTheDocument();
  });

  it("renderiza tabela vazia sem erros", () => {
    const { container } = render(<DespesasTable despesas={[]} />);
    // Deve renderizar apenas o cabeçalho
    expect(container.querySelectorAll("tbody tr").length).toBe(0);
  });

  it("formata valores e datas corretamente", () => {
    const { getByText } = render(<DespesasTable despesas={despesas} />);
    expect(getByText("R$ 16.142,90")).toBeInTheDocument();
    expect(getByText("01/07/2025")).toBeInTheDocument();
  });
});
