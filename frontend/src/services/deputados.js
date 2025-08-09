import { api } from './api';

export async function getDeputadosById(id) {
    const {data} = await api.get(`/deputados/${id}`);
    return data;
}

export async function getDespesasByDeputado(id, {page, filtros}) {
    const limit = 10;
    const offset = (page - 1) * limit;
    const params = new URLSearchParams({
        limit,
        offset,
        ...filtros,
    });
    const {data} = await api.get(`/despesas/deputados/${id}?${params.toString()}`);
    return {
        dados: data.dados,
        totalPages: Math.ceil(data.total / limit),
    };
}