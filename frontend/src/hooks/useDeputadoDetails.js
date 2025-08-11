import { useState, useEffect } from 'react';
import { getDeputadosById, getDespesasByDeputado } from '../services/deputados';
import { toast } from 'react-toastify';
import { api } from '../services/api';

export function useDeputadoDetais(deputadoid) {
    const [deputado, setDeputado] = useState({});
    const [despesas, setDespesas] = useState([]);
    const [estatisticas, setEstatisticas] = useState(null);
    
    useEffect(() => {
        async function fetchEstatisticas() {
            try {
                const response = await api.get(`/despesas/statistics?deputado_id=${deputadoid}`);
                setEstatisticas(response.data);
            } catch {
                setEstatisticas(null);
                toast.error("Erro ao buscar estatísticas de despesas");
            }
        }
        if (deputadoid) fetchEstatisticas();
    }, [deputadoid]);
    
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [filtros, setFiltros] = useState({});
    const [tipos, setTipos] = useState([]);
    const [estados, setEstados] = useState([]);
    const [isFollowing, setIsFollowing] = useState(deputado.isFollowing || false);

    useEffect(() => {
        getDeputadosById(deputadoid)
            .then(deputado => {
                setDeputado(deputado);
                setIsFollowing(deputado.isFollowing || false);
            })
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

    return { deputado, despesas, estatisticas, totalPages, page, setPage, filtros, setFiltros, tipos, estados, isFollowing, setIsFollowing };
}