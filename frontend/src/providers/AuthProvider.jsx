import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { api } from "../services/api";
import { toast } from "react-toastify";
import {useNavigate } from "react-router-dom";

export function AuthProvider({ children }) {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  async function signIn({ email, password }, googleToken) {
    try {
      let response;
      if (googleToken) {
        response = await api.post("/auth/google/verify", { token: googleToken });
      } else {
        response = await api.post("/auth/login", { email, password });
      }

      const { token, user, expiresIn } = response.data;
      localStorage.setItem("@FiscalizaDeputado:token", token);
      localStorage.setItem("@FiscalizaDeputado:user", JSON.stringify(user));
      localStorage.setItem("@FiscalizaDeputado:expires_in", expiresIn);

      api.defaults.headers.authorization = `Bearer ${token}`;
      setData({ user, token });
      toast.success("Login realizado com sucesso!");
      navigate("/", { replace: true });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Erro ao realizar login, tente novamente mais tarde");
      }
    }
  }

  function signOut() {
    localStorage.removeItem("@FiscalizaDeputado:token");
    localStorage.removeItem("@FiscalizaDeputado:user");
    localStorage.removeItem("@FiscalizaDeputado:expires_in");
    setData({});
    navigate("/login", {replace: true});
  }

  useEffect(() => {
    const token = localStorage.getItem('@FiscalizaDeputado:token');
    const user = JSON.parse(localStorage.getItem('@FiscalizaDeputado:user'));
    const expiresIn = localStorage.getItem('@FiscalizaDeputado:expires_in');

    if (expiresIn && Date.parse(expiresIn) < Date.now()) {
      toast.error("Sua sessão expirou, faça login novamente");
      setTimeout(() => signOut(), 500);
    }

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setData({ token, user });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, user: data.user }}>
      {children}
    </AuthContext.Provider>
  );
}
