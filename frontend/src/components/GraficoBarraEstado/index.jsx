import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export function GraficoBarraEstado({ data }) {
  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: 16 }}>Gastos por Estado</h2>
      <ResponsiveContainer width="90%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="sigla_uf" />
          <YAxis />
          <Tooltip formatter={v => `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} />
          <Bar dataKey="total" fill="#82ca9d" name="Gasto por Estado" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
