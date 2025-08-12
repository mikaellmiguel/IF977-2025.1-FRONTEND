import { CardDashboard } from "../../components/CardDashboard";
import { SideBar } from "../../components/SideBar";
import { Container, Content, EmptyMessageContainer, MetricsCardsContainer, GraphicsContainer } from "./styles";
import { GraficoBarraAno } from "../../components/GraficoBarraAno";
import { GraficoBarraEstado } from "../../components/GraficoBarraEstado";
import { RankingFornecedores } from "../../components/RankingFornecedor";
import { GraficoPizzaTipo } from "../../components/GraficoPizzaTipo";
import { GraficoBarraPartido } from "../../components/GraficoBarraPartido";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import { StatisticsFilter } from "../../components/StatisticsFilter";

export function Dashboard() {
    const [partidos, setPartidos] = useState([]);
    const [estados, setEstados] = useState([]);
    useEffect(() => {
        async function fetchReferencias() {
            try {
                const response = await api.get("/referencias/deputados");
                setPartidos(response.data.partidos || []);
                setEstados(response.data.estados || []);
            } catch {
                setPartidos([]);
                setEstados([]);
            }
        }
        fetchReferencias();
    }, []);

    const [mes, setMes] = useState("");
    const [ano, setAno] = useState("");
    const [partido, setPartido] = useState("");
    const [uf, setUf] = useState("");
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetchStatistics() {
        setLoading(true);
        try {
            const params = {};
            if (mes) params.mes = mes;
            if (ano) params.ano = ano;
            if (partido) params.partido = partido;
            if (uf) params.uf = uf;
            const response = await api.get("/despesas/statistics", { params });
            setStatistics(response.data);
        } catch {
            setStatistics(null);
            toast.error("Erro ao buscar estatísticas de despesas");
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchStatistics();
        // eslint-disable-next-line
    }, [mes, ano, partido, uf]);

    return (
        <Container>
            <SideBar />
            <Content>
                <h1>Dashboard</h1>
                <StatisticsFilter
                    mes={mes}
                    setMes={setMes}
                    ano={ano}
                    setAno={setAno}
                    partido={partido}
                    setPartido={setPartido}
                    uf={uf}
                    setUf={setUf}
                    partidos={partidos}
                    estados={estados}
                />
                {loading ? (
                    <EmptyMessageContainer>Carregando...</EmptyMessageContainer>
                ) : statistics ? (
                    <>
                        <MetricsCardsContainer>
                            <CardDashboard label="Total de Gastos" value={`R$ ${statistics.total_valores?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} />
                            <CardDashboard label="Total de Despesas" value={statistics.total_despesas} />
                            <CardDashboard label="Ticket Médio" value={`R$ ${statistics.ticket_medio?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} />
                        </MetricsCardsContainer>
                        <GraphicsContainer>
                            <div style={{ gridArea: "ano" }}>
                                <GraficoBarraAno data={statistics.gastos_por_ano?.map(item => ({ ano: item.ano, valor: item.total }))} height={450}/>
                            </div>
                            <div style={{ gridArea: "ranking" }}>
                                <RankingFornecedores fornecedores={statistics.top_fornecedores?.map(item => ({ fornecedor: item.fornecedor, total: item.total }))} />
                            </div>
                            <div style={{ gridArea: "estado" }}>
                                <GraficoBarraEstado data={statistics.despesa_por_estado?.map(item => ({ sigla_uf: item.sigla_uf, total: item.total }))} />
                            </div>
                            <div style={{ gridArea: "partido" }}>
                                <GraficoBarraPartido data={statistics.despesa_por_partido?.map(item => ({ partido: item.sigla_partido, valor: item.total }))} height={350} />
                            </div>
                            <div style={{ gridArea: "tipo" }}>
                                <GraficoPizzaTipo data={statistics.gastos_por_tipo?.map(item => ({ tipo: item.descricao, valor: item.total }))} title="Gastos por Tipo de Despesa" />
                            </div>
                        </GraphicsContainer>
                    </>
                ) : (
                    <EmptyMessageContainer>Nenhum dado encontrado.</EmptyMessageContainer>
                )}
            </Content>
        </Container>
    );
}