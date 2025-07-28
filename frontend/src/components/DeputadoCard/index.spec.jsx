import React from "react";
import { render, screen } from "@testing-library/react";
import { DeputadoCard } from ".";
import { calcularIdade } from "../../utils/calcularIdade";
import { formatarDataBR } from "../../utils/formatarDataBR";

const deputadoMock = {
  id: 1,
  nome: "João da Silva",
  partido: "ABC",
  sigla_uf: "PE",
  data_nascimento: "1980-05-15",
  url_foto: "https://example.com/foto.jpg",
};

describe("DeputadoCard", () => {
  it("deve renderizar todos os dados do deputado", () => {
    render(<DeputadoCard deputado={deputadoMock} />);
    expect(screen.getByText("João da Silva")).toBeInTheDocument();
    expect(screen.getByText(/Partido:/).parentElement).toHaveTextContent(/Partido:\s*ABC/);
    expect(screen.getByText(/Estado:/).parentElement).toHaveTextContent(/Estado:\s*PE/);
    expect(screen.getByText(/Nascimento:/).parentElement).toHaveTextContent(/Nascimento:\s*15\/05\/1980/);
    expect(screen.getByText(new RegExp(calcularIdade(deputadoMock.data_nascimento)))).toBeInTheDocument();
  });

  it("deve renderizar a imagem com alt correto", () => {
    render(<DeputadoCard deputado={deputadoMock} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", deputadoMock.url_foto);
    expect(img).toHaveAttribute(
      "alt",
      `${deputadoMock.nome} - ${deputadoMock.partido}`
    );
  });

  it("deve renderizar corretamente para diferentes partidos e estados", () => {
    const deputadoOutro = { ...deputadoMock, partido: "XYZ", sigla_uf: "SP" };
    render(<DeputadoCard deputado={deputadoOutro} />);
    expect(screen.getByText(/Partido:/).parentElement).toHaveTextContent(/Partido:\s*XYZ/);
    expect(screen.getByText(/Estado:/).parentElement).toHaveTextContent(/Estado:\s*SP/);
  });

  it("deve renderizar corretamente para datas de nascimento diferentes", () => {
    const deputadoNovo = { ...deputadoMock, data_nascimento: "2000-01-01" };
    render(<DeputadoCard deputado={deputadoNovo} />);
    expect(screen.getByText(new RegExp(formatarDataBR("2000-01-01")))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(calcularIdade("2000-01-01")))).toBeInTheDocument();
  });
});
