import { renderHook, act } from '@testing-library/react';
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({ useNavigate: () => mockNavigate }));

const mockApi = { post: jest.fn() };
jest.mock('../services/api', () => ({ api: mockApi }));

const mockToast = { success: jest.fn(), error: jest.fn() };
jest.mock('react-toastify', () => ({ toast: mockToast }));


const mockValidarEmail = jest.fn(() => true);
jest.mock('../utils/validarEmail', () => ({
    __esModule: true,
    validarEmail: mockValidarEmail,
    default: mockValidarEmail,
}));
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
      expect(mockToast.error).toHaveBeenCalledWith('Preencha todos os campos');
    });

    it('deve exibir erro se o e-mail for inválido', async () => {
      const { result } = renderHook(() => useSignUp());
      act(() => {
        result.current.setEmail('emailinvalido');
        result.current.setName('Nome');
        result.current.setPassword('Senha123!');
        result.current.setConfirmPassword('Senha123!');
      });
      mockValidarEmail.mockReturnValue(false);
      await act(async () => {
        await result.current.handleSignUp();
      });
      expect(mockToast.error).toHaveBeenCalledWith('E-mail inválido');
    });

    it('deve exibir erro se a senha não for forte', async () => {
      const { result } = renderHook(() => useSignUp());
      act(() => {
        result.current.setEmail('teste@email.com');
        result.current.setName('Nome');
        result.current.setPassword('123');
        result.current.setConfirmPassword('123');
      });
      mockValidarEmail.mockReturnValue(true);
      await act(async () => {
        await result.current.handleSignUp();
      });
      expect(mockToast.error).toHaveBeenCalledWith('A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial');
    });

    it('deve exibir erro se as senhas não coincidirem', async () => {
      const { result } = renderHook(() => useSignUp());
      act(() => {
        result.current.setEmail('teste@email.com');
        result.current.setName('Nome');
        result.current.setPassword('Senha123!');
        result.current.setConfirmPassword('Senha123');
      });
      mockValidarEmail.mockReturnValue(true);
      await act(async () => {
        await result.current.handleSignUp();
      });
      expect(mockToast.error).toHaveBeenCalledWith('As senhas não coincidem');
    });

    it('deve cadastrar usuário e navegar para verificação se tudo estiver correto', async () => {
      const { result } = renderHook(() => useSignUp());
      act(() => {
        result.current.setEmail('teste@email.com');
        result.current.setName('Nome');
        result.current.setPassword('Senha123!');
        result.current.setConfirmPassword('Senha123!');
      });
      mockValidarEmail.mockReturnValue(true);
      mockApi.post.mockResolvedValue({ data: { tokenToVerify: 'token123' } });
      await act(async () => {
        await result.current.handleSignUp();
      });
      expect(mockApi.post).toHaveBeenCalledWith('/auth/register', {
        email: 'teste@email.com',
        name: 'Nome',
        password: 'Senha123!'
      });
      expect(mockToast.success).toHaveBeenCalledWith('Usuário cadastrado com sucesso! Verifique seu E-mail');
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
      mockValidarEmail.mockReturnValue(true);
      mockApi.post.mockRejectedValue({ response: { data: { message: 'Erro backend' } } });
      await act(async () => {
        await result.current.handleSignUp();
      });
      expect(mockToast.error).toHaveBeenCalledWith('Erro backend');
    });

    it('deve exibir erro genérico se não houver mensagem do backend', async () => {
      const { result } = renderHook(() => useSignUp());
      act(() => {
        result.current.setEmail('teste@email.com');
        result.current.setName('Nome');
        result.current.setPassword('Senha123!');
        result.current.setConfirmPassword('Senha123!');
      });
      mockValidarEmail.mockReturnValue(true);
      mockApi.post.mockRejectedValue({});
      await act(async () => {
        await result.current.handleSignUp();
      });
      expect(mockToast.error).toHaveBeenCalledWith('Erro ao cadastrar usuário, tente novamente mais tarde');
    });

    it('deve setar loading corretamente durante o cadastro', async () => {
      const { result } = renderHook(() => useSignUp());
      act(() => {
        result.current.setEmail('teste@email.com');
        result.current.setName('Nome');
        result.current.setPassword('Senha123!');
        result.current.setConfirmPassword('Senha123!');
      });
      mockValidarEmail.mockReturnValue(true);
      mockApi.post.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ data: { tokenToVerify: 'token123' } }), 100)));
      await act(async () => {
        const promise = result.current.handleSignUp();
        expect(result.current.loading).toBe(true);
        await promise;
        expect(result.current.loading).toBe(false);
      });
    });
  });
});
