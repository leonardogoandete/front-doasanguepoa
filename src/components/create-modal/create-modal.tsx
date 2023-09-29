import { useEffect, useState } from 'react';
import { useFoodDataMutate } from '../../hooks/useFoodDataMutate';
import { PostagemData } from '../../interface/PostagemData';

import "./modal.css";

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}   

interface ModalProps {
    closeModal(): void
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}

export function CreateModal({ closeModal }: ModalProps){
    const [titulo, setTitulo] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [instituicao, setInstituicao] = useState("");
    const { mutate, isSuccess, isLoading } = useFoodDataMutate();

    const submit = () => {
        const postagemData: PostagemData = {
            titulo, 
            mensagem,
            instituicao
        }
        mutate(postagemData)
    }

    useEffect(() => {
        if(!isSuccess) return 
        closeModal();
    }, [isSuccess])

    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre uma nova postagem</h2>
                <form className="input-container">
                    <Input label="titulo" value={titulo} updateValue={setTitulo}/>
                    <Input label="mensagem" value={mensagem} updateValue={setMensagem}/>
                    <Input label="instituicao" value={instituicao} updateValue={setInstituicao}/>
                </form>
                <button onClick={submit} className="btn-secondary">
                    {isLoading ? 'postando...' : 'postar'}
                </button>
            </div>
        </div>
    )
}