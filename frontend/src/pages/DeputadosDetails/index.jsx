import { calcularIdade } from "../../utils/calcularIdade";
import { formatarDataBR } from "../../utils/formatarDataBR";

import {Container, MainContent, BackButton, InfoItem, InfoList, Sidebar, DeputadoName, ContactCol, ContactRow, ContactItem, SectionTitle, PaginateWrapper} from "./styles";


import { Button } from "../../components/Button";
import {FiFlag, FiMapPin, FiBookOpen, FiCalendar, FiPhone, FiMail,} from "react-icons/fi";
import { renderRedeSocial } from "../../utils/renderRedeSocial";

export function DeputadosDetails() {

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
      </MainContent>
    </Container>
  );
}
