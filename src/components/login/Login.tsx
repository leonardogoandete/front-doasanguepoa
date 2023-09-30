import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

const Login: React.FC = () => {
    const [documento, setDocumento] = useState('');
    const [password, setPassword] = useState('');
    // Remova o estado token, pois não precisamos armazenar o token aqui

    const handleLogin = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            // Fazer a chamada de API para autenticação e obter o token
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `documento=${documento}&senha=${password}`
            });

            if (response.ok) {
                const data = await response.json();
                const authToken = data.token;
                // Verificar se o token é válido
                if (authToken) {
                    // Armazenar o token no localStorage
                    localStorage.setItem('authToken', authToken);
                    // Redirecionar o usuário para a página principal ou outra página desejada
                    // Por exemplo, você pode usar a biblioteca 'react-router-dom' para navegar para outra rota
                    //history.push('/dashboard'); // Se você estiver usando a versão 5 do React Router
                    //navigate('/dashboard'); // Se você estiver usando a versão 6 do React Router
                }
            } else {
                // Tratar erro de autenticação
                // Exibir mensagem de erro para o usuário, por exemplo
                console.error('Falha na autenticação');
            }
        } catch (error) {
            console.error('Ocorreu um erro durante o login:', error);
        }
    };

    return (
        <div>
            <h1>Tela de Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">login:</label>
                    <input
                        type="text"
                        id="documento"
                        value={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
