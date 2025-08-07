import { calcularIdade } from "../../utils/calcularIdade";
import { formatarDataBR } from "../../utils/formatarDataBR";
import {Container, MainContent, BackButton, InfoItem, InfoList, Sidebar, DeputadoName, ContactCol, ContactRow, ContactItem, SectionTitle, PaginateWrapper} from "./styles";
import { DespesasTable } from "../../components/DespesasTable";
// import { DespesasFilters } from "../../components/DespesasTable/Filters";
import { Paginate } from "../../components/Paginate";
import { useState, useEffect} from "react";
import { api } from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import {FiFlag, FiMapPin, FiBookOpen, FiCalendar, FiPhone, FiMail,} from "react-icons/fi";
import { renderRedeSocial } from "../../utils/renderRedeSocial";
import { toast } from "react-toastify";

export function DeputadosDetails() {
	const [deputado, setDeputado] = useState({});
	const [despesas, setDespesas] = useState([]);
	const [totalPages, setTotalPages] = useState(1);
	const [page, setPage] = useState(1);
	const navigate = useNavigate();

	const { id } = useParams();

	async function fetchDespesas(page = 1, filtros = {}) {

		const limit = 10;
		const offset = (page - 1) * limit;

		const params = new URLSearchParams({
			limit,
			offset,
			...filtros,
		});

		try {
			const response = await api.get(`/despesas/deputados/${id}?${params.toString()}`);
			setDespesas(response.data.dados);
			setTotalPages(Math.ceil(response.data.total / limit));
		}
		catch {
			toast.error("Erro ao buscar despesas do deputado");
			setTotalPages(1);
		}
	}

	useEffect(() => {
		async function fetchDeputado() {
			const response = await api.get(`/deputados/${id}`);
			setDeputado(response.data);
		}
		fetchDeputado();
	}, [id]);

	useEffect(() => {
		fetchDespesas(page);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, id]); 

	return (
		<Container>
		<Sidebar>
			<BackButton onClick={() => navigate(-1)}>← Voltar</BackButton>
			<img src={deputado.url_foto} alt="Descrição da imagem" />
			<DeputadoName>{deputado.nome}</DeputadoName>
			<InfoList>
			<InfoItem><FiFlag /> {deputado.partido || "Não Informado"}</InfoItem>
			<InfoItem><FiMapPin /> {deputado.sigla_uf || "Não Informado"}</InfoItem>
			<InfoItem><FiBookOpen /> {deputado.escolaridade || "Não Informado"}</InfoItem>
			<InfoItem><FiCalendar /> {`${formatarDataBR(deputado.data_nascimento || "Não Informado")} - (${calcularIdade(deputado.data_nascimento)})`}</InfoItem>
			</InfoList>
			<Button>{"★ Remover dos Favoritos"}</Button>
		</Sidebar>
		<MainContent>
			<SectionTitle>Dados de Contato</SectionTitle>
			<ContactRow>
			<ContactCol>
				<ContactItem><FiPhone /> <strong>Telefone:</strong>{" "} {deputado.telefone || "Não Informado"}</ContactItem>
				<ContactItem><FiMail /> <strong>Email:</strong>{" "} {deputado.email || "Não Informado"}</ContactItem>
				<ContactItem>
			<FiMapPin /> <strong>Endereço:</strong> Gabinete{" "}
				{deputado.gabinete?.nome || "Não Informado"}, Prédio{" "}
				{deputado.gabinete?.predio || "Não Informado"}, Sala{" "}
				{deputado.gabinete?.sala || "Não Informado"}
				</ContactItem>
			</ContactCol>
			<ContactCol>
				{deputado.redes_social?.map((rede, index) => (
				<ContactItem key={index}>
					{renderRedeSocial(rede)}
					<a href={rede} target="_blank" rel="noopener noreferrer">
					{rede}
					</a>
				</ContactItem>
				))}
			</ContactCol>
			</ContactRow>
			<SectionTitle>Despesas</SectionTitle>
			{/* <DespesasFilters tipos={tipos} estados={estados} onFilter={handleFilter} /> */}
			<DespesasTable despesas={despesas} />
			<PaginateWrapper>
				<Paginate pageCount={totalPages} onPageChange={setPage} />
			</PaginateWrapper>
		</MainContent>
		</Container>
  );
}
