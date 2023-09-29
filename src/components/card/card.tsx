import "./card.css";

interface CardProps {
    titulo: string,
    mensagem: string,
    instituicao: string
}

export function Card({ titulo, mensagem, instituicao } : CardProps){
    return(
        <div className="card">
            {/* <img src=""/> */}
            <h2>{titulo}</h2>
            <p>{mensagem}</p>
            <p>{instituicao}</p>
        </div>
    )
}