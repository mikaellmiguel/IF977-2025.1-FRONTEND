import { Container, MainContent, GraficoBox, GraficosGrid } from "./styles";
import { useParams, useNavigate } from "react-router-dom";
import { useDeputadoDetais } from "../../hooks/useDeputadoDetails";
import { DeputadoSidebar } from "./DeputadoSidebar";
import { DeputadoContato } from "./DeputadoContato";
import { DeputadoDespesas } from "./DeputadoDespesas";
import { GraficoBarraAno } from "../../components/GraficoBarraAno";
import { GraficoBarraMes } from "../../components/GraficoBarraMes";
import { GraficoPizzaTipo } from "../../components/GraficoPizzaTipo";
import { ScoreCardGastos } from "../../components/ScoreCardGastos/ScoreCardGastos";
import { api } from "../../services/api";
import { toast } from "react-toastify";

export function DeputadosDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deputado, despesas, totalPages, page, setPage, estatisticas, filtros, setFiltros, tipos, estados, isFollowing, setIsFollowing } = useDeputadoDetais(id);

  function handleFollow() {
	if(isFollowing){
		api.delete(`/follows/${id}`)
		.then(() => setIsFollowing(false))
		.catch(() => toast.error("Erro ao deixar de seguir o deputado"));
	} else {
		api.post(`/follows/${id}`)
		.then(() => setIsFollowing(true))
		.catch(() => toast.error("Erro ao seguir o deputado"));
	}
	}

	// Preparar dados para os gráficos
	const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
	const dadosAno = estatisticas?.gastos_por_ano?.map(item => ({ ano: item.ano, valor: item.total })) || [];
	const dadosMes = estatisticas?.gastos_por_mes?.map(item => ({ mes: meses[item.mes - 1], valor: item.total })) || [];
	const dadosTipo = estatisticas?.gastos_por_tipo?.map(item => ({ tipo: item.descricao, valor: item.total })) || [];

	return (
		<Container>
			<DeputadoSidebar deputado={deputado} onBack={() => navigate(-1)} onFollow={handleFollow} isFollowing={isFollowing} />
			<MainContent>
				<DeputadoContato deputado={deputado} />
				{/* Seção de gráficos */}
				<GraficosGrid>
					<GraficoBox style={{ gridColumn: "span 2", minWidth: 0 }}>
						<ScoreCardGastos total={estatisticas?.total_valores || 0} ticketMedio={estatisticas?.ticket_medio || 0} />
					</GraficoBox>
					<GraficoBox>
						<h4 style={{ marginBottom: "0.5rem" }}>Gasto por Ano</h4>
						<GraficoBarraAno data={dadosAno} />
					</GraficoBox>
					<GraficoBox>
						<h4 style={{ marginBottom: "0.5rem" }}>Gasto por Mês</h4>
						<GraficoBarraMes data={dadosMes} />
					</GraficoBox>
					<GraficoBox style={{ gridColumn: "span 2" }}>
						<h4 style={{ marginBottom: "0.5rem" }}>Distribuição por Tipo</h4>
						<GraficoPizzaTipo data={dadosTipo} />
					</GraficoBox>
				</GraficosGrid>
				<DeputadoDespesas
						tipos={tipos}
						estados={estados}
						despesas={despesas}
						totalPages={totalPages}
						page={page}
						setPage={setPage}
						filtros={filtros}
						setFiltros={setFiltros}
				/>
			</MainContent>
		</Container>
	);
}
