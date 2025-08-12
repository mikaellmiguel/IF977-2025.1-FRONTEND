import { BottomMenu, Container, LogoImage, MainMenu, MenuItem } from "./styles";
import { FaUserTie, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BsPinAngleFill } from "react-icons/bs";
import { FaRankingStar } from "react-icons/fa6";
import logo from "../../assets/logo.png";
import { useAuth } from "../../hooks/useAuth";

export function SideBar() {
    const { signOut } = useAuth();
    const navigate = useNavigate();

    return (
        <Container>
            <LogoImage>
                <img src={logo} alt="Logo da aplicação FiscalizaDeputado"/>
                <p>FiscalizaDeputado</p>
            </LogoImage>

            <MainMenu>
                <p>Deputados</p>
                <MenuItem onClick={() => navigate("/")}> <FaUserTie /> Pesquisar </MenuItem>
                <MenuItem onClick={() => navigate("/follows")}> <BsPinAngleFill /> Seguidos </MenuItem>
                <MenuItem onClick={() => navigate("/ranking")}> <FaRankingStar /> Ranking de Gastos </MenuItem>
                <MenuItem onClick={() => navigate("/dashboard")}> <FaRankingStar /> Dashboard </MenuItem>
            </MainMenu>

            <BottomMenu>
                <MenuItem onClick={() => navigate("/profile")}> <FaUserTie /> Perfil </MenuItem>
                <MenuItem onClick={() => signOut()}> <FaSignOutAlt /> Sair </MenuItem>
            </BottomMenu>
        </Container>
    )
}