import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Container, Form, Left, Img, Buttons, GoogleAuth} from "./styles";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth.jsx";
import { toast } from "react-toastify";
import { validarEmail } from "../../utils/validarEmail";
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png';

export function SignIn() {

    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {signIn} = useAuth();

    function handleSignIn(){
        if (email === "" || password === "") {
            toast.error("Preencha todos os campos");
            return;
        }
        if(validarEmail(email) === false) {
            toast.error("E-mail inválido");
            return;
        }
        signIn({email, password})
    }

    return (
        <Container>
            <Left>
                <img src={logo} alt="Logo"/>
                <h1>Bem-Vindo ao FiscalizaDeputado!</h1>
                <Form>
                    <Input type="email" name="email" label="E-mail" value={email} onChange={(event) => setEmail(event.target.value)}/>
                    <Input type="password" name="password" label="Senha" value={password} onChange={(event) => setPassword(event.target.value)}/>
                </Form>
                <Buttons>
                        <Button onClick={() => handleSignIn()}>Entrar</Button>
                        <Button onClick={() => navigate("/register")}>Cadastrar-se</Button>
                </Buttons>
                <GoogleAuth>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            console.log('Login Success:', credentialResponse);
                            signIn({}, credentialResponse.credential);
                        }}
                        onError={() => {
                            toast.error("Falha no login com Google");
                        }} size="large"
                    />
                </GoogleAuth>
            </Left>
            <Img></Img>
        </Container>
    )
}