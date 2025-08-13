import React from "react";
import {
  CardContainer,
  FotoArea,
  InfoArea,
  DespesasArea,
  TotalArea
} from "./styles";

import { useNavigate } from "react-router-dom";
import { formatarDataBR } from "../../utils/formatarDataBR";
import { calcularIdade } from "../../utils/calcularIdade";

export function FollowDeputadoCard({ deputado, despesasPorAno, totalGasto}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/deputados/${deputado.id}`);
  };

  return (
    <CardContainer onClick={handleClick}>
      <FotoArea>
        <img src={deputado.url_foto} alt={`Foto de ${deputado.nome}`} />
      </FotoArea>
      <InfoArea>
        <b>{deputado.nome}</b>
        <div><b>Nascimento:</b> {formatarDataBR(deputado.data_nascimento)} ({calcularIdade(deputado.data_nascimento)} anos)</div>
        <div><b>Partido:</b> {deputado.partido}</div>
        <div><b>Estado:</b> {deputado.sigla_uf}</div>
        <div><b>E-mail:</b> {deputado.email}</div>
      </InfoArea>
      <DespesasArea>
        {Object.entries(despesasPorAno).map(([ano, valor]) => (
          <div key={ano}>{ano}: R$ {Number(valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
        ))}
      </DespesasArea>
      <TotalArea>
        <b>Total Gasto</b>
        <div>R$ {Number(totalGasto).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
      </TotalArea>
    </CardContainer>
  );
}
