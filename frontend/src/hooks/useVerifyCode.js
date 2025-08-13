import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { toast } from 'react-toastify';

export function useVerifyCode(length) {
    const [code, setCode] = useState(Array(length).fill(''));
    const [error, setError] = useState('');
    const [invalid, setInvalid] = useState(false);
    const inputsRef = useRef([]);
    const navigate = useNavigate();

    function focusInput(idx) {
        if (idx >= 0 && idx < length) inputsRef.current[idx]?.focus();
    };

    function setCodeAt(idx, val) {
        const newCode = [...code];
        newCode[idx] = val;
        setCode(newCode);
    };

    function handleChange(e, idx) {
        let val = e.target.value.replace(/\D/g, '').slice(0, 1);
        setCodeAt(idx, val);

        if (val && idx < length - 1) {
        focusInput(idx + 1);
        }
        setError('');
        setInvalid(false);
    };

    function handleKeyDown(e, idx) {
        if (e.key === 'Backspace') {
        if (code[idx]) {
            setCodeAt(idx, '');
            setError('');
            setInvalid(false);
        } else {
            focusInput(idx - 1);
        }
        }
    };

    function handlePaste(e) {
        e.preventDefault();
        const paste = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, length);
        if (!paste) return;

        const newCode = [...code];
        paste.split('').forEach((char, i) => {
        newCode[i] = char;
        });
        setCode(newCode);
        focusInput(paste.length >= length ? length - 1 : paste.length);
        setError('');
        setInvalid(false);
    };

    async function verifyCode(email, code) {
        try {
            const response = await api.post('auth/verify', { email, verificationCode: code });
            if (response.status === 200) {
                toast.success('Código verificado com sucesso!');
                navigate('/login', { replace: true });
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Erro ao verificar código. Tente novamente.';
            toast.error(message);
        }
    };

    async function confirmToken(token) {
        try {
            const response = await api.get('auth/confirm/email', { params: { token } })
            if (response.status === 200) {
                return response.data.email;
            }
        } catch {
            navigate("/404", {replace: true});
        }
    }

    async function resendCode(email) {
        try {
            const response = await api.post('auth/resend', {email});
            if (response.status === 200) toast.success('Código reenviado com sucesso!');

        } catch (error) {
            const message = error.response?.data?.message || 'Erro ao reenviar código. Tente novamente.';
            toast.error(message);
        }
    }

    return {
        code,
        error,
        invalid,
        inputsRef,
        handleChange,
        handleKeyDown,
        handlePaste,
        verifyCode,
        confirmToken,
        resendCode
    };
}
