import { Container, MainContent } from "./styles";
import { useParams, useNavigate } from "react-router-dom";
import { useDeputadoDetais } from "../../hooks/useDeputadoDetails";
import { DeputadoSidebar } from "./DeputadoSidebar";
import { DeputadoContato } from "./DeputadoContato";
import { DeputadoDespesas } from "./DeputadoDespesas";
import { api } from "../../services/api";
import { toast } from "react-toastify";

export function DeputadosDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deputado, despesas, totalPages, page, setPage, filtros, setFiltros, tipos, estados, isFollowing, setIsFollowing } = useDeputadoDetais(id);

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

  return (
	<Container>
	  <DeputadoSidebar deputado={deputado} onBack={() => navigate(-1)} onFollow={handleFollow} isFollowing={isFollowing} />
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
