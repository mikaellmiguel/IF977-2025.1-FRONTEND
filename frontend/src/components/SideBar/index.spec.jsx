import React from "react";
import { render, screen } from "@testing-library/react";
import { SideBar } from ".";

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
