import { useState, useEffect } from 'react';
import { getDeputadosById, getDespesasByDeputado } from '../services/deputados';
import { toast } from 'react-toastify';
import { api } from '../services/api';

export function useDeputadoDetais(deputadoid) {
    const [deputado, setDeputado] = useState({});
    const [despesas, setDespesas] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [filtros, setFiltros] = useState({});
    const [tipos, setTipos] = useState([]);
    const [estados, setEstados] = useState([]);

    useEffect(() => {
        getDeputadosById(deputadoid)
            .then(setDeputado)
            .catch(() => toast.error("Erro ao buscar detalhes do deputado"));
    }, [deputadoid]);

    useEffect(() => {
        getDespesasByDeputado(deputadoid, { page, filtros })
            .then(({ dados, totalPages }) => {
                setDespesas(dados);
                setTotalPages(totalPages);
            })
            .catch(() => toast.error("Erro ao buscar despesas do deputado"));
    }, [deputadoid, page, filtros]);

    useEffect(() => {
        async function fetchReferencias() {
            try {
                const response = await api.get(`/referencias/despesas?id=${deputadoid}`);
                setTipos(response.data.tipos || []);
                setEstados(response.data.estados || []);
            } catch {
                setTipos([]);
                setEstados([]);
            }
        }
        if (deputadoid) fetchReferencias();
    }, [deputadoid]);

    return { deputado, despesas, totalPages, page, setPage, filtros, setFiltros, tipos, estados };
}