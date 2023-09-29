import { useState } from 'react'
import './App.css'
import { Card } from './components/card/card';
import { getPostagemData } from './interface/getPostagemData'
import { usePostagemData } from './hooks/usePostagemData';
import { CreateModal } from './components/create-modal/create-modal';

function App() {
  const { data } = usePostagemData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev)
  }

  return (
    <div className="container">
      <h1>POSTAGENS</h1>
      <div className="card-grid">
        {data?.map(getPostagemData => 
          <Card
            titulo={getPostagemData.titulo} 
            mensagem={getPostagemData.mensagem} 
            instituicao={getPostagemData.nomeInstituicao}
          />
        )}
      </div>
      {isModalOpen && <CreateModal closeModal={handleOpenModal}/>}
      <button onClick={handleOpenModal}>novo</button>
    </div>
  )
}

export default App
