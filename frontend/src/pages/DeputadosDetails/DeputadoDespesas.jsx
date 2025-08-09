import { SectionTitle, PaginateWrapper } from "./styles";
import { DespesasFilters } from "../../components/DespesasTable/Filters";
import { DespesasTable } from "../../components/DespesasTable";
import { Paginate } from "../../components/Paginate";

export function DeputadoDespesas({ tipos, estados, despesas, totalPages, page, setPage, setFiltros }) {
    function handleFilter({ tipo, estado, valorMin, valorMax }) {
        setPage(1);
        const filtrosApi = {};
        if (tipo) filtrosApi.tipo = tipo;
        if (estado) filtrosApi.uf = estado;
        if (valorMin) filtrosApi.valor_min = valorMin;
        if (valorMax) filtrosApi.valor_max = valorMax;
        setFiltros(filtrosApi);
    }

    function handleClear() {
        setPage(1);
        setFiltros({});
    }

    return (
        <>
        <SectionTitle>Despesas</SectionTitle>
        <DespesasFilters tipos={tipos} estados={estados} onFilter={handleFilter} onClear={handleClear} />
        <DespesasTable despesas={despesas} />
        <PaginateWrapper>
            <Paginate pageCount={totalPages} onPageChange={setPage} forcePage={page - 1} />
        </PaginateWrapper>
        </>
    );
}
