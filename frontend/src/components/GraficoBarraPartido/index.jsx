import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export function GraficoBarraPartido({ data, height = 300 }) {
  // data: [{ partido: 'Partido A', valor: 10000 }, ...]
  return (
    <ResponsiveContainer width="99%" height={height}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="partido" />
        <YAxis />
        <Tooltip formatter={v => `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} />
        <Bar dataKey="valor" fill="#8884d8" name="Gasto por Partido" />
      </BarChart>
    </ResponsiveContainer>
  );
}
