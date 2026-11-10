function DatosTecnicos({ pelicula }) {
    return (
        <>
            <li>Director: {pelicula.director}</li>
            <li>Año: {pelicula.anio}</li>
            <li>Duración: {pelicula.duracion} minutos</li>
        </>
    );
}

export default DatosTecnicos;