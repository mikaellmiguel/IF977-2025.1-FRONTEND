
import { render, screen } from "@testing-library/react";
import { DeputadoContato } from "./DeputadoContato";

const deputadoCompleto = {
  telefone: "(81) 99999-9999",
  email: "teste@camara.leg.br",
  gabinete: { nome: "A1", predio: "Principal", sala: "101" },
  redes_social: [
    "https://twitter.com/deputado",
    "https://facebook.com/deputado"
  ]
};

const deputadoSemDados = {};

describe("DeputadoContato", () => {
  it("renderiza todos os dados de contato quando presentes", () => {
    render(<DeputadoContato deputado={deputadoCompleto} />);
    expect(screen.getByText(/Telefone:/).parentElement).toHaveTextContent(deputadoCompleto.telefone);
    expect(screen.getByText(/Email:/).parentElement).toHaveTextContent(deputadoCompleto.email);
    expect(screen.getByText(/Gabinete/).parentElement).toHaveTextContent("Gabinete A1, Prédio Principal, Sala 101");
  });

  it("renderiza redes sociais como links", () => {
    render(<DeputadoContato deputado={deputadoCompleto} />);
    deputadoCompleto.redes_social.forEach(url => {
      const link = screen.getByText(url);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", url);
      expect(link).toHaveAttribute("target", "_blank");
    });
  });

  it("mostra 'Não Informado' quando dados estão ausentes", () => {
    render(<DeputadoContato deputado={deputadoSemDados} />);
    expect(screen.getByText(/Telefone:/).parentElement).toHaveTextContent("Não Informado");
    expect(screen.getByText(/Email:/).parentElement).toHaveTextContent("Não Informado");
    expect(screen.getByText(/Gabinete/).parentElement).toHaveTextContent("Gabinete Não Informado, Prédio Não Informado, Sala Não Informado");
  });

  it("renderiza corretamente quando gabinete está ausente", () => {
    const deputado = { ...deputadoCompleto, gabinete: undefined };
    render(<DeputadoContato deputado={deputado} />);
    expect(screen.getByText(/Gabinete/).parentElement).toHaveTextContent("Gabinete Não Informado, Prédio Não Informado, Sala Não Informado");
  });

  it("renderiza corretamente quando redes sociais estão ausentes", () => {
    const deputado = { ...deputadoCompleto, redes_social: undefined };
    render(<DeputadoContato deputado={deputado} />);
    // Não deve renderizar nenhum link
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("renderiza corretamente quando redes sociais é array vazio", () => {
    const deputado = { ...deputadoCompleto, redes_social: [] };
    render(<DeputadoContato deputado={deputado} />);
    expect(screen.queryByRole("link")).toBeNull();
  });
});
