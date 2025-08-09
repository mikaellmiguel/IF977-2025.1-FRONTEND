import { ContactCol, ContactRow, ContactItem, SectionTitle } from "./styles";
import {FiPhone, FiMail, FiMapPin} from "react-icons/fi";
import { renderRedeSocial } from "../../utils/renderRedeSocial";

export function DeputadoContato({ deputado }) {
  return (
    <>
      <SectionTitle>Dados de Contato</SectionTitle>
      <ContactRow>
        <ContactCol>
          <ContactItem><FiPhone /> <strong>Telefone:</strong> {deputado.telefone || "Não Informado"}</ContactItem>
          <ContactItem><FiMail /> <strong>Email:</strong> {deputado.email || "Não Informado"}</ContactItem>
          <ContactItem>
            <FiMapPin /> <strong>Endereço:</strong> Gabinete {deputado.gabinete?.nome || "Não Informado"}, Prédio {deputado.gabinete?.predio || "Não Informado"}, Sala {deputado.gabinete?.sala || "Não Informado"}
          </ContactItem>
        </ContactCol>
        <ContactCol>
          {deputado.redes_social?.map((rede, index) => (
            <ContactItem key={index}>
              {renderRedeSocial(rede)}
              <a href={rede} target="_blank" rel="noopener noreferrer">{rede}</a>
            </ContactItem>
          ))}
        </ContactCol>
      </ContactRow>
    </>
  );
}
