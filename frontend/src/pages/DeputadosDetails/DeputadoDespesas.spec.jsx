import { render, screen, fireEvent } from "@testing-library/react";
import { DeputadoDespesas } from "./DeputadoDespesas";

const tipos = ["Tipo1", "Tipo2"];
const estados = ["PE", "SP"];
const despesasMock = [
  {
    id: 1,
    descricao: "Tipo1",
    valor_documento: 100,
    data_emissao: "2025-08-09",
    fornecedor: "Fornecedor1",
    sigla_uf: "PE"
  },
  {
    id: 2,
    descricao: "Tipo2",
    valor_documento: 200,
    data_emissao: "2025-08-08",
    fornecedor: "Fornecedor2",
    sigla_uf: "SP"
  }
];

function setup(props = {}) {
  const setPage = jest.fn();
  const setFiltros = jest.fn();
  render(
    <DeputadoDespesas
      tipos={tipos}
      estados={estados}
      despesas={despesasMock}
      totalPages={2}
      page={1}
      setPage={setPage}
      setFiltros={setFiltros}
      {...props}
    />
  );
  return { setPage, setFiltros };
}

describe("DeputadoDespesas", () => {
  it("renderiza filtros, tabela e paginação", () => {
    setup();
    expect(screen.getByText("Despesas")).toBeInTheDocument();

    // Garantir que pegamos apenas o TD da tabela
    const tipo1Td = screen.getAllByText("Tipo1").find(el => el.tagName === "TD");
    const tipo2Td = screen.getAllByText("Tipo2").find(el => el.tagName === "TD");
    expect(tipo1Td).toBeTruthy();
    expect(tipo2Td).toBeTruthy();

    const peTd = screen.getAllByText("PE").find(el => el.tagName === "TD");
    const spTd = screen.getAllByText("SP").find(el => el.tagName === "TD");
    expect(peTd).toBeTruthy();
    expect(spTd).toBeTruthy();

    // Verificar todos os dados da tabela
    despesasMock.forEach(despesa => {
      expect(screen.getAllByText(despesa.descricao).find(el => el.tagName === "TD")).toBeTruthy();
      expect(screen.getByText(`R$ ${despesa.valor_documento.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`)).toBeInTheDocument();
      expect(screen.getByText(new Date(despesa.data_emissao).toLocaleDateString("pt-BR"))).toBeInTheDocument();
      expect(screen.getByText(despesa.fornecedor)).toBeInTheDocument();
      expect(screen.getAllByText(despesa.sigla_uf).find(el => el.tagName === "TD")).toBeTruthy();
    });
  });

  it("chama setFiltros e setPage ao filtrar", () => {
    const { setPage, setFiltros } = setup();
    fireEvent.change(screen.getByDisplayValue("Tipo"), { target: { value: "Tipo1" } });
    fireEvent.click(screen.getByText("Filtrar"));
    expect(setPage).toHaveBeenCalledWith(1);
    expect(setFiltros).toHaveBeenCalledWith({ tipo: "Tipo1" });
  });

  it("chama setFiltros e setPage ao limpar filtros", () => {
    const { setPage, setFiltros } = setup();
    fireEvent.change(screen.getByDisplayValue("Tipo"), { target: { value: tipos[0] } });
    fireEvent.click(screen.getByText("Limpar"));
    expect(setPage).toHaveBeenCalledWith(1);
    expect(setFiltros).toHaveBeenCalledWith({});
  });

  it("chama setPage ao mudar página na paginação", () => {
    const { setPage } = setup();
    const nextBtn = screen.getByText("»");
    fireEvent.click(nextBtn);
    expect(setPage).toHaveBeenCalled();
  });
});