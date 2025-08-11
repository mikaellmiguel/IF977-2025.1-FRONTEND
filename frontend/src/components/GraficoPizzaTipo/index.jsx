import {ColorBox, LegendContainer, LegendItem, LegendText} from "./styles";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28FD0', '#FF6F91'];


export function GraficoPizzaTipo({ data }) {
  // data: [{ tipo: 'Aluguel', valor: 5000 }, ...]
  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={data}
          dataKey="valor"
          nameKey="tipo"
          cx="50%"
          cy="50%"
          outerRadius={110}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          layout='vertical'
          align="right"
          verticalAlign="middle"
          formatter={(value, entry) => {
            const total = data.reduce((acc, cur) => acc + cur.valor, 0);
            const percent = ((entry.payload.valor / total) * 100).toFixed(1);
            return `${value}: ${percent}%`;
          }}
          content={({ payload }) => (
            <LegendContainer>
              {payload.map((entry, i) => (
                <LegendItem key={`legend-item-${i}`}> 
                  <ColorBox color={entry.color} />
                  <LegendText>
                    {entry.value}: {((entry.payload.valor / data.reduce((acc, cur) => acc + cur.valor, 0)) * 100).toFixed(1)}%
                  </LegendText>
                </LegendItem>
              ))}
            </LegendContainer>
          )}
        />
        <Tooltip formatter={v => `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} contentStyle={{ backgroundColor: "#fff" }}/>
      </PieChart>
    </ResponsiveContainer>
  );
}
