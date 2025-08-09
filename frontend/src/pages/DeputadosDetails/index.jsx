import { Container, MainContent } from "./styles";
import { useParams, useNavigate } from "react-router-dom";
import { useDeputadoDetais } from "../../hooks/useDeputadoDetails";
import { DeputadoSidebar } from "./DeputadoSidebar";
import { DeputadoContato } from "./DeputadoContato";
import { DeputadoDespesas } from "./DeputadoDespesas";

export function DeputadosDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deputado, despesas, totalPages, page, setPage, filtros, setFiltros } = useDeputadoDetais(id);

  // Tipos e estados mockados
  const tipos = [
	"AQUISIÇÃO DE TOKENS E CERTIFICADOS DIGITAIS",
	"ASSINATURA DE PUBLICAÇÕES",
	"COMBUSTÍVEIS E LUBRIFICANTES.",
	"CONSULTORIAS, PESQUISAS E TRABALHOS TÉCNICOS.",
	"DIVULGAÇÃO DA ATIVIDADE PARLAMENTAR.",
	"FORNECIMENTO DE ALIMENTAÇÃO DO PARLAMENTAR",
	"HOSPEDAGEM ,EXCETO DO PARLAMENTAR NO DISTRITO FEDERAL."
  ];
  const estados = ["PE", "SP", "RJ", "DF", "MG", "RS", "BA", "PR", "SC", "GO", "ES", "CE", "PA", "AM", "MA", "PB", "RN", "PI", "MT", "MS", "SE", "AL", "RO", "TO", "AC", "AP", "RR"];

  return (
	<Container>
	  <DeputadoSidebar deputado={deputado} onBack={() => navigate(-1)} />
	  <MainContent>
		<DeputadoContato deputado={deputado} />
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
