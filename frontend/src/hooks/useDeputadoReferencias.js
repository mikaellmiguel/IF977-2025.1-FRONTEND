import { useState, useEffect } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";

export function useDeputadoReferencias() {
  const [estados, setEstados] = useState([]);
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    async function fetchReferencias() {
      try {
        const response = await api.get("/referencias/deputados");
        setEstados(response.data.estados || []);
        setPartidos(response.data.partidos || []);
      } catch {
        toast.error("Erro ao buscar referências de deputados");
      }
    }
    fetchReferencias();
  }, []);

  return { estados, partidos };
}
