import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from ".";

describe("SearchBar", () => {
  it("deve renderizar o input e o ícone de busca", () => {
    render(<SearchBar placeholder="Buscar..." />);
    const input = screen.getByPlaceholderText("Buscar...");
    expect(input).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")).toHaveLength(1);
    const svg = input.parentElement.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("deve repassar props para o input", () => {
    render(<SearchBar name="pesquisa" maxLength={10} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("name", "pesquisa");
    expect(input).toHaveAttribute("maxLength", "10");
  });

  it("deve disparar evento onChange ao digitar", () => {
    const onChange = jest.fn();
    render(<SearchBar onChange={onChange} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "abc" } });
    expect(onChange).toHaveBeenCalled();
  });

  it("deve aceitar valor controlado", () => {
    render(<SearchBar value="teste" readOnly />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("teste");
  });

  it("deve bater snapshot básico", () => {
    const { container } = render(<SearchBar placeholder="Pesquisar..." />);
    expect(container).toMatchSnapshot();
  });
});
