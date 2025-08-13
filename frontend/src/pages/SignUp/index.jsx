import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Container, Form, Left, Img, Buttons} from "./styles";
import { useSignUp } from "../../hooks/useSignUp";
import logo from '../../assets/logo.png';

export function SignUp() {
    
    const {
        email, setEmail,
        name, setName,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        loading,
        handleSignUp
    } = useSignUp();
        
    return (
        <Container>
            <Left>
                <img src={logo} alt="Logo"/>
                <h1>Cadastrar-se</h1>
                <Form>
                    <Input type="email" name="email" label="E-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                    <Input type="text" name="name" label="Nome" value={name} onChange={e => setName(e.target.value)}/>
                    <Input type="password" name="password" label="Senha" value={password} onChange={e => setPassword(e.target.value)}/>
                    <Input type="password" name="confirmPassword" label="Confirmar Senha" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                </Form>
                <Buttons>
                        <Button onClick={handleSignUp}> {loading ? "Cadastrando..." : "Cadastrar"}</Button>
                        <Button onClick={() => window.location.href = "/login"}>Voltar para Login</Button>
                </Buttons>
            </Left>
            <Img></Img>
        </Container>
    )
}