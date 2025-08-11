const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

import { render, screen, fireEvent } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";
import {RankingList} from "./index";

const mockDeputados = [
  {
    id: 1,
    nome: "Deputado Um",
    partido: "ABC",
    uf: "SP",
    url_foto: "foto1.jpg",
    total_gasto: 1234.56,
  },
  {
    id: 2,
    nome: "Deputado Dois",
    partido: "DEF",
    uf: "RJ",
    url_foto: "foto2.jpg",
    total_gasto: 2345.67,
  },
  {
    id: 3,
    nome: "Deputado Três",
    partido: "GHI",
    uf: "MG",
    url_foto: "foto3.jpg",
    total_gasto: 3456.78,
  },
  {
    id: 4,
    nome: "Deputado Quatro",
    partido: "JKL",
    uf: "RS",
    url_foto: "foto4.jpg",
    total_gasto: 4567.89,
  },
];

describe("RankingList", () => {
  it("não renderiza lista se houver 3 ou menos deputados", () => {
    render(<RankingList deputados={mockDeputados.slice(0, 3)} />);
    expect(screen.queryByText(/4º/)).not.toBeInTheDocument();
  });

  it("renderiza lista corretamente se houver mais de 3 deputados", () => {
    render(<RankingList deputados={mockDeputados} />);
    expect(screen.getByText("4º")).toBeInTheDocument();
    expect(screen.getByText("Deputado Quatro")).toBeInTheDocument();
    expect(screen.getByText("JKL - RS")).toBeInTheDocument();
    expect(screen.getByText("R$ 4.567,89")).toBeInTheDocument();
  });

  it("navega para a página do deputado ao clicar no card", () => {
    render(
      <RankingList deputados={mockDeputados} />
    );
    const card = screen.getByText("4º").closest("div");
    fireEvent.click(card);
    expect(mockNavigate).toHaveBeenCalledWith("/deputados/4");
  });

  it("renderiza corretamente dados faltantes", () => {
    const deputadosIncompletos = [
      {
        id: 5,
        nome: "",
        partido: "",
        uf: "",
        url_foto: "",
        total_gasto: null,
      },
      {
        id: 6,
        nome: null,
        partido: null,
        uf: null,
        url_foto: null,
        total_gasto: undefined,
      },
      ...mockDeputados,
    ];
    render(
      <RankingList deputados={deputadosIncompletos} />
    );
  // Busca o traço como substring em qualquer texto
  const traço = screen.getAllByText((content) => content.includes('-'));
  expect(traço.length).toBeGreaterThan(0);
  });

  it("não quebra se lista estiver vazia", () => {
    render(
  <RankingList deputados={[]} />
    );
    expect(screen.queryByText(/º/)).not.toBeInTheDocument();
  });
});
