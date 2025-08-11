import { render, screen, fireEvent } from "@testing-library/react";
import { RankingFilters } from ".";

describe("RankingFilters", () => {
	const estados = ["PE", "SP", "RJ"];
	const partidos = ["PSOL", "PT", "MDB"];
	const defaultProps = {
		limit: 20,
		setLimit: jest.fn(),
		uf: "",
		setUf: jest.fn(),
		partido: "",
		setPartido: jest.fn(),
		mes: "",
		setMes: jest.fn(),
		ano: "2025",
		setAno: jest.fn(),
		ordem: "desc",
		setOrdem: jest.fn(),
		estados,
		partidos,
	};

	it("renderiza todos os filtros e opções iniciais", () => {
		render(<RankingFilters {...defaultProps} />);
			const selects = screen.getAllByRole("combobox");
			expect(selects).toHaveLength(6);
			// Limite, UF, Partido, Mês, Ano, Ordem
			// Opções de UF
			const ufSelect = selects[1];
			estados.forEach(uf => {
				expect(Array.from(ufSelect.options).map(o => o.value)).toContain(uf);
			});
			// Opções de Partido
			const partidoSelect = selects[2];
			partidos.forEach(p => {
				expect(Array.from(partidoSelect.options).map(o => o.value)).toContain(p);
			});
	});

	it("altera o limite ao selecionar outro valor", () => {
		render(<RankingFilters {...defaultProps} />);
		const selects = screen.getAllByRole("combobox");
		fireEvent.change(selects[0], { target: { value: "30" } });
		expect(defaultProps.setLimit).toHaveBeenCalledWith(30);
	});

	it("altera o UF ao selecionar outro valor", () => {
		render(<RankingFilters {...defaultProps} />);
		const selects = screen.getAllByRole("combobox");
		fireEvent.change(selects[1], { target: { value: "SP" } });
		expect(defaultProps.setUf).toHaveBeenCalledWith("SP");
	});

	it("altera o Partido ao selecionar outro valor", () => {
		render(<RankingFilters {...defaultProps} />);
		const selects = screen.getAllByRole("combobox");
		fireEvent.change(selects[2], { target: { value: "PT" } });
		expect(defaultProps.setPartido).toHaveBeenCalledWith("PT");
	});

	it("altera o Mês ao selecionar outro valor", () => {
		render(<RankingFilters {...defaultProps} />);
		const selects = screen.getAllByRole("combobox");
		fireEvent.change(selects[3], { target: { value: "5" } });
		expect(defaultProps.setMes).toHaveBeenCalledWith("5");
	});

	it("altera o Ano ao selecionar outro valor", () => {
		render(<RankingFilters {...defaultProps} />);
		const selects = screen.getAllByRole("combobox");
		fireEvent.change(selects[4], { target: { value: "2024" } });
		expect(defaultProps.setAno).toHaveBeenCalledWith("2024");
	});

	it("altera a Ordem ao selecionar outro valor", () => {
		render(<RankingFilters {...defaultProps} />);
		const selects = screen.getAllByRole("combobox");
		fireEvent.change(selects[5], { target: { value: "asc" } });
		expect(defaultProps.setOrdem).toHaveBeenCalledWith("asc");
	});

	it("renderiza meses corretos para o ano atual", () => {
		// Simula ano atual e mês atual
			const now = new Date();
			const props = { ...defaultProps, ano: String(now.getFullYear()) };
			render(<RankingFilters {...props} />);
			const selects = screen.getAllByRole("combobox");
			const mesSelect = selects[3];
			const mesOptions = Array.from(mesSelect.options).map(opt => opt.value);
			for (let i = 1; i <= now.getMonth() + 1; i++) {
				expect(mesOptions).toContain(String(i));
			}
			expect(mesOptions).not.toContain("12");
	});

	it("renderiza 12 meses para anos anteriores", () => {
			render(<RankingFilters {...defaultProps} ano="2024" />);
			const selects = screen.getAllByRole("combobox");
			const mesSelect = selects[3];
			const mesOptions = Array.from(mesSelect.options).map(opt => opt.value);
			for (let i = 1; i <= 12; i++) {
				expect(mesOptions).toContain(String(i));
			}
	});
});
