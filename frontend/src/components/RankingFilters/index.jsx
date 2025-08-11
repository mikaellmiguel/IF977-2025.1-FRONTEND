import { Filtros, FiltroLabel, FiltroInput, FiltroSelect } from "./styles";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

export function RankingFilters({ limit, setLimit, uf, setUf, partido, setPartido, mes, setMes, ano, setAno, ordem, setOrdem, estados = [], partidos = [] }) {
  return (
    <Filtros>
      <FiltroLabel>Limite:</FiltroLabel>
      <FiltroSelect value={limit} onChange={e => setLimit(Number(e.target.value))}>
        {[10, 15, 20, 25, 30, 40, 50].map(v => (
          <option key={v} value={v}>{v}</option>
        ))}
      </FiltroSelect>
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
      <FiltroLabel>Ordem:</FiltroLabel>
      <FiltroSelect value={ordem} onChange={e => setOrdem(e.target.value)}>
        <option value="desc">Maior gasto</option>
        <option value="asc">Menor gasto</option>
      </FiltroSelect>
    </Filtros>
  );
}
