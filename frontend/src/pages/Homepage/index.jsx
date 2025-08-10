import { DeputadoCard } from "../../components/DeputadoCard";
import { SearchBar } from "../../components/SearchBar";
import { SideBar } from "../../components/SideBar";
import { Container, GridDeputados, Content, SearchFiltersBar } from "./styles";
import { Filters } from "./Filters";
import { useState, useEffect, useCallback } from "react";
import {api} from "../../services/api";
import { toast } from "react-toastify";
import { Paginate } from "../../components/Paginate";
import { useNavigate } from "react-router-dom";

export function Homepage() {
  
    const [deputados, setDeputados] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({ name: "", partido: "", uf: "" });
    const limit = 24;
    const navigate = useNavigate();

    const fetchDeputados = useCallback(async (page = 1, filtersObj = filters) => {
        try {
            const params = new URLSearchParams();
            params.append("limit", limit);
            params.append("offset", (page - 1) * limit);
            if (filtersObj.name) params.append("name", filtersObj.name);
            if (filtersObj.partido) params.append("partido", filtersObj.partido);
            if (filtersObj.uf) params.append("uf", filtersObj.uf);
            const response = await api.get(`/deputados/search?${params.toString()}`);
            const dados = response.data.dados;
            setDeputados(Array.isArray(dados) ? dados : []);
            const totalItems = response.data.total || 0;
            setTotalPages(Math.ceil(totalItems / limit) || 1);
        } catch {
            toast.error("Erro ao buscar deputados");
        }
    }, [limit, filters]);

    useEffect(() => {
        fetchDeputados(currentPage, filters);
    }, [currentPage, filters, fetchDeputados]);
  
    return (
        <Container>
            <SideBar />
            <Content>
                <SearchFiltersBar>
                    <SearchBar
                        placeholder="Pesquisar deputados..."
                        value={filters.name}
                        onChange={e => setFilters(f => ({ ...f, name: e.target.value }))}
                    />
                
                    <Filters filters={filters} setFilters={setFilters} />
                </SearchFiltersBar>
                <GridDeputados>
                    {Array.isArray(deputados) && deputados.length > 0 ? (
                        deputados.map((deputado) => (
                            <DeputadoCard key={deputado.id} deputado={deputado} onClick={() => navigate(`/deputados/${deputado.id}`)} />
                        ))
                    ) : (
                        <p>Nenhum deputado encontrado.</p>
                    )}
                </GridDeputados>
                <Paginate
                    pageCount={totalPages}
                    onPageChange={setCurrentPage}
                />
            </Content>
        </Container>
    );
}