import { useState, useEffect } from "react";
import { SideBar } from "../../components/SideBar";
import { FollowDeputadoCard } from "../../components/FollowDeputadoCard";
import { Container, Content, GridDeputados } from "./styles";
import { api } from "../../services/api";
import { toast } from "react-toastify";

export function Follows() {
  const [deputadosSeguidos, setDeputadosSeguidos] = useState([]);

  async function fetchSeguidos() {
    try {
      const response = await api.get("/follows");
      setDeputadosSeguidos(Array.isArray(response.data) ? response.data : []);
    } catch {
      toast.error("Erro ao buscar deputados seguidos");
    }
  }

  useEffect(() => {
    fetchSeguidos();
  }, []);

  return (
    <Container>
      <SideBar />
      <Content>
        <h1>Deputados Seguidos</h1>
        <GridDeputados>
          {deputadosSeguidos.length > 0 ? (
            deputadosSeguidos.map((item) => (
              <FollowDeputadoCard
                key={item.deputado?.id}
                deputado={item.deputado}
                despesasPorAno={item.despesasPorAno}
                totalGasto={item.totalGasto}
                onCli
              />
            ))
          ) : (
            <p>Nenhum deputado seguido.</p>
          )}
        </GridDeputados>
      </Content>
    </Container>
  );
}
