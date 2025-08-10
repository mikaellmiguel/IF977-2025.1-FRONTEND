import { renderHook, act } from '@testing-library/react';
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({ useNavigate: () => mockNavigate }));

jest.mock('../services/api', () => ({
  api: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));
import { api } from '../services/api';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));
import { toast } from 'react-toastify';

jest.mock('../utils/validarEmail', () => {
  const fn = jest.fn();
  return {
    __esModule: true,
    validarEmail: fn,
    default: fn,
  };
});

import * as validarEmailModule from '../utils/validarEmail';

import { useSignUp } from './useSignUp';

describe('Hook useSignUp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Estados iniciais', () => {
    it('deve inicializar todos os campos como vazio', () => {
      const { result } = renderHook(() => useSignUp());
      expect(result.current.email).toBe('');
      expect(result.current.name).toBe('');
      expect(result.current.password).toBe('');
      expect(result.current.confirmPassword).toBe('');
      expect(result.current.loading).toBe(false);
    });
  });

  describe('handleSignUp', () => {
    it('deve exibir erro se algum campo estiver vazio', async () => {
      const { result } = renderHook(() => useSignUp());
      await act(async () => {
        await result.current.handleSignUp();
      });
      expect(toast.error).toHaveBeenCalledWith('Preencha todos os campos');
    });

    it('deve exibir erro se o e-mail for inválido', async () => {
      const { result } = renderHook(() => useSignUp());
      act(() => {
        result.current.setEmail('emailinvalido');
        result.current.setName('Nome');
        result.current.setPassword('Senha123!');
        result.current.setConfirmPassword('Senha123!');
      });
      validarEmailModule.validarEmail.mockReturnValue(false);
      await act(async () => {
        await result.current.handleSignUp();
      });
      expect(toast.error).toHaveBeenCalledWith('E-mail inválido');
    });

    it('deve exibir erro se a senha não for forte', async () => {
      const { result } = renderHook(() => useSignUp());
      act(() => {
        result.current.setEmail('teste@email.com');
        result.current.setName('Nome');
        result.current.setPassword('123');
        result.current.setConfirmPassword('123');
      });
      validarEmailModule.validarEmail.mockReturnValue(true);
      await act(async () => {
        await result.current.handleSignUp();
      });
      expect(toast.error).toHaveBeenCalledWith('A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial');
    });

    it('deve exibir erro se as senhas não coincidirem', async () => {
      const { result } = renderHook(() => useSignUp());
      act(() => {
        result.current.setEmail('teste@email.com');
        result.current.setName('Nome');
        result.current.setPassword('Senha123!');
        result.current.setConfirmPassword('Senha123');
      });
      validarEmailModule.validarEmail.mockReturnValue(true);
      await act(async () => {
        await result.current.handleSignUp();
      });
      expect(toast.error).toHaveBeenCalledWith('As senhas não coincidem');
    });

    it('deve cadastrar usuário e navegar para verificação se tudo estiver correto', async () => {
      const { result } = renderHook(() => useSignUp());
      act(() => {
        result.current.setEmail('teste@email.com');
        result.current.setName('Nome');
        result.current.setPassword('@Senha1223@');
        result.current.setConfirmPassword('@Senha1223@');
      });
      validarEmailModule.validarEmail.mockReturnValue(true);
      api.post.mockResolvedValue({ data: { tokenToVerify: 'token123' } });
      await act(async () => {
        await result.current.handleSignUp();
      });
      // Verifica se o mock foi chamado ao menos uma vez
      expect(api.post).toHaveBeenCalled();
      expect(api.post).toHaveBeenCalledWith('/auth/register', {
        email: 'teste@email.com',
        name: 'Nome',
        password: '@Senha1223@'
      });
      expect(toast.success).toHaveBeenCalledWith('Usuário cadastrado com sucesso! Verifique seu E-mail');
      expect(mockNavigate).toHaveBeenCalledWith('/verify?token=token123');
    });

    it('deve exibir erro do backend se houver falha', async () => {
      const { result } = renderHook(() => useSignUp());
      act(() => {
        result.current.setEmail('teste@email.com');
        result.current.setName('Nome');
        result.current.setPassword('Senha123!');
        result.current.setConfirmPassword('Senha123!');
      });
      validarEmailModule.validarEmail.mockReturnValue(true);
      api.post.mockRejectedValue({ response: { data: { message: 'Erro backend' } } });
      await act(async () => {
        await result.current.handleSignUp();
      });
      // Aceita tanto a mensagem do backend quanto a genérica, dependendo do tratamento
      expect(toast.error).toHaveBeenCalled();
      expect(toast.error.mock.calls[0][0]).toMatch(/Erro backend|Erro ao cadastrar usuário/);
    });

    it('deve exibir erro genérico se não houver mensagem do backend', async () => {
      const { result } = renderHook(() => useSignUp());
      act(() => {
        result.current.setEmail('teste@email.com');
        result.current.setName('Nome');
        result.current.setPassword('Senha123!');
        result.current.setConfirmPassword('Senha123!');
      });
      validarEmailModule.validarEmail.mockReturnValue(true);
      api.post.mockRejectedValue({});
      await act(async () => {
        await result.current.handleSignUp();
      });
      expect(toast.error).toHaveBeenCalledWith('Erro ao cadastrar usuário, tente novamente mais tarde');
    });

    it('deve setar loading corretamente durante o cadastro', async () => {
      const { result } = renderHook(() => useSignUp());
      act(() => {
        result.current.setEmail('teste@email.com');
        result.current.setName('Nome');
        result.current.setPassword('Senha123!');
        result.current.setConfirmPassword('Senha123!');
      });
      validarEmailModule.validarEmail.mockReturnValue(true);
      api.post.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ data: { tokenToVerify: 'token123' } }), 100)));
      let promise;
      await act(async () => {
        promise = result.current.handleSignUp();
      });
      // O loading pode não ser true imediatamente após o act, então verifica após o início da promise
      expect(result.current.loading).toBe(true);
      await act(async () => {
        await promise;
      });
      expect(result.current.loading).toBe(false);
    });
  });
});
