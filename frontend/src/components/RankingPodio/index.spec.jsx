const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));


import { render, screen, fireEvent } from "@testing-library/react";
import { RankingPodio } from ".";

const mockDeputados = [
  {
    id: 1,
    nome: "Deputado Ouro",
    partido: "PSOL",
    uf: "SP",
    url_foto: "foto1.jpg",
  },
  {
    id: 2,
    nome: "Deputado Prata",
    partido: "PSOL",
    uf: "SP",
    url_foto: "foto2.jpg",
    total_gasto: 9637.52,
  },
  {
    id: 3,
    nome: "Deputado Bronze",
    partido: "PSOL",
    uf: "RJ",
    url_foto: "foto3.jpg",
    total_gasto: 10651.20,
  },
];

describe("RankingPodio", () => {
  it("renderiza os três primeiros deputados com medalhas e dados corretos", () => {
    render(
      <RankingPodio deputados={mockDeputados} />
    );
    expect(screen.getByText("1º")).toBeInTheDocument();
    expect(screen.getByText("2º")).toBeInTheDocument();
    expect(screen.getByText("3º")).toBeInTheDocument();
    expect(screen.getByText("Deputado Ouro")).toBeInTheDocument();
    expect(screen.getByText("Deputado Prata")).toBeInTheDocument();
    expect(screen.getByText("Deputado Bronze")).toBeInTheDocument();
    // Verifica que existem dois elementos "PSOL - SP" e um "PSOL - RJ"
    const psolSpElements = screen.getAllByText("PSOL - SP");
    expect(psolSpElements).toHaveLength(2);
    const psolRjElements = screen.getAllByText("PSOL - RJ");
    expect(psolRjElements).toHaveLength(1);
    expect(screen.getByText("R$ 9.637,52")).toBeInTheDocument();
    expect(screen.getByText("R$ 10.651,20")).toBeInTheDocument();
  });

  it("navega para a página do deputado ao clicar no card", () => {
    render(
      <RankingPodio deputados={mockDeputados} />
    );
  // Seleciona o PodioItem pelo texto do nome do deputado
  const card = screen.getByText("Deputado Ouro").closest("div");
  fireEvent.click(card);
  expect(mockNavigate).toHaveBeenCalledWith("/deputados/1");
  });

  it("renderiza corretamente dados faltantes", () => {
    const deputadosIncompletos = [
      {
        id: 4,
        nome: "",
        partido: "",
        uf: "",
        url_foto: "",
        total_gasto: null,
      },
      {
        id: 5,
        nome: null,
        partido: null,
        uf: null,
        url_foto: null,
        total_gasto: undefined,
      },
      ...mockDeputados,
    ];
    render(
      <RankingPodio deputados={deputadosIncompletos} />
    );
    expect(screen.getAllByText("-", { exact: false }).length).toBeGreaterThan(0);
  });

  it("não quebra se lista estiver vazia", () => {
    render(
        <RankingPodio deputados={[]} />
    );
    expect(screen.queryByText(/º/)).not.toBeInTheDocument();
  });
});
