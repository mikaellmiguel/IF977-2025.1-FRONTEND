import { Sidebar, BackButton, DeputadoName, InfoList, InfoItem } from "./styles";
import { Button } from "../../components/Button";
import {FiFlag, FiMapPin, FiBookOpen, FiCalendar} from "react-icons/fi";
import { calcularIdade } from "../../utils/calcularIdade";
import { formatarDataBR } from "../../utils/formatarDataBR";

export function DeputadoSidebar({ deputado, onBack, isFollowing, onFollow }) {

  return (
    <Sidebar>
      <BackButton onClick={onBack}>← Voltar</BackButton>
      <img src={deputado.url_foto} alt="Descrição da imagem" />
      <DeputadoName>{deputado.nome}</DeputadoName>
      <InfoList>
        <InfoItem><FiFlag /> {deputado.partido || "Não Informado"}</InfoItem>
        <InfoItem><FiMapPin /> {deputado.sigla_uf || "Não Informado"}</InfoItem>
        <InfoItem><FiBookOpen /> {deputado.escolaridade || "Não Informado"}</InfoItem>
        <InfoItem><FiCalendar /> {`${formatarDataBR(deputado.data_nascimento || "Não Informado")} - (${calcularIdade(deputado.data_nascimento)})`}</InfoItem>
      </InfoList>
      <Button onClick={onFollow}>{isFollowing ? "★ Deixar de Seguir" : "☆ Seguir Deputado"}</Button>
    </Sidebar>
  );
}
