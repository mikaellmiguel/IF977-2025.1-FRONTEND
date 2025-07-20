import { calcularIdade } from "../../utils/calcularIdade";
import { formatarDataBR } from "../../utils/formatarDataBR";
import { Card, CardData, CardImage} from "./styles"

export function DeputadoCard({ deputado }) {
  return (
    <Card>
        <CardImage src={deputado.url_foto} alt={`${deputado.nome} - ${deputado.partido}`} />
        <CardData>
            <h2>{deputado.nome}</h2>
            <p><strong>Partido: </strong>{deputado.partido}</p>
            <p><strong>Estado:</strong> {deputado.sigla_uf}</p>
            <p><strong>Nascimento:</strong> {formatarDataBR(deputado.data_nascimento)} ({calcularIdade(deputado.data_nascimento)})</p>
        </CardData>
    </Card>
  );
}