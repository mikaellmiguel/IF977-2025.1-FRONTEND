import { calcularIdade } from "../../utils/calcularIdade";
import { formatarDataBR } from "../../utils/formatarDataBR";
import {Container, MainContent, BackButton, InfoItem, InfoList, Sidebar, DeputadoName, ContactCol, ContactRow, ContactItem, SectionTitle, PaginateWrapper} from "./styles";
import { DespesasTable } from "../../components/DespesasTable";
import { DespesasFilters } from "../../components/DespesasTable/Filters";
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
	const [filtros, setFiltros] = useState({});
	const navigate = useNavigate();

	const { id } = useParams();

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


	function handleFilter({ tipo, estado, valorMin, valorMax }) {
	setPage(1);
	const filtrosApi = {};
	if (tipo) filtrosApi.tipo = tipo;
	if (estado) filtrosApi.uf = estado;
	if (valorMin) filtrosApi.valor_min = valorMin;
	if (valorMax) filtrosApi.valor_max = valorMax;
	setFiltros(filtrosApi);
	}

	function handleClear() {
	setPage(1);
	setFiltros({});
	}

	async function fetchDespesas(page = 1, filtrosArg = {}) {
	const limit = 10;
	const offset = (page - 1) * limit;
	const params = new URLSearchParams({
		limit,
		offset,
		...filtrosArg,
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
	fetchDespesas(page, filtros);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, id, filtros]);

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
			<DespesasFilters tipos={tipos} estados={estados} onFilter={handleFilter} onClear={handleClear} />
			<DespesasTable despesas={despesas} />
			<PaginateWrapper>
				<Paginate pageCount={totalPages} onPageChange={setPage} forcePage={page - 1} />
			</PaginateWrapper>
		</MainContent>
		</Container>
  );
}
