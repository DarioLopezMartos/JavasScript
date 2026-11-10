import DatosTecnicos from "./DatosTecnicos";
function FichaPelicula({ pelicula }) {

    function generarEstrellas(valoracion) {
        return "*".repeat(valoracion) + "·".repeat(5 - valoracion);
    }

    const cabecera = (
        <>
            <h2>{pelicula.titulo.toUpperCase()}</h2>
            <p>Valoración: {generarEstrellas(pelicula.valoracion)}</p>
        </>
    );

    const generos = [
        <li key="1">Ciencia ficción</li>,
        <li key="2">Drama</li>,
        <li key="3">Aventura</li>
    ];

    return (
        <>
            {cabecera}
            <p>Años desde el estreno: {new Date().getFullYear() - pelicula.anio}</p>
            <p>
                Duración: {Math.floor(pelicula.duracion / 60)} horas y {pelicula.duracion % 60} minutos
            </p>
            <p>
                Precio con IVA: {(pelicula.precio * 1.21).toFixed(2)} €
            </p>
            <ul>
                <DatosTecnicos pelicula={pelicula} />
            </ul>
            <h3>Géneros</h3>
            <ul>
                {generos}
            </ul>
            <p style={{ color: pelicula.stock > 0 ? "green" : "red" }}>
                {pelicula.stock > 0 ? "Disponible" : "Agotado"}
            </p>
            <img
                src={pelicula.cartel}
                alt={`Cartel de ${pelicula.titulo}`}
            />
        </>
    );
}


export default FichaPelicula;