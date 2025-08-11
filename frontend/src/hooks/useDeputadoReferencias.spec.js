import { renderHook, waitFor } from '@testing-library/react';
import { useDeputadoReferencias } from './useDeputadoReferencias';
import { toast } from 'react-toastify';

jest.mock('../services/api', () => ({
	api: {
		get: jest.fn(),
	},
}));

import {api} from '../services/api';

jest.mock('react-toastify', () => ({
	toast: { error: jest.fn() },
}));

describe('useDeputadoReferencias', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('retorna estados e partidos corretamente', async () => {
		api.get.mockResolvedValueOnce({ data: { estados: ['SP', 'RJ'], partidos: ['PSOL', 'PT'] } });
		const { result } = renderHook(() => useDeputadoReferencias());
		await waitFor(() => expect(result.current.estados.length).toBeGreaterThan(0));
		expect(result.current.estados).toEqual(['SP', 'RJ']);
		expect(result.current.partidos).toEqual(['PSOL', 'PT']);
	});

	it('retorna arrays vazios se resposta não tem dados', async () => {
		api.get.mockResolvedValueOnce({ data: {} });
		const { result } = renderHook(() => useDeputadoReferencias());
		await waitFor(() => expect(Array.isArray(result.current.estados)).toBe(true));
		expect(result.current.estados).toEqual([]);
		expect(result.current.partidos).toEqual([]);
	});

	it('chama toast.error em caso de erro', async () => {
		api.get.mockRejectedValueOnce(new Error('fail'));
		const { result } = renderHook(() => useDeputadoReferencias());
		await waitFor(() => expect(toast.error).toHaveBeenCalled());
		expect(toast.error).toHaveBeenCalledWith('Erro ao buscar referências de deputados');
		expect(result.current.estados).toEqual([]);
		expect(result.current.partidos).toEqual([]);
	});

	it('não faz múltiplas chamadas desnecessárias', async () => {
		api.get.mockResolvedValue({ data: { estados: ['PE'], partidos: ['MDB'] } });
		const { result } = renderHook(() => useDeputadoReferencias());
		await waitFor(() => expect(result.current.estados.length).toBeGreaterThan(0));
		expect(api.get).toHaveBeenCalledTimes(1);
		expect(result.current.estados).toEqual(['PE']);
		expect(result.current.partidos).toEqual(['MDB']);
	});
});
