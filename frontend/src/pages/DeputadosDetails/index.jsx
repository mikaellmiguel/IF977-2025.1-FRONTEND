import { calcularIdade } from "../../utils/calcularIdade";
import { formatarDataBR } from "../../utils/formatarDataBR";

import {Container, MainContent, BackButton, InfoItem, InfoList, Sidebar, DeputadoName, ContactCol, ContactRow, ContactItem, SectionTitle, PaginateWrapper} from "./styles";
import { DespesasTable } from "../../components/DespesasTable";
import { DespesasFilters } from "../../components/DespesasTable/Filters";
import { Paginate } from "../../components/Paginate";
import { useState } from "react";


import { Button } from "../../components/Button";
import {FiFlag, FiMapPin, FiBookOpen, FiCalendar, FiPhone, FiMail,} from "react-icons/fi";
import { renderRedeSocial } from "../../utils/renderRedeSocial";

export function DeputadosDetails() {

  // MOCK de despesas para teste inicial
  const despesasMock = [
    {
      id: 1,
      descricao: "DIVULGAÇÃO DA ATIVIDADE PARLAMENTAR.",
      valor_documento: 16142.9,
      data_emissao: "2025-07-01T00:00:00",
      fornecedor: "ELIEZER CONCEIÇÃO LIMA",
      sigla_uf: "AP"
    },
    {
      id: 2,
      descricao: "LOCAÇÃO DE VEÍCULOS.",
      valor_documento: 5000.0,
      data_emissao: "2025-07-10T00:00:00",
      fornecedor: "LOCADORA XPTO LTDA",
      sigla_uf: "MT"
    }
  ];
  // Filtros e paginação (mockados)
  const tipos = ["DIVULGAÇÃO DA ATIVIDADE PARLAMENTAR.", "LOCAÇÃO DE VEÍCULOS."];
  const estados = ["AP", "MT"];
  const [page, setPage] = useState(1);
  const [filteredDespesas, setFilteredDespesas] = useState(despesasMock);

  function handleFilter({ tipo, estado, valorMin, valorMax }) {
    let result = despesasMock;
    if (tipo) result = result.filter(d => d.descricao === tipo);
    if (estado) result = result.filter(d => d.sigla_uf === estado);
    if (valorMin) result = result.filter(d => d.valor_documento >= parseFloat(valorMin));
    if (valorMax) result = result.filter(d => d.valor_documento <= parseFloat(valorMax));
    setFilteredDespesas(result);
    setPage(1);
  }
  const deputado = {
    id: 220594,
    nome_civel: "JONILDO JOSÉ DE ASSIS",
    nome: "Coronel Assis",
    partido: "UNIÃO",
    sigla_uf: "MT",
    email: "dep.coronelassis@camara.leg.br",
    telefone: "3215-5415",
    url_foto: "https://www.camara.leg.br/internet/deputado/bandep/220594.jpg",
    gabinete: {
      nome: "415",
      predio: "4",
      sala: "415",
    },
    redes_social: [
      "https://twitter.com/coronelassismt",
      "https://www.facebook.com/coronelassismt",
      "https://www.instagram.com/coronelassis",
      "https://youtube.com/coronelassis308",
    ],
    escolaridade: "Superior",
    data_nascimento: "1976-04-16",
  };

  return (
    <Container>
      <Sidebar>
        <BackButton>← Voltar</BackButton>
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
              {deputado.gabinete.nome || "Não Informado"}, Prédio{" "}
              {deputado.gabinete.predio || "Não Informado"}, Sala{" "}
              {deputado.gabinete.sala || "Não Informado"}
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
        <DespesasFilters tipos={tipos} estados={estados} onFilter={handleFilter} />
        <DespesasTable despesas={filteredDespesas.slice((page-1)*10, page*10)} />
    	<PaginateWrapper>
          <Paginate pageCount={Math.ceil(filteredDespesas.length/10)} onPageChange={setPage} />
        </PaginateWrapper>
      </MainContent>
    </Container>
  );
}
