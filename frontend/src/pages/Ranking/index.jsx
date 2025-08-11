import { useState, useEffect } from "react";
import { useDeputadoReferencias } from "../../hooks/useDeputadoReferencias";
import { SideBar } from "../../components/SideBar";
import { Container, Content, EmptyMessageContainer } from "./styles";
import { RankingFilters } from "../../components/RankingFilters";
import { RankingPodio } from "../../components/RankingPodio";
import { RankingList } from "../../components/RankingList";
import { api } from "../../services/api";
import { toast } from "react-toastify";

export function Ranking() {
  const [deputados, setDeputados] = useState([]);
  const [limit, setLimit] = useState(10);
  const [uf, setUf] = useState("");
  const [partido, setPartido] = useState("");
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("");
  const [ordem, setOrdem] = useState("desc");
  const { estados, partidos } = useDeputadoReferencias();

  async function fetchRanking() {
    try {
      const params = {};
      if (limit) params.limit = limit;
      if (uf) params.uf = uf;
      if (partido) params.partido = partido;
      if (mes) params.mes = mes;
      if (ano) params.ano = ano;
      if (ordem) params.ordem = ordem;
      const response = await api.get("/despesas/ranking", { params });
      setDeputados(
        Array.isArray(response.data.dados) ? response.data.dados : []
      );
    } catch {
      toast.error("Erro ao buscar ranking de despesas");
    }
  }

  useEffect(() => {
    fetchRanking();
    // eslint-disable-next-line
  }, [limit, uf, partido, mes, ano, ordem]);

  return (
    <Container>
      <SideBar />
      <Content>
        <h1>Ranking de Gastos</h1>
        <RankingFilters
          limit={limit}
          setLimit={setLimit}
          uf={uf}
          setUf={setUf}
          partido={partido}
          setPartido={setPartido}
          mes={mes}
          setMes={setMes}
          ano={ano}
          setAno={setAno}
          ordem={ordem}
          setOrdem={setOrdem}
          estados={estados}
          partidos={partidos}
        />
        {deputados.length === 0 ? (
          <EmptyMessageContainer>
            <p style={{ fontSize: 22, color: '#666', textAlign: 'center' }}>Nenhum deputado encontrado.</p>
          </EmptyMessageContainer>
        ) : (
          <>
            <RankingPodio deputados={deputados} />
            <RankingList deputados={deputados} />
          </>
        )}
      </Content>
    </Container>
  );
}
