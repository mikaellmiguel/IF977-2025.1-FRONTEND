import {Card, Label, Value} from "./styles"
export function CardDashboard({ label, value}) {
  return (
    <Card>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </Card>
  );
}
