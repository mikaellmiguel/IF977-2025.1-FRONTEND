import { BottomMenu, Container, LogoImage, MainMenu, MenuItem } from "./styles";
import { FaUserTie } from "react-icons/fa";
import { BsPinAngleFill } from "react-icons/bs";
import { FaRankingStar } from "react-icons/fa6";
import logo from "../../assets/logo.png";

export function SideBar() {
    return (
        <Container>
            <LogoImage>
                <img src={logo} alt="Logo da aplicação FiscalizaDeputado"/>
                <p>FiscalizaDeputado</p>
            </LogoImage>

            <MainMenu>
                <p>Deputados</p>
                <MenuItem>
                    <FaUserTie /> Pesquisar
                </MenuItem>
                <MenuItem>
                    <BsPinAngleFill /> Seguidos
                </MenuItem>
                <MenuItem>
                    <FaRankingStar /> Ranking de Gastos
                </MenuItem>
            </MainMenu>

            <BottomMenu>
                <MenuItem>
                    <FaUserTie /> Perfil
                </MenuItem>
                <MenuItem>
                    <BsPinAngleFill /> Sair
                </MenuItem>
            </BottomMenu>
        </Container>
    )
}