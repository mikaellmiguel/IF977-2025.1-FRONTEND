import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export function GraficoBarraAno({ data, height=220 }) {
  // data: [{ ano: '2023', valor: 10000 }, ...]
  return (
    <ResponsiveContainer width="99%" height={height}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="ano" />
        <YAxis />
        <Tooltip formatter={v => `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} />
        <Bar dataKey="valor" fill="#8884d8" name="Gasto por Ano" />
      </BarChart>
    </ResponsiveContainer>
  );
}