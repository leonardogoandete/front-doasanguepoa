import React, { useState } from 'react';
import './App.css';
import { Card } from './components/card/card';
import { usePostagemData } from './hooks/usePostagemData';
import { CreateModal } from './components/create-modal/create-modal';
import Login from './components/login/Login';

function App() {
    const { data } = usePostagemData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    return (
        <div className="container">
            {isLoggedIn ? (
                <>
                    <h1>POSTAGENS</h1>
                    <div className="card-grid">
                        {data?.map((getPostagemData) => (
                            <Card
                                key={getPostagemData.id}
                                titulo={getPostagemData.titulo}
                                mensagem={getPostagemData.mensagem}
                                instituicao={getPostagemData.nomeInstituicao}
                            />
                        ))}
                    </div>
                    {isModalOpen && <CreateModal closeModal={handleOpenModal} />}
                    <button onClick={handleOpenModal}>Novo</button>
                </>
            ) : (
                <Login />
            )}
        </div>
    );
}

export default App;
