const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));
import React from "react";
import { render, act, waitFor } from "@testing-library/react";
import { AuthProvider } from "./AuthProvider";
import { AuthContext } from "./AuthContext";
import { api } from "../services/api";
import { toast } from "react-toastify";

jest.mock("../services/api", () => ({
  api: {
    post: jest.fn(),
    defaults: {
      headers: {
        common: {},
        authorization: ""
      }
    }
  }
}));
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("AuthProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  function renderWithProvider(children) {
    return render(<AuthProvider>{children}</AuthProvider>);
  }

  it("signIn com email/senha salva dados e mostra toast de sucesso", async () => {
    api.post.mockResolvedValue({
      data: {
        token: "token123",
        user: { nome: "Teste" },
        expiresIn: new Date(Date.now() + 10000).toISOString(),
      },
    });
    let context;
    renderWithProvider(
      <AuthContext.Consumer>
        {value => {
          context = value;
          return null;
        }}
      </AuthContext.Consumer>
    );
    await act(async () => {
      await context.signIn({ email: "a@a.com", password: "123" });
    });
    expect(localStorage.getItem("@FiscalizaDeputado:token")).toBe("token123");
    expect(localStorage.getItem("@FiscalizaDeputado:user")).toContain("Teste");
    expect(toast.success).toHaveBeenCalledWith("Login realizado com sucesso!");
  });

  it("signIn com googleToken salva dados e mostra toast de sucesso", async () => {
    api.post.mockResolvedValue({
      data: {
        token: "tokenGoogle",
        user: { nome: "Google" },
        expiresIn: new Date(Date.now() + 10000).toISOString(),
      },
    });
    let context;
    renderWithProvider(
      <AuthContext.Consumer>
        {value => {
          context = value;
          return null;
        }}
      </AuthContext.Consumer>
    );
    await act(async () => {
      await context.signIn({}, "tokenGoogle");
    });
    expect(localStorage.getItem("@FiscalizaDeputado:token")).toBe("tokenGoogle");
    expect(localStorage.getItem("@FiscalizaDeputado:user")).toContain("Google");
    expect(toast.success).toHaveBeenCalledWith("Login realizado com sucesso!");
  });

  it("signIn mostra toast de erro do backend", async () => {
    api.post.mockRejectedValue({ response: { data: { message: "Credenciais inválidas" } } });
    let context;
    renderWithProvider(
      <AuthContext.Consumer>
        {value => {
          context = value;
          return null;
        }}
      </AuthContext.Consumer>
    );
    await act(async () => {
      await context.signIn({ email: "a@a.com", password: "errado" });
    });
    expect(toast.error).toHaveBeenCalledWith("Credenciais inválidas");
  });

  it("signIn mostra toast de erro genérico", async () => {
    api.post.mockRejectedValue({});
    let context;
    renderWithProvider(
      <AuthContext.Consumer>
        {value => {
          context = value;
          return null;
        }}
      </AuthContext.Consumer>
    );
    await act(async () => {
      await context.signIn({ email: "a@a.com", password: "errado" });
    });
    expect(toast.error).toHaveBeenCalledWith("Erro ao realizar login, tente novamente mais tarde");
  });

  it("signOut remove dados do localStorage e contexto", () => {
    localStorage.setItem("@FiscalizaDeputado:token", "token");
    localStorage.setItem("@FiscalizaDeputado:user", JSON.stringify({ nome: "Teste" }));
    localStorage.setItem("@FiscalizaDeputado:expires_in", "data");
    let context;
    renderWithProvider(
      <AuthContext.Consumer>
        {value => {
          context = value;
          return null;
        }}
      </AuthContext.Consumer>
    );
    act(() => {
      context.signOut();
    });
    expect(localStorage.getItem("@FiscalizaDeputado:token")).toBeNull();
    expect(localStorage.getItem("@FiscalizaDeputado:user")).toBeNull();
    expect(localStorage.getItem("@FiscalizaDeputado:expires_in")).toBeNull();
  });

  it("faz signOut automático se expiresIn expirou", async () => {
    const expiredDate = new Date(Date.now() - 10000).toISOString();
    localStorage.setItem("@FiscalizaDeputado:token", "token");
    localStorage.setItem("@FiscalizaDeputado:user", JSON.stringify({ nome: "Expirado" }));
    localStorage.setItem("@FiscalizaDeputado:expires_in", expiredDate);

    // eslint-disable-next-line no-unused-vars
    let context;
    renderWithProvider(
      <AuthContext.Consumer>
        {value => {
          context = value;
          return null;
        }}
      </AuthContext.Consumer>
    );
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Sua sessão expirou, faça login novamente");
      expect(localStorage.getItem("@FiscalizaDeputado:token")).toBeNull();
    });
  });
});
