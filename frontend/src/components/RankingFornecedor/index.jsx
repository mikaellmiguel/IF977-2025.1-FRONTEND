import {CardFornecedor, GridFornecedores, medalColors, Medal, defaultColor} from "./styles";
export function RankingFornecedores({ fornecedores }) {
  return (
    <GridFornecedores>
      {fornecedores.map((item, idx) => (
        <CardFornecedor key={item.fornecedor}>
          <Medal color={medalColors[idx] || defaultColor}>{idx + 1}º</Medal>
          <div style={{ flex: 1 }}>
            <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{item.fornecedor}</span>
          </div>
          <div style={{ minWidth: 120, textAlign: 'right', fontWeight: 'bold', color: '#444' }}>
            R$ {item.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </CardFornecedor>
      ))}
    </GridFornecedores>
  );
}
