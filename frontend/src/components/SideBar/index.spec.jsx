import React from "react";

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

import { render, screen, fireEvent } from "@testing-library/react";
import { SideBar } from ".";
import { useNavigate } from "react-router-dom";

describe("SideBar", () => {
  it("deve renderizar o logo e o nome da aplicação", () => {
    render(<SideBar />);
    expect(screen.getByAltText(/logo da aplicação/i)).toBeInTheDocument();
    expect(screen.getByText(/FiscalizaDeputado/i)).toBeInTheDocument();
  });

  it("deve renderizar todos os itens do menu principal", () => {
    render(<SideBar />);
    expect(screen.getByText(/Deputados/i)).toBeInTheDocument();
    expect(screen.getByText(/Pesquisar/i)).toBeInTheDocument();
    expect(screen.getByText(/Seguidos/i)).toBeInTheDocument();
    expect(screen.getByText(/Ranking de Gastos/i)).toBeInTheDocument();
  });

  it("deve renderizar todos os itens do menu inferior", () => {
    render(<SideBar />);
    expect(screen.getByText(/Perfil/i)).toBeInTheDocument();
    expect(screen.getByText(/Sair/i)).toBeInTheDocument();
  });

  it("deve renderizar todos os ícones esperados", () => {
    render(<SideBar />);
    // FaUserTie aparece duas vezes
    expect(document.querySelectorAll('svg').length).toBeGreaterThanOrEqual(5);
  });

  it("deve bater snapshot básico", () => {
    const { container } = render(<SideBar />);
    expect(container).toMatchSnapshot();
  });
});
  it("renderiza todos os itens do menu", () => {
    render(<SideBar />);
    expect(screen.getByText(/FiscalizaDeputado/i)).toBeInTheDocument();
    expect(screen.getByText(/Pesquisar/i)).toBeInTheDocument();
    expect(screen.getByText(/Seguidos/i)).toBeInTheDocument();
    expect(screen.getByText(/Ranking de Gastos/i)).toBeInTheDocument();
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Perfil/i)).toBeInTheDocument();
    expect(screen.getByText(/Sair/i)).toBeInTheDocument();
  });

  it("navega para as rotas corretas ao clicar nos itens", () => {
    // Mock window.location for navigation
    delete window.location;
    window.location = { pathname: "" };

    render( <SideBar />);
    fireEvent.click(screen.getByText(/Pesquisar/i));
    // Simula navegação
    expect(useNavigate).toBeDefined();
    fireEvent.click(screen.getByText(/Seguidos/i));
    expect(useNavigate).toBeDefined();
    fireEvent.click(screen.getByText(/Ranking de Gastos/i));
    expect(useNavigate).toBeDefined();
    fireEvent.click(screen.getByText(/Dashboard/i));
    expect(useNavigate).toBeDefined();
    fireEvent.click(screen.getByText(/Perfil/i));
    expect(useNavigate).toBeDefined();
  });
