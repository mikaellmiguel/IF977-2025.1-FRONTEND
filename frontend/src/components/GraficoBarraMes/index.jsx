import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export function GraficoBarraMes({ data }) {
  // data: [{ mes: 'Jan', valor: 1200 }, ...]
  return (
    <ResponsiveContainer width="99%" height={200}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip formatter={v => `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} />
        <Bar dataKey="valor" fill="#82ca9d" name="Gasto por Mês" />
      </BarChart>
    </ResponsiveContainer>
  );
}
