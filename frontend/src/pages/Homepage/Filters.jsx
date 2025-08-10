import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { api } from "../../services/api";

const FiltersBar = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  height: 48px;
`;

const Select = styled.select`
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 180px;
  height: 40px;
  font-size: 0.875rem;
  background: white;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

export function Filters({ filters, setFilters }) {
  const [partidos, setPartidos] = useState([]);
  const [ufs, setUfs] = useState([]);

  useEffect(() => {
    async function fetchReferencias() {
      try {
        const response = await api.get("/referencias/deputados");
        setPartidos(response.data.partidos || []);
        setUfs(response.data.estados || []);
      } catch {
        setPartidos([]);
        setUfs([]);
      }
    }
    fetchReferencias();
  }, []);

  return (
    <FiltersBar>
      <Select
        value={filters.partido}
        onChange={e => setFilters(f => ({ ...f, partido: e.target.value }))}
      >
        <option value="">Todos os partidos</option>
        {partidos.map(p => (
          <option key={p} value={p}>{p}</option>
        ))}
      </Select>
      <Select
        value={filters.uf}
        onChange={e => setFilters(f => ({ ...f, uf: e.target.value }))}
      >
        <option value="">Todos os estados</option>
        {ufs.map(uf => (
          <option key={uf} value={uf}>{uf}</option>
        ))}
      </Select>
    </FiltersBar>
  );
}
