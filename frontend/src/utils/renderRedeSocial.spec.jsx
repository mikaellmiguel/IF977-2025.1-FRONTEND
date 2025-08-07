import React from "react";
import { render } from "@testing-library/react";
import { renderRedeSocial } from "./renderRedeSocial";

describe("renderRedeSocial", () => {
  it("deve renderizar o ícone do Twitter", () => {
    const { container } = render(renderRedeSocial("https://twitter.com/usuario"));
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(container.innerHTML).toContain("#1DA1F2");
  });

  it("deve renderizar o ícone do Facebook", () => {
    const { container } = render(renderRedeSocial("https://facebook.com/usuario"));
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(container.innerHTML).toContain("#1877F2");
  });

  it("deve renderizar o ícone do Instagram", () => {
    const { container } = render(renderRedeSocial("https://instagram.com/usuario"));
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(container.innerHTML).toContain("#E1306C");
  });

  it("deve renderizar o ícone do Youtube", () => {
    const { container } = render(renderRedeSocial("https://youtube.com/usuario"));
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(container.innerHTML).toContain("#FF0000");
  });

  it("deve retornar null para url desconhecida", () => {
    const result = renderRedeSocial("https://linkedin.com/usuario");
    expect(result).toBeNull();
  });

  it("deve retornar null para string vazia", () => {
    const result = renderRedeSocial("");
    expect(result).toBeNull();
  });
});
