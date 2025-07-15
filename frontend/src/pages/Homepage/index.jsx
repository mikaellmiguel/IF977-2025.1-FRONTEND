import { DeputadoCard } from "../../components/DeputadoCard";
import { SearchBar } from "../../components/SearchBar";
import { SideBar } from "../../components/SideBar";
import { Container, GridDeputados, Content} from "./styles";
import { useState, useEffect } from "react";
import {api} from "../../services/api";
import { toast } from "react-toastify";
import { Paginate } from "../../components/Paginate";

export function Homepage() {
  
    const [deputados, setDeputados] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 24;

    async function fetchDeputados(page = 1) {
        try {
            const response = await api.get(`/deputados?limit=${limit}&offset=${(page - 1) * limit}`);
            const dados = response.data.dados;
            setDeputados(Array.isArray(dados) ? dados : []);
            const totalItems = response.data.total || 0;
            console.log("Total de deputados:", totalItems);
            console.log("Total de páginas:", Math.ceil(totalItems / limit) || 1);
            setTotalPages(Math.ceil(totalItems / limit) || 1);
        } catch {
            toast.error("Erro ao buscar deputados");
            console.error("Erro ao buscar deputados");
        }
    }

    useEffect(() => {
        fetchDeputados(currentPage);
    }, [currentPage]);
  
    return (
        <Container>
            <SideBar />
            <Content>
                <SearchBar placeholder="Pesquisar deputados..." />
                <GridDeputados>
                    {Array.isArray(deputados) && deputados.length > 0 ? (
                        deputados.map((deputado) => (
                            <DeputadoCard key={deputado.id} deputado={deputado} />
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