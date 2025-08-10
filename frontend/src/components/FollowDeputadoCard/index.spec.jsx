import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FollowDeputadoCard } from "./index";

jest.mock("react-router-dom", () => ({
	useNavigate: () => jest.fn()
}));

jest.mock("../../utils/formatarDataBR", () => ({
	formatarDataBR: jest.fn((date) => date ? "01/01/1980" : "Não Informado")
}));

jest.mock("../../utils/calcularIdade", () => ({
	calcularIdade: jest.fn((date) => date ? 45 : "Não Informado")
}));

const deputadoMock = {
	id: 123,
	url_foto: "https://foto.com/foto.jpg",
	nome: "Fulano de Tal",
	partido: "ABC",
	sigla_uf: "PE",
	escolaridade: "Superior Completo",
	data_nascimento: "1980-01-01",
	email: "fulano@camara.leg.br"
};

const despesasMock = {
	2023: 10000.5,
	2024: 20000.75
};

describe("FollowDeputadoCard", () => {
	it("renderiza todos os dados do deputado", () => {
		render(
			<FollowDeputadoCard deputado={deputadoMock} despesasPorAno={despesasMock} totalGasto={30001.25} />
		);
		expect(screen.getByText("Fulano de Tal")).toBeInTheDocument();
		expect(screen.getByText(/Nascimento:/)).toBeInTheDocument();
		expect(screen.getByText(/01\/01\/1980/)).toBeInTheDocument();
		expect(screen.getByText(/45 anos/)).toBeInTheDocument();
		expect(screen.getByText(/Partido:/)).toBeInTheDocument();
		expect(screen.getByText("ABC")).toBeInTheDocument();
		expect(screen.getByText(/Estado:/)).toBeInTheDocument();
		expect(screen.getByText("PE")).toBeInTheDocument();
		expect(screen.getByText(/E-mail:/)).toBeInTheDocument();
		expect(screen.getByText("fulano@camara.leg.br")).toBeInTheDocument();
		expect(screen.getByText(/2023:/)).toBeInTheDocument();
		expect(screen.getByText(/2024:/)).toBeInTheDocument();
		expect(screen.getByText(/Total Gasto/)).toBeInTheDocument();
		expect(screen.getByText("R$ 30.001,25")).toBeInTheDocument();
		expect(screen.getByRole("img")).toHaveAttribute("src", deputadoMock.url_foto);
	});

		it("renderiza corretamente quando dados estão ausentes", () => {
			render(
				<FollowDeputadoCard deputado={{}} despesasPorAno={{}} totalGasto={0} />
			);
			// Busca flexível por 'Não Informado' em múltiplos elementos
			expect(screen.getAllByText((content) => content.includes("Não Informado"))).not.toHaveLength(0);
			expect(screen.getByText("R$ 0,00")).toBeInTheDocument();
		});

	it("navega ao clicar no card", () => {
		const mockNavigate = jest.fn();
		// eslint-disable-next-line no-undef
		jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(mockNavigate);
		render(
			<FollowDeputadoCard deputado={deputadoMock} despesasPorAno={despesasMock} totalGasto={30001.25} />
		);
		fireEvent.click(screen.getByRole("img"));
		// O clique no CardContainer deve chamar navigate
		// Como o CardContainer envolve tudo, pode clicar em qualquer área
		fireEvent.click(screen.getByText("Fulano de Tal"));
		expect(mockNavigate).toHaveBeenCalledWith("/deputados/123");
	});

	it("renderiza despesas por ano corretamente", () => {
		render(
			<FollowDeputadoCard deputado={deputadoMock} despesasPorAno={despesasMock} totalGasto={30001.25} />
		);
		expect(screen.getByText("2023: R$ 10.000,50")).toBeInTheDocument();
		expect(screen.getByText("2024: R$ 20.000,75")).toBeInTheDocument();
	});
});
