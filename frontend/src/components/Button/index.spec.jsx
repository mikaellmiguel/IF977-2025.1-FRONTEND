import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Button } from "./index";

describe("Button", () => {
  it("renderiza o texto corretamente", () => {
    const { getByText } = render(<Button>Salvar</Button>);
    expect(getByText("Salvar")).toBeInTheDocument();
  });

  it("passa props corretamente para o botão", () => {
    const { getByRole } = render(<Button type="submit" data-testid="btn" />);
    const btn = getByRole("button");
    expect(btn).toHaveAttribute("type", "submit");
    expect(btn).toHaveAttribute("data-testid", "btn");
  });

  it("executa onClick quando clicado", () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button onClick={handleClick}>Clique</Button>);
    fireEvent.click(getByText("Clique"));
    expect(handleClick).toHaveBeenCalled();
  });

  it("aplica estilos de hover e active (snapshot)", () => {
    const { container } = render(<Button>Hover</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
