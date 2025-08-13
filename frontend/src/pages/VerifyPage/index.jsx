import { Container, Card, Title, Subtitle, CodeInputs, ResendText, BackButton, CodeInput } from "./styles";
import { useNavigate } from "react-router-dom";
import { Button } from '../../components/Button';
import theme from '../../styles/theme';
import { useVerifyCode } from '../../hooks/useVerifyCode';
// import { api } from "../../services/api";
import { useEffect, useState, useRef } from "react";


export function VerifyPage() {
    const navigate = useNavigate();
    const CODE_LENGTH = 6;
    const [email, setEmail] = useState('');
    const {code, error, invalid, inputsRef, handleChange, handleKeyDown, handlePaste, confirmToken, verifyCode, resendCode} = useVerifyCode(CODE_LENGTH);

    const token = new URLSearchParams(window.location.search).get('token');

    const fetchedRef = useRef(false);
    useEffect(() => {
        if (fetchedRef.current) return;
        fetchedRef.current = true;
        async function fetchEmail() {
            if(token && token !== 'undefined'){
                const email = await confirmToken(token);
                setEmail(email);
            } else {
                navigate("/404", {replace: true});
            }
        }
        fetchEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);


    return (
        <Container>
        <BackButton onClick={() => navigate(-1)}>&larr; Voltar</BackButton>
        <Card>
            <Title>Digite o código de Verificação</Title>
            <Subtitle>
            Enviamos um e-mail com um código de verificação de 6 dígitos, para:<br />
            <b>{email}</b>
            </Subtitle>
            <CodeInputs>
                {code.map((value, i) => (
                    <CodeInput
                    key={i}
                    ref={el => inputsRef.current[i] = el}
                    type="tel"
                    inputMode="numeric"
                    maxLength={1}
                    value={value}
                    onChange={e => handleChange(e, i)}
                    onKeyDown={e => handleKeyDown(e, i)}
                    onPaste={handlePaste}
                    autoFocus={i === 0}
                    $active={!!value}
                    $invalid={invalid}
                    />
                ))}
            </CodeInputs>
            <Button
            onClick={async () => await verifyCode(email, code.join(''))}
            style={{ background: theme.COLORS.PRIMARY, color: "white", padding: "0.75rem" }}
            >
            Verificar E-mail
            </Button>
            {error && <div style={{ color: 'red', margin: '1.5rem' }}>{error}</div>}
            <ResendText>
            Não recebeu? <span onClick={() => resendCode(email)}>Reenviar o código</span>
            </ResendText>
        </Card>
    </Container>
    );
}
