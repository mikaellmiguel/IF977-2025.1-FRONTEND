
import { render, screen, fireEvent } from "@testing-library/react";
import { DeputadoSidebar } from "./DeputadoSidebar";

const deputadoMock = {
  url_foto: "https://foto.com/foto.jpg",
  nome: "Fulano de Tal",
  partido: "ABC",
  sigla_uf: "PE",
  escolaridade: "Superior Completo",
  data_nascimento: "1980-01-01"
};

describe("DeputadoSidebar", () => {
  it("renderiza todos os dados do deputado", () => {
    render(<DeputadoSidebar deputado={deputadoMock} onBack={() => {}} isFollowing={true} />);
    expect(screen.getByText("Fulano de Tal")).toBeInTheDocument();
    expect(screen.getByText("ABC")).toBeInTheDocument();
    expect(screen.getByText("PE")).toBeInTheDocument();
    expect(screen.getByText("Superior Completo")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", deputadoMock.url_foto);
    expect(screen.getByText(/Deixar de Seguir/)).toBeInTheDocument();
    expect(screen.getByText("← Voltar")).toBeInTheDocument();
  });

  it("renderiza corretamente quando dados estão ausentes", () => {
    render(<DeputadoSidebar deputado={{}} onBack={() => {}} />);
    const notInformedElements = screen.getAllByText("Não Informado");
    expect(notInformedElements.length).toBeGreaterThan(0);
    notInformedElements.forEach(element => {
      expect(element).toBeInTheDocument();
    });
  });

  it("chama onBack ao clicar no botão de voltar", () => {
    const onBack = jest.fn();
    render(<DeputadoSidebar deputado={deputadoMock} onBack={onBack} />);
    fireEvent.click(screen.getByText("← Voltar"));
    expect(onBack).toHaveBeenCalled();
  });

  it("renderiza botão de favoritos quando isFollowing é true", () => {
    render(<DeputadoSidebar deputado={deputadoMock} onBack={() => {}} isFollowing={true} />);
    expect(screen.getByText(/Deixar de Seguir/)).toBeInTheDocument();
  });
});
