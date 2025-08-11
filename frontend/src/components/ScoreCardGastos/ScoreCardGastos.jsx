import {Card, Label, SubValue, Value} from "./styles"
export function ScoreCardGastos({ total = 0, ticketMedio = 0 }) {
  return (
    <Card>
      <Label>Total de Gastos (2023 - 2025)</Label>
      <Value>R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Value>
      <SubValue>Ticket Médio: R$ {ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</SubValue>
    </Card>
  );
}
