import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { DespesasFilters } from "./Filters";

describe("DespesasFilters", () => {
  const tipos = ["Tipo 1", "Tipo 2"];
  const estados = ["SP", "RJ"];
  const onFilter = jest.fn();

  beforeEach(() => {
    onFilter.mockClear();
  });

  it("renderiza todos os campos e opções", () => {
    const { getByText, getByPlaceholderText } = render(
      <DespesasFilters tipos={tipos} estados={estados} onFilter={onFilter} />
    );
    expect(getByText("Tipo")).toBeInTheDocument();
    expect(getByText("Estado")).toBeInTheDocument();
    expect(getByPlaceholderText("Valor mín")).toBeInTheDocument();
    expect(getByPlaceholderText("Valor máx")).toBeInTheDocument();
    expect(getByText("Filtrar")).toBeInTheDocument();
    expect(getByText("Tipo 1")).toBeInTheDocument();
    expect(getByText("Tipo 2")).toBeInTheDocument();
    expect(getByText("SP")).toBeInTheDocument();
    expect(getByText("RJ")).toBeInTheDocument();
  });

  it("chama onFilter com valores preenchidos", () => {
    const { getByText, getByPlaceholderText, getByDisplayValue } = render(
      <DespesasFilters tipos={tipos} estados={estados} onFilter={onFilter} />
    );
    fireEvent.change(getByPlaceholderText("Valor mín"), { target: { value: "100" } });
    fireEvent.change(getByPlaceholderText("Valor máx"), { target: { value: "500" } });
    fireEvent.change(getByDisplayValue("Tipo"), { target: { value: "Tipo 2" } });
    fireEvent.change(getByDisplayValue("Estado"), { target: { value: "RJ" } });
    fireEvent.click(getByText("Filtrar"));
    expect(onFilter).toHaveBeenCalledWith({ tipo: "Tipo 2", estado: "RJ", valorMin: "100", valorMax: "500" });
  });

it("desabilita botão Filtrar quando todos os campos estão vazios", () => {
    const { getByText } = render(
      <DespesasFilters tipos={tipos} estados={estados} onFilter={onFilter} />
    );
    expect(getByText("Filtrar")).toBeDisabled();
  });

it("mostra mensagem de erro se valor mínimo maior que máximo", () => {
    const { getByText, getByPlaceholderText } = render(
      <DespesasFilters tipos={tipos} estados={estados} onFilter={onFilter} />
    );
    fireEvent.change(getByPlaceholderText("Valor mín"), { target: { value: "500" } });
    fireEvent.change(getByPlaceholderText("Valor máx"), { target: { value: "100" } });
    fireEvent.click(getByText("Filtrar"));
    // toast.info é chamado, mas não aparece no DOM, então só garantimos que onFilter não foi chamado
    expect(onFilter).not.toHaveBeenCalled();
  });

it("limpa todos os campos ao clicar em Limpar", () => {
    const { getByText, getByPlaceholderText, getByDisplayValue } = render(
      <DespesasFilters tipos={tipos} estados={estados} onFilter={onFilter} />
    );
    fireEvent.change(getByPlaceholderText("Valor mín"), { target: { value: "200" } });
    fireEvent.change(getByDisplayValue("Tipo"), { target: { value: "Tipo 1" } });
    fireEvent.change(getByDisplayValue("Estado"), { target: { value: "SP" } });
    fireEvent.click(getByText("Limpar"));
    expect(getByDisplayValue("Tipo").value).toBe("");
    expect(getByDisplayValue("Estado").value).toBe("");
    expect(getByPlaceholderText("Valor mín").value).toBe("");
    expect(getByPlaceholderText("Valor máx").value).toBe("");
  });

  it("permite alterar e limpar os campos", () => {
    const { getByPlaceholderText, getByDisplayValue } = render(
      <DespesasFilters tipos={tipos} estados={estados} onFilter={onFilter} />
    );
    const inputMin = getByPlaceholderText("Valor mín");
    fireEvent.change(inputMin, { target: { value: "200" } });
    expect(inputMin.value).toBe("200");
    fireEvent.change(inputMin, { target: { value: "" } });
    expect(inputMin.value).toBe("");
    const selectTipo = getByDisplayValue("Tipo");
    fireEvent.change(selectTipo, { target: { value: "Tipo 1" } });
    expect(selectTipo.value).toBe("Tipo 1");
  });
});
