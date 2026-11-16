const FichaLibro = ({ libro }) => {
    const { titulo, subtitulo, autores, paginas, sinopsis, portada, premiado, generos } = libro;

    const textoAutores = autores && autores.length > 0 ? autores.join(", ") : "Autor desconocido";

    return (
        <article>
            <img src={portada || "https://placehold.co/60x90?text=?"} alt={`Portada de ${titulo}`}/>

            <h2>{titulo} {premiado && "(premiado)"}</h2>

            {subtitulo && <p><em>{subtitulo}</em></p>}

            <p>{textoAutores}</p>

            <p>{paginas} páginas</p>

            <p>{sinopsis}</p>

            <ul>
                <li>{generos}</li>
            </ul>


        </article>
    );
};

export default FichaLibro;