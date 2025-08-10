/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";

export const AuthContext = createContext({})

function AuthProvider({children}) {
    
    const [data, setData] = useState({});
    
    async function signIn({email, password}, googleToken) {
        try{

            let response;
            
            if (googleToken) {
                response = await api.post("/auth/google/verify", { token: googleToken });
            } else {
                response = await api.post("/auth/login", {email, password});
            }
            
            const {token, user} = response.data;

            localStorage.setItem("@FiscalizaDeputado:token", token);
            localStorage.setItem("@FiscalizaDeputado:user", JSON.stringify(user));

            api.defaults.headers.authorization = `Bearer ${token}`;
            setData({user, token});
            toast.success("Login realizado com sucesso!");
        }
        catch(error){
            if(error.response) {
                toast.error(error.response.data.message);
            }
            else{
                toast.error("Erro ao realizar login, tente novamente mais tarde");
            }
        }
    }

    function signOut() {
        localStorage.removeItem("@FiscalizaDeputado:token");
        localStorage.removeItem("@FiscalizaDeputado:user");
        setData({});
    }

    useEffect(() => {
        const token = localStorage.getItem('@FiscalizaDeputado:token')
        const user = JSON.parse(localStorage.getItem('@FiscalizaDeputado:user'))

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        setData({ token, user })
    }, [])     

    return(
        <AuthContext.Provider value={{
            signIn,
            signOut,
            user:data.user}}>
            {children}
        </AuthContext.Provider>
    )

}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}


export {AuthProvider, useAuth}