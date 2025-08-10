import { render, act } from '@testing-library/react';
import { useVerifyCode } from './useVerifyCode';

function HookWrapper(props) {
  const hook = useVerifyCode(props.length);
  props.onResult(hook);
  return null;
}

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

describe('useVerifyCode', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('lógica de input', () => {
    it('deve inicializar o código com o tamanho correto', () => {
      let result;
      render(<HookWrapper length={6} onResult={r => (result = r)} />);
      expect(result.code).toEqual(['', '', '', '', '', '']);
    });

    it('deve definir o valor do código no índice correto', () => {
      let result;
      render(<HookWrapper length={4} onResult={r => (result = r)} />);
      act(() => result.handleChange({ target: { value: '5' } }, 2));
      expect(result.code[2]).toBe('5');
    });

    it('deve mover o foco para o próximo input ao digitar', () => {
      let result;
      render(<HookWrapper length={4} onResult={r => (result = r)} />);
      result.inputsRef.current = [null, { focus: jest.fn() }, null, null];
      act(() => result.handleChange({ target: { value: '1' } }, 0));
      expect(result.inputsRef.current[1].focus).toHaveBeenCalled();
    });

    it('deve limpar o valor e mover o foco ao usar backspace', () => {
      let result;
      render(<HookWrapper length={4} onResult={r => (result = r)} />);
      result.inputsRef.current = [null, { focus: jest.fn() }, null, null];
      act(() => result.handleChange({ target: { value: '2' } }, 1));
      act(() => result.handleKeyDown({ key: 'Backspace' }, 1));
      expect(result.code[1]).toBe('');
    });

    it('deve mover o foco para o input anterior se estiver vazio e pressionar backspace', () => {
      let result;
      render(<HookWrapper length={4} onResult={r => (result = r)} />);
      // Garante que todos os refs tenham um objeto de foco
      result.inputsRef.current = [ { focus: jest.fn() }, { focus: jest.fn() }, null, null ];
      act(() => result.handleKeyDown({ key: 'Backspace' }, 1));
      expect(result.inputsRef.current[0].focus).toHaveBeenCalled();
    });

    it('deve distribuir os dígitos corretamente ao colar', () => {
      let result;
      render(<HookWrapper length={4} onResult={r => (result = r)} />);
      result.inputsRef.current = [null, null, null, { focus: jest.fn() }];
      const event = {
        preventDefault: jest.fn(),
        clipboardData: { getData: () => '1234' },
      };
      act(() => result.handlePaste(event));
      expect(result.code).toEqual(['1', '2', '3', '4']);
      expect(result.inputsRef.current[3].focus).toHaveBeenCalled();
    });
  });

  describe('verificação do código', () => {
    it('deve verificar o código e navegar em caso de sucesso', async () => {
      api.post.mockResolvedValue({ status: 200 });
      let result;
      render(<HookWrapper length={4} onResult={r => (result = r)} />);
      await act(async () => {
        await result.verifyCode('test@mail.com', '1234');
      });
      expect(api.post).toHaveBeenCalledWith('auth/verify', { email: 'test@mail.com', verificationCode: '1234' });
      expect(toast.success).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    it('deve exibir erro em caso de falha na verificação', async () => {
      api.post.mockRejectedValue({ response: { data: { message: 'Erro!' } } });
      let result;
      render(<HookWrapper length={4} onResult={r => (result = r)} />);
      await act(async () => {
        await result.verifyCode('test@mail.com', '9999');
      });
      expect(toast.error).toHaveBeenCalledWith('Erro!');
    });
  });

  describe('confirmação do token', () => {
    it('deve retornar o e-mail em caso de sucesso', async () => {
      api.get.mockResolvedValue({ status: 200, data: { email: 'test@mail.com' } });
      let result;
      render(<HookWrapper length={4} onResult={r => (result = r)} />);
      let email;
      await act(async () => {
        email = await result.confirmToken('token123');
      });
      expect(email).toBe('test@mail.com');
    });

    it('deve navegar para /404 em caso de erro', async () => {
      api.get.mockResolvedValue({ status: 400, data: {} });
      let result;
      render(<HookWrapper length={4} onResult={r => (result = r)} />);
      await act(async () => {
        await result.confirmToken('token123');
      });
      expect(mockNavigate).toHaveBeenCalledWith('/404');
    });
  });

  describe('reenvio do código', () => {
    it('deve exibir toast de sucesso ao reenviar', async () => {
      api.post.mockResolvedValue({ status: 200 });
      let result;
      render(<HookWrapper length={4} onResult={r => (result = r)} />);
      await act(async () => {
        await result.resendCode('test@mail.com');
      });
      expect(toast.success).toHaveBeenCalled();
    });

    it('deve exibir toast de erro ao falhar o reenvio', async () => {
      api.post.mockRejectedValue({ response: { data: { message: 'Erro ao reenviar!' } } });
      let result;
      render(<HookWrapper length={4} onResult={r => (result = r)} />);
      await act(async () => {
        await result.resendCode('test@mail.com');
      });
      expect(toast.error).toHaveBeenCalledWith('Erro ao reenviar!');
    });
  });
});
