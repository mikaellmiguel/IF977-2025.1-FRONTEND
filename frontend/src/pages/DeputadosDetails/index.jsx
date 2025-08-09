import { Container, MainContent } from "./styles";
import { useParams, useNavigate } from "react-router-dom";
import { useDeputadoDetais } from "../../hooks/useDeputadoDetails";
import { DeputadoSidebar } from "./DeputadoSidebar";
import { DeputadoContato } from "./DeputadoContato";
import { DeputadoDespesas } from "./DeputadoDespesas";

export function DeputadosDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deputado, despesas, totalPages, page, setPage, filtros, setFiltros, tipos, estados } = useDeputadoDetais(id);

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
