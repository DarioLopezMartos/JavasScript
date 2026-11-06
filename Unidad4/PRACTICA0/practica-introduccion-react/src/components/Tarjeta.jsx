function Tarjeta({ titulo, texto }) {
    return (
        <div style={{
            border: "1px solid #cccccc",
            borderRadius: "10px",
            margin: "15px",
            padding: "15px"
        }}>
            <h2>{titulo}</h2>
            <p>{texto}</p>
        </div>
    );
}

export default Tarjeta;