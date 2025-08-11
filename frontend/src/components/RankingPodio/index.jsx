import { Podio, PodioItem } from "./styles";
import { useNavigate } from "react-router-dom";

const medalColors = [
  '#FFD700', // ouro
  '#C0C0C0', // prata
  '#CD7F32'  // bronze
];

export function RankingPodio({ deputados }) {
  const navigate = useNavigate();
  return (
    <Podio>
      {deputados.slice(0,3).map((item, idx) => (
        <PodioItem
          key={item.id || idx}
          style={{background: medalColors[idx], border: '2px solid ' + medalColors[idx]}}
          $destaque
          onClick={() => navigate(`/deputados/${item.id}`)}
          role="button"
          tabIndex={0}
        >
          <h4>{idx+1}º</h4>
          <img src={item.url_foto} alt={item.nome} />
          <span>{item.nome || "-"}</span>
          <span>{item.partido} - {item.uf}</span>
          <span>R$ {item.total_gasto?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        </PodioItem>
      ))}
    </Podio>
  );
}
