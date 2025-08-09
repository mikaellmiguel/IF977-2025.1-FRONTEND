import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Container, Form, Left, Img, Buttons } from "./styles";
import { useState } from "react";
// import { useAuth } from "../../hooks/auth";
import { toast } from "react-toastify";
// import { validarEmail } from "../../utils/validarEmail";
import { useGoogleLogin } from '@react-oauth/google'
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from "react-router-dom";

export function SignIn() {

    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // const {signIn} = useAuth();

    function handleSignIn(){
        if (email === "" || password === "") {
            toast.error("Preencha todos os campos");
            return;
        }
        // if(validarEmail(email) === false) {
        //     toast.error("E-mail inválido");
        //     return;
        // }
        //signIn({email, password})
    }
    

    const googleSignIn = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            console.log(tokenResponse);
            // Aqui você pode enviar o token para o backend ou salvar no contexto
        },
        onError: () => {
            toast.error("Falha no login com Google");
        },
        flow: 'implicit',
    });

    return (
        <Container>
            <Left>
                <img src="src/assets/logo.png" alt="Logo"/>
                <h1>Bem-Vindo ao FiscalizaDeputado!</h1>
                <Form>
                    <Input type="email" name="email" label="E-mail" value={email} onChange={(event) => setEmail(event.target.value)}/>
                    <Input type="password" name="password" label="Senha" value={password} onChange={(event) => setPassword(event.target.value)}/>
                </Form>
                <Buttons>
                        <Button onClick={() => handleSignIn()}>Entrar</Button>
                        <Button onClick={() => navigate("/register")}>Cadastrar-se</Button>
                </Buttons>
                <Button onClick={googleSignIn} style={{width: "100%", display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center'}}>
                        <FcGoogle size={24} />
                        Entrar com Google
                </Button>
            </Left>
            <Img></Img>
        </Container>
    )
}