import { useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { validarEmail } from "../utils/validarEmail";
import { useNavigate } from "react-router-dom";

export function useSignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSignUp() {
        // Validações
        if(email === "" || name === "" || password === "" || confirmPassword === "") {
            toast.error("Preencha todos os campos");
            return;
        }

        if(!validarEmail(email)) {
            toast.error("E-mail inválido");
            return;
        }

        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!strongPasswordRegex.test(password)) {
            toast.error("A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial");
            return;
        }
        
        if (password !== confirmPassword) {
            toast.error("As senhas não coincidem");
            return;
        }

        setLoading(true);
        try {
            const {data} = await api.post("/auth/register", {
                email,
                name,
                password
            });
            toast.success("Usuário cadastrado com sucesso! Verifique seu E-mail");
            console.log(data);
            navigate("/verify?token=" + data.tokenToVerify);
        } catch (error) {
            if(error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Erro ao cadastrar usuário, tente novamente mais tarde");
            }
        } finally {
            setLoading(false);
        }
    }

    return {
        email,
        setEmail,
        name,
        setName,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        loading,
        handleSignUp
    };
}
