function Cabecera({ nombre, curso }) {
    return (
        <header style={{
            backgroundColor: "#282c34",
            color: "white",
            padding: "20px"
        }}>
            <h1>{nombre}</h1>
            <p>{curso}</p>
        </header>
    );
}

export default Cabecera;