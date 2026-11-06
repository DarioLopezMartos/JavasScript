function Etiqueta({ texto, color }) {
    return (
        <span style={{
            backgroundColor: color,
            color: "white",
            borderRadius: "20px",
            padding: "8px 15px"
        }}>
            {texto}
        </span>
    );
}

export default Etiqueta;