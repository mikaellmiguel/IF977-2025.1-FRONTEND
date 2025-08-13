import { GridDeputados, CardRanking, FotoArea, InfoArea, TotalArea } from "./styles";
import { useNavigate } from "react-router-dom";

export function RankingList({ deputados }) {
    const navigate = useNavigate();
    return (
        <GridDeputados>
            {deputados.length > 3 && deputados.slice(3).map((item, idx) => (
            <CardRanking key={item.id || idx} onClick={() => navigate(`/deputados/${item.id}`)} role="button" tabIndex={0}>
                <span style={{fontWeight:'bold', fontSize:'1.2rem', minWidth:32}}>{idx+4}º</span>
                <FotoArea>
                <img src={item.url_foto} alt={item.nome} />
                </FotoArea>
                <InfoArea>
                <span style={{fontWeight:'bold'}}>{item.nome || "-"}</span>
                <span style={{fontSize:'0.95rem', color:'#333'}}>{item.partido} - {item.uf}</span>
                </InfoArea>
                <TotalArea>
                R$ {Number(item.total_gasto).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </TotalArea>
            </CardRanking>
            ))}
        </GridDeputados>
  );
}
