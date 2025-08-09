import { useState, useEffect } from 'react';
import { getDeputadosById, getDespesasByDeputado } from '../services/deputados';
import { toast } from 'react-toastify';

export function useDeputadoDetais(deputadoid) {
    const [deputado, setDeputado] = useState({});
    const [despesas, setDespesas] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
	const [filtros, setFiltros] = useState({});

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

    return { deputado, despesas, totalPages, page, setPage, filtros, setFiltros };

}