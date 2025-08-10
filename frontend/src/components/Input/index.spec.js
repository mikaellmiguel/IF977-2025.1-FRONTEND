import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './index';

describe('Input', () => {
  it('deve renderizar o label e o input corretamente', () => {
    render(<Input name="email" label="E-mail" />);
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'email');
  });

  it('deve passar props adicionais para o input', () => {
    render(<Input name="senha" label="Senha" type="password" placeholder="Digite sua senha" />);
    const input = screen.getByPlaceholderText('Digite sua senha');
    expect(input).toHaveAttribute('type', 'password');
    expect(input).toHaveAttribute('id', 'senha');
  });

  it('deve renderizar múltiplos inputs com labels distintos', () => {
    render(
      <>
        <Input name="nome" label="Nome" />
        <Input name="idade" label="Idade" />
      </>
    );
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('Idade')).toBeInTheDocument();
  });

  it('deve associar o label ao input pelo id', () => {
    render(<Input name="usuario" label="Usuário" />);
    const label = screen.getByText('Usuário');
    const input = screen.getByLabelText('Usuário');
    expect(label).toHaveAttribute('for', 'usuario');
    expect(input).toHaveAttribute('id', 'usuario');
  });

  it('deve aceitar e exibir o valor passado via prop value', () => {
    render(<Input name="cidade" label="Cidade" value="Recife" readOnly />);
    expect(screen.getByDisplayValue('Recife')).toBeInTheDocument();
  });

  it('deve disparar eventos de mudança', () => {
    const handleChange = jest.fn();
    render(<Input name="telefone" label="Telefone" onChange={handleChange} />);
    const input = screen.getByLabelText('Telefone');
    fireEvent.change(input, { target: { value: '999999999' } });
    expect(handleChange).toHaveBeenCalled();
  });
});
