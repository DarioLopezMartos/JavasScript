function Pie({ autor, anio }) {
    return (
        <footer style={{
            textAlign: "center",
            fontSize: "12px",
            padding: "15px"
        }}>
            © {anio} — Hecho por {autor} con React
        </footer>
    );
}

export default Pie;