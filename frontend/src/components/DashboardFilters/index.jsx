import { Filtros, FiltroLabel, FiltroSelect } from "./styles";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

export function DashboardFilters({ uf, setUf, partido, setPartido, mes, setMes, ano, setAno, estados = [], partidos = [] }) {
  return (
    <Filtros>
      <FiltroLabel>UF:</FiltroLabel>
      <FiltroSelect value={uf} onChange={e => setUf(e.target.value)}>
        <option value="">Todos</option>
        {estados.map(ufOpt => (
          <option key={ufOpt} value={ufOpt}>{ufOpt}</option>
        ))}
      </FiltroSelect>
      <FiltroLabel>Partido:</FiltroLabel>
      <FiltroSelect value={partido} onChange={e => setPartido(e.target.value)}>
        <option value="">Todos</option>
        {partidos.map(pOpt => (
          <option key={pOpt} value={pOpt}>{pOpt}</option>
        ))}
      </FiltroSelect>
      <FiltroLabel>Mês:</FiltroLabel>
      <FiltroSelect value={mes} onChange={e => setMes(e.target.value)}>
        <option value="">Todos</option>
        {ano === String(currentYear)
          ? [...Array(currentMonth)].map((_, i) => (
              <option key={i+1} value={i+1}>{i+1}</option>
            ))
          : [...Array(12)].map((_, i) => (
              <option key={i+1} value={i+1}>{i+1}</option>
            ))}
      </FiltroSelect>
      <FiltroLabel>Ano:</FiltroLabel>
      <FiltroSelect value={ano} onChange={e => setAno(e.target.value)}>
        <option value="">Todos</option>
        {Array.from({length: currentYear - 2022}, (_, i) => 2023 + i).map(y => (
          <option key={y} value={y}>{y}</option>
        ))}
      </FiltroSelect>
    </Filtros>
  );
}
