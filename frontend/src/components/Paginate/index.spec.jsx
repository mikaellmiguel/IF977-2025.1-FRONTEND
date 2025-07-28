import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Paginate } from ".";

// Mock do StyledPaginate para simular o ReactPaginate
jest.mock("./styles", () => {
  return {
    StyledPaginate: ({ pageCount, onPageChange, previousLabel, nextLabel }) => (
      <div>
        <button onClick={() => onPageChange({ selected: 0 })}>{previousLabel}</button>
        {[...Array(pageCount)].map((_, i) => (
          <button key={i} onClick={() => onPageChange({ selected: i })}>{i + 1}</button>
        ))}
        <button onClick={() => onPageChange({ selected: pageCount - 1 })}>{nextLabel}</button>
      </div>
    ),
  };
});

describe("Paginate", () => {
  it("deve renderizar os botões de navegação e páginas", () => {
    render(<Paginate pageCount={5} onPageChange={() => {}} />);
    expect(screen.getByText("«")).toBeInTheDocument();
    expect(screen.getByText("»")).toBeInTheDocument();
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  it("deve chamar onPageChange com o número correto ao clicar em uma página", () => {
    const onPageChange = jest.fn();
    render(<Paginate pageCount={3} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByText("2"));
    expect(onPageChange).toHaveBeenCalledWith(2);
    fireEvent.click(screen.getByText("1"));
    expect(onPageChange).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getByText("3"));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("deve chamar onPageChange ao clicar nos botões de navegação", () => {
    const onPageChange = jest.fn();
    render(<Paginate pageCount={4} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByText("«"));
    expect(onPageChange).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getByText("»"));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("deve renderizar corretamente com apenas uma página", () => {
    render(<Paginate pageCount={1} onPageChange={() => {}} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("«")).toBeInTheDocument();
    expect(screen.getByText("»")).toBeInTheDocument();
  });

  it("deve renderizar corretamente com pageCount = 0 (sem páginas)", () => {
    render(<Paginate pageCount={0} onPageChange={() => {}} />);
    expect(screen.getByText("«")).toBeInTheDocument();
    expect(screen.getByText("»")).toBeInTheDocument();
    // Não deve renderizar botões de página
    expect(screen.queryByText("1")).not.toBeInTheDocument();
  });

  it("deve renderizar corretamente com pageCount grande", () => {
    render(<Paginate pageCount={20} onPageChange={() => {}} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
  });

  it("deve chamar onPageChange rapidamente em sequência", () => {
    const onPageChange = jest.fn();
    render(<Paginate pageCount={3} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("3"));
    expect(onPageChange).toHaveBeenCalledTimes(3);
    expect(onPageChange).toHaveBeenNthCalledWith(1, 1);
    expect(onPageChange).toHaveBeenNthCalledWith(2, 2);
    expect(onPageChange).toHaveBeenNthCalledWith(3, 3);
  });

  it("deve bater snapshot básico", () => {
    const { container } = render(<Paginate pageCount={2} onPageChange={() => {}} />);
    expect(container).toMatchSnapshot();
  });
});
