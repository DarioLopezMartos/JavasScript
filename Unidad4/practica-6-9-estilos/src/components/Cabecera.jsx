const Cabecera = ({ titulo, subtitulo = "Tus notas personales" }) => {
    return (
        <header>
            <h1>{titulo}</h1>
            <p>{subtitulo}</p>
        </header>
    );
};
export default Cabecera;