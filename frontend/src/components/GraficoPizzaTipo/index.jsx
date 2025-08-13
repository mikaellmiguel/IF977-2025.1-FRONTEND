import {ColorBox, LegendContainer, LegendItem, LegendText} from "./styles";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28FD0', '#FF6F91'];


export function GraficoPizzaTipo({ data }) {
  // data: [{ tipo: 'Aluguel', valor: "5000" }, ...]
  // Garante que todos os valores sejam números
  const dataNumerica = data.map(item => ({ ...item, valor: Number(item.valor) }));
  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={dataNumerica}
          dataKey="valor"
          nameKey="tipo"
          cx="50%"
          cy="50%"
          outerRadius={110}
        >
          {dataNumerica.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          layout='vertical'
          align="right"
          verticalAlign="middle"
          formatter={(value, entry) => {
            const total = dataNumerica.reduce((acc, cur) => acc + cur.valor, 0);
            const percent = ((entry.payload.valor / total) * 100).toFixed(1);
            const valorFormatado = entry.payload.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            return `${value}: ${valorFormatado} (${percent}%)`;
          }}
          content={({ payload }) => (
            <LegendContainer>
              {payload.map((entry, i) => (
                <LegendItem key={`legend-item-${i}`}> 
                  <ColorBox color={entry.color} />
                  <LegendText>
                    {entry.value}: {entry.payload.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} ({((entry.payload.valor / dataNumerica.reduce((acc, cur) => acc + cur.valor, 0)) * 100).toFixed(1)}%)
                  </LegendText>
                </LegendItem>
              ))}
            </LegendContainer>
          )}
        />
        <Tooltip formatter={v => Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} contentStyle={{ backgroundColor: "#fff" }}/>
      </PieChart>
    </ResponsiveContainer>
  );
}
