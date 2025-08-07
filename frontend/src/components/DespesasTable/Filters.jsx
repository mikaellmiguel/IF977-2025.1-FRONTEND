
import React, { useState } from "react";
import PropTypes from "prop-types";
import { FiltersForm, Select, Input, Button } from "./filters.styles";
import { toast } from "react-toastify";

export function DespesasFilters({ tipos, estados, onFilter, onClear }) {
  const [tipo, setTipo] = useState("");
  const [estado, setEstado] = useState("");
  const [valorMin, setValorMin] = useState("");
  const [valorMax, setValorMax] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if(valorMin && valorMax && parseFloat(valorMin) > parseFloat(valorMax)) {
      toast.info("Valor mínimo não pode ser maior que o valor máximo.");
      return;
    }

    onFilter({ tipo, estado, valorMin, valorMax });
  }


  function handleClear() {
    setTipo("");
    setEstado("");
    setValorMin("");
    setValorMax("");
    if (onClear) onClear();
  }

  return (
    <FiltersForm onSubmit={handleSubmit}>
      <Select value={tipo} onChange={e => setTipo(e.target.value)}>
        <option value="">Tipo</option>
        {tipos.map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </Select>
      <Select value={estado} onChange={e => setEstado(e.target.value)}>
        <option value="">Estado</option>
        {estados.map(uf => (
          <option key={uf} value={uf}>{uf}</option>
        ))}
      </Select>
      <Input type="number" placeholder="Valor mín" value={valorMin} onChange={e => setValorMin(e.target.value)} min="0" step="0.01" />
      <Input type="number" placeholder="Valor máx" value={valorMax} onChange={e => setValorMax(e.target.value)} min="0" step="0.01" />
      <Button type="submit" disabled={!tipo && !estado && !valorMin && !valorMax}>Filtrar</Button>
      <Button type="button" onClick={handleClear} style={{ marginLeft: 8 }} disabled={!tipo && !estado && !valorMin && !valorMax}>
        Limpar
      </Button>
    </FiltersForm>
  );
}

DespesasFilters.propTypes = {
  tipos: PropTypes.arrayOf(PropTypes.string).isRequired,
  estados: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFilter: PropTypes.func.isRequired,
  onClear: PropTypes.func,
};
